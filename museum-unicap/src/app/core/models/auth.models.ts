/** Credentials for the management portal login. */
export interface LoginRequest {
  /** Institutional e-mail or registration number. */
  identifier: string;
  password: string;
}

/** Session user returned by the (future) authentication endpoint. */
export interface AuthSession {
  name: string;
  email: string;
  role: string;
}

/** Response of the proposed `POST /api/v1/auth/login` endpoint. */
export interface LoginResponse {
  session: AuthSession;
}
