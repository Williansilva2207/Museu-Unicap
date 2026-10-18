import { inject, signal } from '@angular/core';
import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthSession, LoginRequest, LoginResponse } from '../models/auth.models';

/**
 * Session state for the management portal.
 *
 * The session is intentionally kept in memory (a signal): no tokens or
 * credentials are persisted to localStorage/sessionStorage. Real
 * authentication/authorization MUST be enforced by the back end once the
 * institutional strategy is defined (route guards are UX only).
 */
@Service()
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly sessionSignal = signal<AuthSession | null>(null);

  /** Read-only view of the current session. */
  readonly session = this.sessionSignal.asReadonly();

  /** Attempts to sign in via the proposed `POST /api/v1/auth/login`. */
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, request)
      .pipe(tap((response) => this.sessionSignal.set(response.session)));
  }

  /** Clears the in-memory session (no back-end call until the API exists). */
  logout(): void {
    this.sessionSignal.set(null);
  }
}
