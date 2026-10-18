import { inject } from '@angular/core';
import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  PedagogicalEvaluationRequest,
  PedagogicalEvaluationResponse,
} from '../models/pedagogical.models';

/** Feature-oriented client for the pedagogical evaluation endpoints. */
@Service()
export class PedagogicalService {
  private readonly http = inject(HttpClient);

  /** Submits a post-visit pedagogical report via `POST /api/v1/avaliacoes-pedagogicas`. */
  submitEvaluation(
    request: PedagogicalEvaluationRequest,
  ): Observable<PedagogicalEvaluationResponse> {
    return this.http.post<PedagogicalEvaluationResponse>(
      `${environment.apiUrl}/avaliacoes-pedagogicas`,
      request,
    );
  }
}
