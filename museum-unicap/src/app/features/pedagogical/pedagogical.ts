import { Component, computed, inject, signal } from '@angular/core';
import { FormField, form, maxLength, min, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { AppModal } from '../../shared/components/app-modal/app-modal';
import { PedagogicalService } from '../../core/services/pedagogical.service';
import { apiErrorMessage } from '../../core/services/api-error';
import {
  CURRICULUM_ALIGNMENT_SCALE,
  EDUCATION_NETWORK_OPTIONS,
  MATERIALS_RATING_OPTIONS,
  MEDIATOR_RATING_OPTIONS,
} from '../../core/constants/domain-options';
import {
  ContactChannel,
  EducationCycle,
  EducationNetwork,
  MaterialsRating,
  MediatorRating,
  PedagogicalEvaluationRequest,
  PedagogicalEvaluationResponse,
} from '../../core/models/pedagogical.models';
import type { FieldTree } from '@angular/forms/signals';

/** UX-only provisional limit — the official business limit is still pending. */
const SUGGESTIONS_MAX_LENGTH = 1000;

/** Runtime type guard for the 1–5 curriculum alignment scale. */
function isAlignmentScore(value: number): value is 1 | 2 | 3 | 4 | 5 {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5;
}

/**
 * Radio groups in Signal Forms hold string values: the empty string `''`
 * represents "nothing selected yet" and fails `required()`.
 */
interface PedagogicalFormData {
  institutionName: string;
  network: EducationNetwork | '';
  cycleFund1: boolean;
  cycleFund2: boolean;
  cycleMedio: boolean;
  cycleEja: boolean;
  cycleSuperior: boolean;
  studentCount: number;
  /** Radio value ('1'…'5'); converted to a number in the payload. */
  curriculumAlignmentScore: string;
  mediatorsRating: MediatorRating | '';
  materialsRating: MaterialsRating | '';
  suggestions: string;
  interestedInFutureVisits: boolean;
  contactChannel: ContactChannel | '';
  contactValue: string;
}

type CycleFieldKey =
  | 'cycleFund1'
  | 'cycleFund2'
  | 'cycleMedio'
  | 'cycleEja'
  | 'cycleSuperior';

const CYCLE_FIELDS: readonly {
  key: CycleFieldKey;
  value: EducationCycle;
  label: string;
}[] = [
  { key: 'cycleFund1', value: 'fund1', label: 'Fundamental I' },
  { key: 'cycleFund2', value: 'fund2', label: 'Fundamental II' },
  { key: 'cycleMedio', value: 'medio', label: 'Ensino Médio' },
  { key: 'cycleEja', value: 'eja', label: 'EJA' },
  { key: 'cycleSuperior', value: 'superior', label: 'Ensino Superior' },
];

const INITIAL_FORM_DATA: PedagogicalFormData = {
  institutionName: '',
  network: '',
  cycleFund1: false,
  cycleFund2: false,
  cycleMedio: false,
  cycleEja: false,
  cycleSuperior: false,
  studentCount: 0,
  curriculumAlignmentScore: '',
  mediatorsRating: '',
  materialsRating: '',
  suggestions: '',
  // No preselection: interest is an explicit declaration.
  interestedInFutureVisits: false,
  contactChannel: '',
  contactValue: '',
};

/**
 * Post-visit pedagogical evaluation for teachers and mediators.
 *
 * Business rules (MVP):
 * - Institution name, education network, at least one education cycle and a
 *   positive student count are required.
 * - The back end generates the timestamp and the evaluation protocol; the
 *   success state only appears after a successful submission.
 * - Future-visit interest and the contact channel are explicit opt-ins and
 *   are never preselected.
 */
@Component({
  imports: [FormField, AppModal],
  selector: 'app-pedagogical',
  styleUrl: './pedagogical.scss',
  templateUrl: './pedagogical.html',
})
export class Pedagogical {
  private readonly pedagogicalService = inject(PedagogicalService);

  protected readonly networks = EDUCATION_NETWORK_OPTIONS;
  /** Radio values as strings, converted back to 1–5 in the payload. */
  protected readonly curriculumScale = CURRICULUM_ALIGNMENT_SCALE.map((option) => ({
    ...option,
    radioValue: String(option.value),
  }));
  protected readonly mediatorRatings = MEDIATOR_RATING_OPTIONS;
  protected readonly materialsRatings = MATERIALS_RATING_OPTIONS;
  protected readonly suggestionsMaxLength = SUGGESTIONS_MAX_LENGTH;

  protected readonly formModel = signal<PedagogicalFormData>({ ...INITIAL_FORM_DATA });

  protected readonly pedagogicalForm = form(this.formModel, (s) => {
    required(s.institutionName, { message: 'Informe o nome da instituição de ensino.' });
    required(s.network, { message: 'Selecione a rede de ensino.' });
    min(s.studentCount, 1, { message: 'Informe o número aproximado de estudantes.' });
    required(s.curriculumAlignmentScore, {
      message: 'Selecione a adequação ao currículo (BNCC).',
    });
    required(s.mediatorsRating, { message: 'Avalie o atendimento dos monitores.' });
    required(s.materialsRating, { message: 'Avalie os materiais de apoio.' });
    maxLength(s.suggestions, SUGGESTIONS_MAX_LENGTH, {
      message: `Limite de ${SUGGESTIONS_MAX_LENGTH} caracteres.`,
    });
    required(s.contactValue, {
      when: (ctx) => ctx.valueOf(s.contactChannel) !== '',
      message: 'Informe o telefone/WhatsApp para contato.',
    });
  });

  /** Cycle checkboxes derived from the form model (single source of truth). */
  protected readonly cycleCheckboxes: readonly {
    value: EducationCycle;
    label: string;
    control: FieldTree<boolean>;
  }[] = CYCLE_FIELDS.map(({ key, value, label }) => ({
    value,
    label,
    control: this.pedagogicalForm[key],
  }));

  protected readonly currentStep = signal(1);
  protected readonly attempted = signal(false);
  protected readonly submitting = signal(false);
  protected readonly submitError = signal<string | null>(null);
  protected readonly successResponse = signal<PedagogicalEvaluationResponse | null>(null);

  /** Cycles currently checked (single source of truth: the form model). */
  protected readonly selectedCycles = computed<EducationCycle[]>(() => {
    const data = this.formModel();
    return CYCLE_FIELDS.filter((field) => data[field.key] === true).map((f) => f.value);
  });

  protected readonly showContactValue = computed(
    () => this.formModel().contactChannel !== '',
  );

  protected readonly suggestionsLength = computed(() => this.formModel().suggestions.length);

  protected readonly cycleGroupError = computed(
    () => this.attempted() && this.selectedCycles().length === 0,
  );

  protected adjustStudentCount(delta: number): void {
    const current = this.formModel().studentCount;
    this.pedagogicalForm.studentCount().value.set(Math.max(0, current + delta));
  }

  protected goToStep(target: number): void {
    if (target === this.currentStep()) {
      return;
    }
    if (target > this.currentStep() && !this.canAdvanceFrom(this.currentStep())) {
      this.attempted.set(true);
      return;
    }
    this.currentStep.set(target);
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.attempted.set(true);
    this.submitError.set(null);
    const formInvalid = this.pedagogicalForm().invalid() || this.selectedCycles().length === 0;
    if (formInvalid || this.submitting()) {
      return;
    }
    void this.sendEvaluation();
  }

  protected onModalClosed(): void {
    this.successResponse.set(null);
    this.resetForm();
  }

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

  /** Step-gate validation: only fields of the current step block progression. */
  private canAdvanceFrom(step: number): boolean {
    if (step === 1) {
      const data = this.formModel();
      const stepValid =
        this.pedagogicalForm.institutionName().valid() &&
        this.pedagogicalForm.network().valid() &&
        this.pedagogicalForm.studentCount().valid() &&
        this.selectedCycles().length > 0;
      return stepValid && data.institutionName.trim().length > 0;
    }
    if (step === 2) {
      return (
        this.pedagogicalForm.curriculumAlignmentScore().valid() &&
        this.pedagogicalForm.mediatorsRating().valid() &&
        this.pedagogicalForm.materialsRating().valid()
      );
    }
    return true;
  }

  private buildRequest(): PedagogicalEvaluationRequest | null {
    const data = this.formModel();
    if (data.network === '' || data.mediatorsRating === '' || data.materialsRating === '') {
      return null;
    }
    const score = Number(data.curriculumAlignmentScore);
    if (!isAlignmentScore(score)) {
      return null;
    }
    const hasContact = data.contactChannel !== '';
    return {
      institutionName: data.institutionName.trim(),
      network: data.network,
      cycles: this.selectedCycles(),
      studentCount: data.studentCount,
      curriculumAlignmentScore: score,
      mediatorsRating: data.mediatorsRating,
      materialsRating: data.materialsRating,
      suggestions: data.suggestions.trim() || null,
      interestedInFutureVisits: data.interestedInFutureVisits,
      contactChannel: data.contactChannel !== '' ? data.contactChannel : null,
      contactValue: hasContact ? data.contactValue.trim() || null : null,
    };
  }

  private resetForm(): void {
    this.formModel.set({ ...INITIAL_FORM_DATA });
    this.currentStep.set(1);
    this.attempted.set(false);
    this.submitError.set(null);
  }

  private async sendEvaluation(): Promise<void> {
    const request = this.buildRequest();
    if (!request) {
      return;
    }
    this.submitting.set(true);
    try {
      const response = await firstValueFrom(
        this.pedagogicalService.submitEvaluation(request),
      );
      this.successResponse.set(response);
    } catch (error: unknown) {
      this.submitError.set(apiErrorMessage(error));
    } finally {
      this.submitting.set(false);
    }
  }
}
