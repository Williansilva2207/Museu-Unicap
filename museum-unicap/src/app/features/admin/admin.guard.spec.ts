import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { adminGuard } from './admin.guard';
import { AuthService } from '../../core/services/auth.service';

describe('adminGuard', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  const runGuard = () =>
    TestBed.runInInjectionContext(() =>
      adminGuard({} as never, { url: '/admin/dashboard' } as never),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should redirect anonymous users to the login screen', () => {
    const result = runGuard();
    const urlTree = result as { toString(): string };
    expect(urlTree.toString()).toContain('/login');
  });

  it('should allow access for an authenticated session', () => {
    authService.login({ identifier: 'gestao@unicap.br', password: '123456' }).subscribe();
    httpMock
      .expectOne('/api/v1/auth/login')
      .flush({ session: { name: 'Gestão', email: 'gestao@unicap.br', role: 'gestao' } });

    expect(runGuard()).toBe(true);
  });

  it('should block access again after logout', () => {
    authService.login({ identifier: 'gestao@unicap.br', password: '123456' }).subscribe();
    httpMock
      .expectOne('/api/v1/auth/login')
      .flush({ session: { name: 'Gestão', email: 'gestao@unicap.br', role: 'gestao' } });

    authService.logout();

    const result = runGuard();
    expect((result as { toString(): string }).toString()).toContain('/login');
  });
});
