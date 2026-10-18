import { HttpErrorResponse } from '@angular/common/http';

/**
 * Maps an HTTP failure to a user-facing Brazilian Portuguese message without
 * leaking internal details such as stack traces, URLs or payloads.
 */
export function apiErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    const serverMessage = (error.error as { message?: string } | null)?.message;
    if (serverMessage) {
      return serverMessage;
    }
    switch (error.status) {
      case 0:
        return 'Não foi possível conectar ao servidor. Verifique a conexão e tente novamente.';
      case 400:
        return 'Dados inválidos. Revise as informações e tente novamente.';
      case 401:
      case 403:
        return 'Acesso não autorizado.';
      case 404:
        return 'Serviço não encontrado.';
      default:
        return 'O servidor não respondeu corretamente. Tente novamente em instantes.';
    }
  }
  return 'Ocorreu um erro inesperado. Tente novamente.';
}
