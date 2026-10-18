# MuseumUnicap

Front end for the **Espaço Cultural e Museu da UNICAP** digital collection and BI
system, built with Angular 22 (standalone components, signals and Signal Forms).

## Application routes

| Route | Purpose |
| --- | --- |
| `/check-in` | Reception kiosk check-in (visit type, visitor profile, origin, optional LGPD contact) |
| `/avaliacao` | Exit kiosk anonymous satisfaction survey (1–5 rating + optional topics from the API) |
| `/pedagogico` | Post-visit pedagogical report for teachers (3-step wizard) |
| `/login` | Management portal sign-in (UX gate only; real auth is back-end responsibility) |
| `/admin/dashboard` | Management dashboard with visit, satisfaction and pedagogical indicators |

## Simulated API (development only)

Until the institutional back end is available, the clearly named
`MockApiInterceptor` simulates the documented MVP endpoints when
`environment.useMockApi` is enabled (`environment.development.ts`). It generates
protocols, server timestamps and validation responses exactly like the real API
should, and the UI displays a "simulated data" badge while it is active.
Production builds never activate the mock.

Documented MVP endpoints used by the front end:

- `POST /api/v1/checkins`
- `POST /api/v1/avaliacoes-satisfacao`
- `GET /api/v1/topicos-satisfacao`
- `POST /api/v1/avaliacoes-pedagogicas`
- `GET /api/v1/health`

Proposed (pending back-end confirmation): `POST /api/v1/auth/login`,
`GET /api/v1/dashboard/resumo` and `GET /api/v1/dashboard/contatos`.

## Project structure

```
src/app/
  core/        models, domain option lists, HTTP services and the mock interceptor
  shared/      reusable UI primitives (accessible modal dialog)
  features/    check-in, satisfaction, pedagogical, login and admin (lazy routes)
  testing/     DOM helpers for component specs
```

Design tokens and shared primitives (buttons, chips, cards, inputs) live in
`src/styles.scss`, extracted from the prototype design system
(`PROTÓTIPO/espa_o_cultural_unicap_touch_experience/DESIGN.md`).

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
