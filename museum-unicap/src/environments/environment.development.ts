/**
 * Development environment configuration.
 *
 * `useMockApi` enables the clearly named `MockApiInterceptor`, which simulates
 * the documented MVP endpoints (check-ins, satisfaction, pedagogical,
 * dashboard, auth) so the front end can be demonstrated and tested before the
 * real back end exists. The UI displays a "simulated data" badge while active.
 */
export const environment = {
  production: false,
  apiUrl: '/api/v1',
  useMockApi: true,
  terminalId: 'terminal-02',
};
