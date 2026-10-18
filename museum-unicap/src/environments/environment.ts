/**
 * Production environment configuration.
 *
 * `apiUrl` must point to the official back-end through a reverse proxy or the
 * same origin. Never hard-code machine-specific addresses or credentials here.
 */
export const environment = {
  production: true,
  /** Base URL of the Museu UNICAP REST API (MVP contract: /api/v1). */
  apiUrl: '/api/v1',
  /** Mock API simulator — MUST stay false outside local development. */
  useMockApi: false,
  /** Identity of the terminal running this instance. Configure per device. */
  terminalId: 'terminal-02',
};
