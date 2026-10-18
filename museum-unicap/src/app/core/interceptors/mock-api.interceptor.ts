import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CheckInRequest, CheckInResponse } from '../models/checkin.models';
import {
  SatisfactionEvaluationRequest,
  SatisfactionEvaluationResponse,
  SatisfactionTopic,
} from '../models/satisfaction.models';
import {
  PedagogicalEvaluationRequest,
  PedagogicalEvaluationResponse,
} from '../models/pedagogical.models';
import { LoginRequest, LoginResponse } from '../models/auth.models';
import { MOCK_DASHBOARD_SUMMARY, getMockContactsPage } from './mock-dashboard-data';

/**
 * DEVELOPMENT-ONLY API simulator.
 *
 * When `environment.useMockApi` is enabled, this interceptor answers the
 * documented MVP endpoints (`/api/v1/...`) with clearly simulated data so the
 * front end can be demonstrated and tested before the real back end exists.
 *
 * Rules:
 * - Registered only when `useMockApi === true`; production requests are never
 *   intercepted and never silently fall back to mock data.
 * - Simulates the back-end responsibilities defined by the business rules:
 *   generating the protocol, the server timestamp and validation responses.
 * - The UI shows a "simulated data" badge while this mode is active.
 */
export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.useMockApi || !req.url.includes('/api/v1/')) {
    return next(req);
  }

  const path = req.url.substring(req.url.indexOf('/api/v1/'));
  return respond(path, req.method.toUpperCase(), req.body as unknown).pipe(
    delay(SIMULATED_NETWORK_DELAY_MS),
  );
};

const SIMULATED_NETWORK_DELAY_MS = 400;

type MockResult = Observable<HttpResponse<unknown>>;

function respond(path: string, method: string, body: unknown): MockResult {
  const ok = <T>(payload: T, status = 200): MockResult =>
    of(new HttpResponse<T>({ body: payload, status, url: reqUrl(path) }));
  const failure = (status: number, message: string): MockResult =>
    throwError(
      () =>
        new HttpErrorResponse({
          status,
          statusText: message,
          url: reqUrl(path),
          error: { message },
        }),
    );

  if (method === 'GET' && path === '/api/v1/health') {
    return ok({ status: 'ok' });
  }

  if (method === 'GET' && path === '/api/v1/topicos-satisfacao') {
    return ok<SatisfactionTopic[]>(MOCK_SATISFACTION_TOPICS);
  }

  if (method === 'POST' && path === '/api/v1/checkins') {
    const request = body as Partial<CheckInRequest> | null;
    if (!request?.visitType || !request.visitorAgeRange) {
      return failure(400, 'Tipo de visita e faixa etária são obrigatórios.');
    }
    if (!request.visitorCount || request.visitorCount < 1) {
      return failure(400, 'A quantidade de visitantes deve ser maior que zero.');
    }
    const response: CheckInResponse = {
      protocol: generateProtocol('CHK'),
      checkedInAt: new Date().toISOString(),
      visitorCountToday: randomInt(80, 260),
    };
    return ok(response, 201);
  }

  if (method === 'POST' && path === '/api/v1/avaliacoes-satisfacao') {
    const request = body as Partial<SatisfactionEvaluationRequest> | null;
    const rating = Number(request?.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return failure(400, 'A nota de satisfação deve ser um inteiro entre 1 e 5.');
    }
    const response: SatisfactionEvaluationResponse = {
      protocol: generateProtocol('SAT'),
      evaluatedAt: new Date().toISOString(),
    };
    return ok(response, 201);
  }

  if (method === 'POST' && path === '/api/v1/avaliacoes-pedagogicas') {
    const request = body as Partial<PedagogicalEvaluationRequest> | null;
    if (!request?.institutionName || !request.network) {
      return failure(400, 'Instituição e rede de ensino são obrigatórias.');
    }
    if (!request.cycles?.length) {
      return failure(400, 'Selecione pelo menos um ciclo de ensino.');
    }
    if (!request.studentCount || request.studentCount < 1) {
      return failure(400, 'O número de estudantes deve ser maior que zero.');
    }
    const response: PedagogicalEvaluationResponse = {
      protocol: generateProtocol('PED'),
      evaluatedAt: new Date().toISOString(),
    };
    return ok(response, 201);
  }

  if (method === 'POST' && path === '/api/v1/auth/login') {
    const request = body as Partial<LoginRequest> | null;
    if (!request?.identifier?.trim() || !request.password || request.password.length < 6) {
      return failure(401, 'Credenciais inválidas.');
    }
    const response: LoginResponse = {
      session: {
        name: 'Curadoria & Mediação',
        email: request.identifier,
        role: 'gestao',
      },
    };
    return ok(response);
  }

  if (method === 'GET' && path.startsWith('/api/v1/dashboard/resumo')) {
    return ok(MOCK_DASHBOARD_SUMMARY);
  }

  if (method === 'GET' && path.startsWith('/api/v1/dashboard/contatos')) {
    const page = Number(new URLSearchParams(path.split('?')[1] ?? '').get('page') ?? '1');
    return ok(getMockContactsPage(Number.isFinite(page) ? page : 1));
  }

  return failure(404, 'Endpoint não encontrado na simulação.');
}

/**
 * Initial satisfaction topics from the MVP requirements document. The official
 * list still requires validation; production must come from
 * `GET /api/v1/topicos-satisfacao` — this mock only simulates that endpoint.
 */
const MOCK_SATISFACTION_TOPICS: SatisfactionTopic[] = [
  { id: 'acervo-historico', label: 'Acervo Histórico', icon: 'history_edu' },
  { id: 'mediacao-monitores', label: 'Atendimento dos Monitores', icon: 'support_agent' },
  { id: 'acessibilidade', label: 'Acessibilidade', icon: 'accessible_forward' },
  { id: 'climatizacao', label: 'Climatização', icon: 'ac_unit' },
  { id: 'iluminacao', label: 'Iluminação das Obras', icon: 'wb_incandescent' },
  { id: 'arquitetura', label: 'Arquitetura do Prédio', icon: 'architecture' },
  { id: 'curadoria-pedagogica', label: 'Curadoria Pedagógica', icon: 'menu_book' },
  { id: 'sinalizacao-rotas', label: 'Sinalização das Rotas', icon: 'signpost' },
];

/** Generates a simulated server-side protocol (mock responsibility only). */
function generateProtocol(prefix: string): string {
  const year = new Date().getFullYear();
  const random = randomInt(100000, 999999);
  return `${prefix}-${year}-${random}`;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function reqUrl(path: string): string {
  return `${environment.apiUrl}${path.replace('/api/v1', '')}`;
}
