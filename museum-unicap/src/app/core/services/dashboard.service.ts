import { inject } from '@angular/core';
import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactsPage, DashboardSummary } from '../models/dashboard.models';

/**
 * Feature-oriented client for the management dashboard.
 *
 * NOTE: both endpoints are *proposed* contracts pending confirmation with the
 * back-end team; they are simulated by the dev-only mock interceptor.
 */
@Service()
export class DashboardService {
  private readonly http = inject(HttpClient);

  /** Aggregated indicators via the proposed `GET /api/v1/dashboard/resumo`. */
  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${environment.apiUrl}/dashboard/resumo`);
  }

  /** Paginated opt-in contacts via the proposed `GET /api/v1/dashboard/contatos`. */
  getContacts(page: number): Observable<ContactsPage> {
    return this.http.get<ContactsPage>(
      `${environment.apiUrl}/dashboard/contatos`,
      { params: { page: String(page) } },
    );
  }
}
