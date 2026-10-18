import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { SatisfactionService } from './satisfaction.service';
import {
  SatisfactionEvaluationRequest,
  SatisfactionTopic,
} from '../models/satisfaction.models';

describe('SatisfactionService', () => {
  let service: SatisfactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SatisfactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should GET active topics from /api/v1/topicos-satisfacao', () => {
    const topics: SatisfactionTopic[] = [
      { id: 'acervo-historico', label: 'Acervo Histórico', icon: 'history_edu' },
    ];

    service
      .getTopics()
      .subscribe((result) => expect(result).toEqual(topics));

    const req = httpMock.expectOne('/api/v1/topicos-satisfacao');
    expect(req.request.method).toBe('GET');
    req.flush(topics);
  });

  it('should POST anonymous evaluations to /api/v1/avaliacoes-satisfacao', () => {
    const request: SatisfactionEvaluationRequest = {
      rating: 5,
      topicIds: ['acervo-historico'],
      terminalId: 'terminal-02',
    };

    service.submitEvaluation(request).subscribe((result) => {
      expect(result.protocol).toBe('SAT-2026-654321');
    });

    const req = httpMock.expectOne('/api/v1/avaliacoes-satisfacao');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush({ protocol: 'SAT-2026-654321', evaluatedAt: '2026-10-18T09:05:00-03:00' });
  });
});
