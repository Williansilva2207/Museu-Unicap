import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Pedagogical } from './pedagogical';
import {
  clickButton,
  clickChoiceByLabel,
  clickRadio,
  setInputValue,
  settle,
  submitForm,
} from '../../testing/dom-helpers';

describe('Pedagogical', () => {
  let httpMock: HttpTestingController;

  const setup = async () => {
    const fixture = TestBed.createComponent(Pedagogical);
    await settle(fixture);
    return { fixture, element: fixture.nativeElement as HTMLElement };
  };

  const fillStepOne = (element: HTMLElement) => {
    setInputValue(element, 'institution-name', 'E.E.M. Sylvio Rabello');
    clickRadio(element, 'estadual');
    clickChoiceByLabel(element, 'Ensino Médio');
    setInputValue(element, 'students-count', '35');
  };

  const fillStepTwo = (element: HTMLElement) => {
    clickRadio(element, '5');
    clickRadio(element, 'excelente');
    clickRadio(element, 'adequado');
  };

  const goToFinalStep = async (fixture: Parameters<typeof settle>[0], element: HTMLElement) => {
    fillStepOne(element);
    clickButton(element, 'Avançar para Mediação');
    await settle(fixture);
    fillStepTwo(element);
    clickButton(element, 'Avançar para Avaliação Final');
    await settle(fixture);
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Pedagogical],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should block advancing to step 2 while required school data is missing', async () => {
    const { fixture, element } = await setup();

    clickButton(element, 'Avançar para Mediação');
    await settle(fixture);

    expect(element.textContent).toContain('Informe o nome da instituição de ensino.');
    expect(element.textContent).not.toContain('Experiência Curricular');
  });

  it('should advance through the three steps when each one is valid', async () => {
    const { fixture, element } = await setup();

    fillStepOne(element);
    clickButton(element, 'Avançar para Mediação');
    await settle(fixture);
    expect(element.textContent).toContain('Experiência Curricular');

    fillStepTwo(element);
    clickButton(element, 'Avançar para Avaliação Final');
    await settle(fixture);
    expect(element.textContent).toContain('Contribuição & Continuidade');
  });

  it('should submit the pedagogical report and confirm with a protocol', async () => {
    const { fixture, element } = await setup();

    await goToFinalStep(fixture, element);
    clickChoiceByLabel(element, 'Agendar novas visitas escolares?');
    setInputValue(element, 'suggestions', 'Roteiro excelente para História de PE.');
    submitForm(element);

    const request = httpMock.expectOne('/api/v1/avaliacoes-pedagogicas');
    expect(request.request.body).toEqual(
      expect.objectContaining({
        institutionName: 'E.E.M. Sylvio Rabello',
        network: 'estadual',
        cycles: ['medio'],
        studentCount: 35,
        curriculumAlignmentScore: 5,
        mediatorsRating: 'excelente',
        materialsRating: 'adequado',
        interestedInFutureVisits: true,
      }),
    );
    request.flush({
      protocol: 'PED-2026-999999',
      evaluatedAt: '2026-10-18T11:00:00-03:00',
    });
    await settle(fixture);

    expect(element.textContent).toContain('Relatório Enviado!');
    expect(element.textContent).toContain('PED-2026-999999');
  });

  it('should not confirm the report when the API fails', async () => {
    const { fixture, element } = await setup();

    await goToFinalStep(fixture, element);
    submitForm(element);

    const request = httpMock.expectOne('/api/v1/avaliacoes-pedagogicas');
    request.flush({ message: 'Serviço indisponível.' }, { status: 503, statusText: 'Error' });
    await settle(fixture);

    expect(element.textContent).not.toContain('Relatório Enviado!');
    expect(element.textContent).toContain('Serviço indisponível.');
  });
});
