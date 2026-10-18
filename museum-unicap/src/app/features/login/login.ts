import { Component, inject, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { apiErrorMessage } from '../../core/services/api-error';
import { environment } from '../../../environments/environment';

interface LoginFormData {
  identifier: string;
  password: string;
}

interface QuickLink {
  path: string;
  icon: string;
  label: string;
  hint: string;
}

/**
 * Management portal sign-in.
 *
 * Security notes:
 * - No credentials are pre-filled, stored or logged.
 * - The route guard is a UX measure only; real authentication/authorization
 *   must be enforced by the back end once the institutional strategy exists.
 * - While the dev-only mock API is enabled, a notice explains the demo rules.
 */
@Component({
  imports: [FormField, RouterLink],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly demoModeActive = environment.useMockApi;

  protected readonly quickLinks: readonly QuickLink[] = [
    {
      path: '/check-in',
      icon: 'sensor_occupied',
      label: 'Check-in Entrada',
      hint: 'Totem de Recepção',
    },
    {
      path: '/avaliacao',
      icon: 'mood',
      label: 'Totem de Saída',
      hint: 'Avaliação de Satisfação',
    },
    {
      path: '/pedagogico',
      icon: 'assignment',
      label: 'Avaliação Pedagógica',
      hint: 'Relatório Docente',
    },
  ];

  protected readonly formModel = signal<LoginFormData>({
    identifier: '',
    password: '',
  });

  protected readonly loginForm = form(this.formModel, (s) => {
    required(s.identifier, { message: 'Informe seu e-mail institucional ou matrícula.' });
    required(s.password, { message: 'Informe sua senha de acesso.' });
  });

  protected readonly attempted = signal(false);
  protected readonly submitting = signal(false);
  protected readonly loginError = signal<string | null>(null);
  protected readonly passwordVisible = signal(false);

  protected togglePasswordVisibility(): void {
    this.passwordVisible.update((visible) => !visible);
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

  protected async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.attempted.set(true);
    this.loginError.set(null);
    if (this.loginForm().invalid() || this.submitting()) {
      return;
    }
    const { identifier, password } = this.formModel();
    this.submitting.set(true);
    try {
      await firstValueFrom(this.authService.login({ identifier, password }));
      await this.router.navigate(['/admin/dashboard']);
    } catch (error: unknown) {
      this.loginError.set(apiErrorMessage(error));
    } finally {
      this.submitting.set(false);
    }
  }
}
