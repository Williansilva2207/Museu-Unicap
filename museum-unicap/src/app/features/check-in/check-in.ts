import { Component, computed, inject, signal } from '@angular/core';
import { FormField, email, form, min, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { AppModal } from '../../shared/components/app-modal/app-modal';
import { CheckInService } from '../../core/services/checkin.service';
import { apiErrorMessage } from '../../core/services/api-error';
import { environment } from '../../../environments/environment';
import {
  AGE_RANGE_OPTIONS,
  FEDERATION_UNIT_OPTIONS,
  INSTITUTIONAL_BOND_OPTIONS,
  MUNICIPALITY_OPTIONS,
  MUNICIPALITY_WITH_NEIGHBORHOODS,
  RECIFE_NEIGHBORHOOD_OPTIONS,
  VISIT_TYPE_OPTIONS,
} from '../../core/constants/domain-options';
import {
  AgeRange,
  CheckInRequest,
  CheckInResponse,
  InstitutionalBond,
  VisitType,
} from '../../core/models/checkin.models';

/**
 * Radio groups in Signal Forms hold string values: the empty string `''`
 * represents "nothing selected yet" and fails `required()`.
 */
interface CheckInFormData {
  visitType: VisitType | '';
  /** Group size; forced to 1 for individual visits in the payload. */
  visitorCount: number;
  visitorAgeRange: AgeRange | '';
  institutionalBond: InstitutionalBond | '';
  federationUnit: string;
  municipality: string;
  neighborhood: string;
  phone: string;
  email: string;
  communicationConsent: boolean;
}

const INITIAL_FORM_DATA: CheckInFormData = {
  visitType: '',
  visitorCount: 0,
  visitorAgeRange: '',
  institutionalBond: '',
  federationUnit: '',
  municipality: '',
  neighborhood: '',
  phone: '',
  email: '',
  // LGPD rule: consent is never preselected.
  communicationConsent: false,
};

/**
 * Reception kiosk check-in form.
 *
 * Business rules (MVP):
 * - Visit type and age range are required; group visits report their size
 *   (>= 1); individual visits represent exactly one person.
 * - The back end is the authority for the timestamp, protocol and any
 *   persistence — the confirmation modal only appears after a 2xx response.
 * - Contact details are optional and never used for communication without an
 *   explicit, separate consent.
 */
@Component({
  imports: [FormField, AppModal],
  selector: 'app-check-in',
  styleUrl: './check-in.scss',
  templateUrl: './check-in.html',
})
export class CheckIn {
  private readonly checkInService = inject(CheckInService);

  protected readonly visitTypes = VISIT_TYPE_OPTIONS;
  protected readonly ageRanges = AGE_RANGE_OPTIONS;
  protected readonly bonds = INSTITUTIONAL_BOND_OPTIONS;
  protected readonly federationUnits = FEDERATION_UNIT_OPTIONS;
  protected readonly municipalities = MUNICIPALITY_OPTIONS;
  protected readonly neighborhoods = RECIFE_NEIGHBORHOOD_OPTIONS;
  protected readonly municipalityWithNeighborhoods = MUNICIPALITY_WITH_NEIGHBORHOODS;

  protected readonly formModel = signal<CheckInFormData>({ ...INITIAL_FORM_DATA });

  protected readonly checkInForm = form(this.formModel, (s) => {
    required(s.visitType, { message: 'Selecione o tipo de visita.' });
    min(s.visitorCount, 1, {
      when: (ctx) =>
        ctx.valueOf(s.visitType) === 'familia' || ctx.valueOf(s.visitType) === 'escola',
      message: 'Informe a quantidade de pessoas do grupo (mínimo 1).',
    });
    required(s.visitorAgeRange, { message: 'Selecione a faixa etária.' });
    required(s.institutionalBond, { message: 'Selecione o vínculo institucional.' });
    required(s.federationUnit, { message: 'Selecione a unidade federativa.' });
    required(s.municipality, { message: 'Selecione o município.' });
    required(s.neighborhood, {
      when: (ctx) => ctx.valueOf(s.municipality) === MUNICIPALITY_WITH_NEIGHBORHOODS,
      message: 'Selecione o bairro de residência.',
    });
    email(s.email, {
      when: (ctx) => ctx.value().length > 0,
      message: 'Digite um e-mail válido.',
    });
  });

  protected readonly attempted = signal(false);
  protected readonly submitting = signal(false);
  protected readonly submitError = signal<string | null>(null);
  protected readonly successResponse = signal<CheckInResponse | null>(null);

  /** Family and school groups must report the number of participants. */
  protected readonly needsVisitorCount = computed(() => {
    const visitType = this.formModel().visitType;
    return visitType === 'familia' || visitType === 'escola';
  });

  protected readonly showNeighborhoods = computed(
    () => this.formModel().municipality === MUNICIPALITY_WITH_NEIGHBORHOODS,
  );

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.attempted.set(true);
    this.submitError.set(null);
    if (this.checkInForm().invalid() || this.submitting()) {
      return;
    }
    void this.sendCheckIn();
  }

  protected adjustVisitorCount(delta: number): void {
    const current = this.formModel().visitorCount;
    this.checkInForm.visitorCount().value.set(Math.max(1, current + delta));
  }

  protected resetForm(): void {
    this.formModel.set({ ...INITIAL_FORM_DATA });
    this.attempted.set(false);
    this.submitError.set(null);
  }

  protected onModalClosed(): void {
    this.successResponse.set(null);
    this.resetForm();
  }

  /** Returns the first validation message when the field should reveal it. */
  protected fieldErrorMessage(
    field: () => {
      touched: () => boolean;
      invalid: () => boolean;
      errors: () => readonly { message?: string }[];
    },
  ): string | null {
    const state = field();
    if (!state.invalid()) {
      return null;
    }
    if (!state.touched() && !this.attempted()) {
      return null;
    }
    return state.errors()[0]?.message ?? 'Valor inválido.';
  }

  protected formatCheckedInAt(iso: string): string {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(iso));
  }

  private buildRequest(): CheckInRequest | null {
    const data = this.formModel();
    if (
      data.visitType === '' ||
      data.visitorAgeRange === '' ||
      data.institutionalBond === '' ||
      data.federationUnit === '' ||
      data.municipality === ''
    ) {
      return null;
    }
    const hasContact = data.phone.trim().length > 0 || data.email.trim().length > 0;
    const isRecife = data.municipality === MUNICIPALITY_WITH_NEIGHBORHOODS;
    return {
      visitType: data.visitType,
      visitorCount: this.needsVisitorCount() ? data.visitorCount : 1,
      visitorAgeRange: data.visitorAgeRange,
      institutionalBond: data.institutionalBond,
      federationUnit: data.federationUnit,
      municipality: data.municipality,
      neighborhood: isRecife && data.neighborhood !== '' ? data.neighborhood : null,
      contact: hasContact
        ? {
            phone: data.phone.trim() || undefined,
            email: data.email.trim() || undefined,
            communicationConsent: data.communicationConsent,
          }
        : null,
      terminalId: environment.terminalId,
    };
  }

  private async sendCheckIn(): Promise<void> {
    const request = this.buildRequest();
    if (!request) {
      return;
    }
    this.submitting.set(true);
    try {
      const response = await firstValueFrom(this.checkInService.submitCheckIn(request));
      this.successResponse.set(response);
    } catch (error: unknown) {
      // Never shows success on failure; values are preserved for a retry.
      this.submitError.set(apiErrorMessage(error));
    } finally {
      this.submitting.set(false);
    }
  }
}
