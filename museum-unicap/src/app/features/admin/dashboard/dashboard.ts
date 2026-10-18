import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { catchError, of, startWith, switchMap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import { environment } from '../../../../environments/environment';
import { AGE_RANGE_OPTIONS } from '../../../core/constants/domain-options';
import { DashboardSummary } from '../../../core/models/dashboard.models';
import { SatisfactionRating } from '../../../core/models/satisfaction.models';

/** Icons per rating, mirroring the prototype's sentiment icons. */
const RATING_ICONS: Record<SatisfactionRating, string> = {
  1: 'mood_bad',
  2: 'sentiment_dissatisfied',
  3: 'sentiment_neutral',
  4: 'sentiment_satisfied',
  5: 'sentiment_very_satisfied',
};

/**
 * Management dashboard with the MVP's minimum analytical views:
 * visit overview, visitor profile/origin, satisfaction & topics and the
 * educational impact of school visits.
 *
 * Honesty rules:
 * - While the dev-only mock API is active, a "simulated data" badge is always
 *   visible and these numbers are NOT live institutional data.
 * - Export/report actions stay disabled with an explicit notice until the
 *   back-end provides the real endpoints (no fake success states).
 */
@Component({
  imports: [DecimalPipe],
  selector: 'app-admin-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly dashboardService = inject(DashboardService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly demoModeActive = environment.useMockApi;
  protected readonly ratingIcons = RATING_ICONS;

  /** `undefined` = loading, `null` = load failure. */
  protected readonly summary = toSignal(
    this.dashboardService.getSummary().pipe(catchError(() => of(null))),
  );

  protected readonly isLoading = computed(() => this.summary() === undefined);

  protected readonly loadFailed = computed(() => this.summary() === null);

  private readonly contactsPageNumber = signal(1);

  /** `undefined` = loading, `null` = load failure. */
  protected readonly contacts = toSignal(
    toObservable(this.contactsPageNumber).pipe(
      startWith(1),
      switchMap((page) =>
        this.dashboardService.getContacts(page).pipe(catchError(() => of(null))),
      ),
    ),
  );

  /** Notice shown when a not-yet-integrated action is requested. */
  protected readonly pendingActionNotice = signal<string | null>(null);

  /** Human labels for the age ranges used by the chart. */
  protected readonly ageLabels = AGE_RANGE_OPTIONS;

  protected readonly session = this.authService.session;

  protected readonly ageDistributionRows = computed(() => {
    const summary = this.summary();
    return summary
      ? summary.ageDistribution.map((entry) => ({
          ...entry,
          label:
            this.ageLabels.find((option) => option.value === entry.range)?.label ??
            entry.range,
        }))
      : [];
  });

  protected async logout(): Promise<void> {
    this.authService.logout();
    await this.router.navigate(['/login']);
  }

  protected showPendingActionNotice(action: string): void {
    this.pendingActionNotice.set(
      `“${action}” será disponibilizado após a integração com o back-end institucional.`,
    );
  }

  protected goToContactsPage(page: number): void {
    const contacts = this.contacts();
    if (!contacts) {
      return;
    }
    const totalPages = Math.max(1, Math.ceil(contacts.total / contacts.pageSize));
    this.contactsPageNumber.set(Math.min(Math.max(1, page), totalPages));
  }

  /** Formats an ISO timestamp as a short pt-BR date/time. */
  protected formatDateTime(iso: string): string {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(iso));
  }
}
