import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { Login } from './login';
import { setInputValue, settle, submitForm } from '../../testing/dom-helpers';

@Component({ template: '' })
class AdminDashboardStub {}

describe('Login', () => {
  let httpMock: HttpTestingController;
  let location: Location;

  const setup = async () => {
    const fixture = TestBed.createComponent(Login);
    await settle(fixture);
    return { fixture, element: fixture.nativeElement as HTMLElement };
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([{ path: 'admin/dashboard', component: AdminDashboardStub }]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    location = TestBed.inject(Location);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should require credentials before submitting', async () => {
    const { fixture, element } = await setup();

    submitForm(element);
    await settle(fixture);

    expect(element.textContent).toContain('Informe seu e-mail institucional ou matrícula.');
    httpMock.expectNone('/api/v1/auth/login');
  });

  it('should navigate to the dashboard after a successful login', async () => {
    const { fixture, element } = await setup();

    setInputValue(element, 'identifier', 'curadoria.arte@unicap.br');
    setInputValue(element, 'password', 'unicap2026');
    submitForm(element);

    const request = httpMock.expectOne('/api/v1/auth/login');
    expect(request.request.body).toEqual({
      identifier: 'curadoria.arte@unicap.br',
      password: 'unicap2026',
    });
    request.flush({
      session: {
        name: 'Curadoria & Mediação',
        email: 'curadoria.arte@unicap.br',
        role: 'gestao',
      },
    });
    await settle(fixture);

    expect(location.path()).toBe('/admin/dashboard');
  });

  it('should show the server message and stay on the page after invalid credentials', async () => {
    const { fixture, element } = await setup();

    setInputValue(element, 'identifier', 'curadoria.arte@unicap.br');
    setInputValue(element, 'password', 'errada');
    submitForm(element);

    const request = httpMock.expectOne('/api/v1/auth/login');
    request.flush({ message: 'Credenciais inválidas.' }, { status: 401, statusText: 'Error' });
    await settle(fixture);

    expect(element.textContent).toContain('Credenciais inválidas.');
    expect(location.path()).toBe('');
  });
});
