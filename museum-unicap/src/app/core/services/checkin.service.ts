import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CheckInRequest, CheckInResponse } from '../models/checkin.models';

/** Feature-oriented client for the check-in endpoints. */
@Service()
export class CheckInService {
  private readonly http = inject(HttpClient);

  /** Registers a museum entry via `POST /api/v1/checkins`. */
  submitCheckIn(request: CheckInRequest): Observable<CheckInResponse> {
    return this.http.post<CheckInResponse>(
      `${environment.apiUrl}/checkins`,
      request,
    );
  }
}
