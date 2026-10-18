import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Satisfaction } from './satisfaction';
import { clickRadio, settle, submitForm } from '../../testing/dom-helpers';

describe('Satisfaction', () => {
  let httpMock: HttpTestingController;

  const setup = async () => {
    const fixture = TestBed.createComponent(Satisfaction);
    await settle(fixture);
    return { fixture, element: fixture.nativeElement as HTMLElement };
  };

  const flushTopics = (topics: unknown[]) => {
    httpMock.expectOne('/api/v1/topicos-satisfacao').flush(topics);
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Satisfaction],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load the satisfaction topics from the API', async () => {
    const { fixture, element } = await setup();

    flushTopics([
      { id: 'acervo-historico', label: 'Acervo Histórico', icon: 'history_edu' },
      { id: 'climatizacao', label: 'Climatização', icon: 'ac_unit' },
    ]);
    await settle(fixture);

    expect(element.textContent).toContain('Acervo Histórico');
    expect(element.textContent).toContain('Climatização');
  });

  it('should keep the rating section usable when topics fail to load', async () => {
    const { fixture, element } = await setup();

    httpMock
      .expectOne('/api/v1/topicos-satisfacao')
      .flush({ message: 'indisponível' }, { status: 500, statusText: 'Error' });
    await settle(fixture);

    expect(element.textContent).toContain('Não foi possível carregar os tópicos agora');
    expect(element.textContent).toContain('Enviar Avaliação');
  });

  it('should require a rating before submitting', async () => {
    const { fixture, element } = await setup();

    flushTopics([]);
    submitForm(element);
    await settle(fixture);

    expect(element.textContent).toContain(
      'Toque em uma nota de 1 a 5 para enviar sua avaliação.',
    );
    httpMock.expectNone('/api/v1/avaliacoes-satisfacao');
  });

  it('should submit the anonymous evaluation and thank the visitor on success', async () => {
    const { fixture, element } = await setup();

    flushTopics([]);
    clickRadio(element, '5');
    submitForm(element);

    const request = httpMock.expectOne('/api/v1/avaliacoes-satisfacao');
    expect(request.request.body).toEqual(expect.objectContaining({ rating: 5 }));
    request.flush({ protocol: 'SAT-2026-888888', evaluatedAt: '2026-10-18T10:00:00-03:00' });
    await settle(fixture);

    expect(element.textContent).toContain('Muito obrigado!');
  });

  it('should not thank the visitor when the submission fails', async () => {
    const { fixture, element } = await setup();

    flushTopics([]);
    clickRadio(element, '3');
    submitForm(element);

    const request = httpMock.expectOne('/api/v1/avaliacoes-satisfacao');
    expect(request.request.body).toEqual(expect.objectContaining({ rating: 3 }));
    request.flush({ message: 'Falha ao registrar.' }, { status: 500, statusText: 'Error' });
    await settle(fixture);

    expect(element.textContent).not.toContain('Muito obrigado!');
    expect(element.textContent).toContain('Falha ao registrar.');
  });
});
