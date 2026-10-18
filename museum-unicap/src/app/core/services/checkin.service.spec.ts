import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CheckInService } from './checkin.service';
import { CheckInRequest, CheckInResponse } from '../models/checkin.models';

describe('CheckInService', () => {
  let service: CheckInService;
  let httpMock: HttpTestingController;

  const request: CheckInRequest = {
    visitType: 'individual',
    visitorCount: 1,
    visitorAgeRange: 'adulto',
    institutionalBond: 'comunidade',
    federationUnit: 'PE',
    municipality: 'Recife',
    neighborhood: 'Boa Vista',
    contact: null,
    terminalId: 'terminal-02',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CheckInService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should POST the check-in payload to /api/v1/checkins', () => {
    const response: CheckInResponse = {
      protocol: 'CHK-2026-123456',
      checkedInAt: '2026-10-18T09:00:00-03:00',
      visitorCountToday: 143,
    };

    service
      .submitCheckIn(request)
      .subscribe((result) => expect(result).toEqual(response));

    const req = httpMock.expectOne('/api/v1/checkins');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush(response);
  });

  it('should propagate API failures to the subscriber', () => {
    service.submitCheckIn(request).subscribe({
      error: (error: unknown) => {
        expect((error as { status: number }).status).toBe(400);
      },
    });

    const req = httpMock.expectOne('/api/v1/checkins');
    req.flush({ message: 'Dados inválidos.' }, { status: 400, statusText: 'Bad Request' });
  });
});
