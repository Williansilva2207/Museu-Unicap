import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

/**
 * UX-only route guard for the management area.
 *
 * Real authorization MUST be enforced by the back end: this guard only keeps
 * the interface behind the sign-in flow and redirects anonymous users to the
 * login screen. It never grants data access by itself.
 */
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.session() !== null) {
    return true;
  }
  return router.createUrlTree(['/login']);
};
