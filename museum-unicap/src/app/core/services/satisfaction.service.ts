import { inject } from '@angular/core';
import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  SatisfactionEvaluationRequest,
  SatisfactionEvaluationResponse,
  SatisfactionTopic,
} from '../models/satisfaction.models';

/** Feature-oriented client for the satisfaction survey endpoints. */
@Service()
export class SatisfactionService {
  private readonly http = inject(HttpClient);

  /** Active topics from `GET /api/v1/topicos-satisfacao` (never hard-coded). */
  getTopics(): Observable<SatisfactionTopic[]> {
    return this.http.get<SatisfactionTopic[]>(
      `${environment.apiUrl}/topicos-satisfacao`,
    );
  }

  /** Submits an anonymous evaluation via `POST /api/v1/avaliacoes-satisfacao`. */
  submitEvaluation(
    request: SatisfactionEvaluationRequest,
  ): Observable<SatisfactionEvaluationResponse> {
    return this.http.post<SatisfactionEvaluationResponse>(
      `${environment.apiUrl}/avaliacoes-satisfacao`,
      request,
    );
  }
}
