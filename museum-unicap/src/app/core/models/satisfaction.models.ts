/** Likert scale rating: 1 (very poor) to 5 (excellent). */
export type SatisfactionRating = 1 | 2 | 3 | 4 | 5;

/** Active satisfaction topic served by the back end. */
export interface SatisfactionTopic {
  id: string;
  label: string;
  /** Material Symbols icon name rendered in the touch chip. */
  icon: string;
}

/**
 * Payload for `POST /api/v1/avaliacoes-satisfacao`.
 * Evaluations are anonymous: no personal information is collected.
 */
export interface SatisfactionEvaluationRequest {
  rating: SatisfactionRating;
  /** Optional list of selected topic ids (zero, one or many). */
  topicIds: string[];
  terminalId: string;
}

/** Response of `POST /api/v1/avaliacoes-satisfacao`. */
export interface SatisfactionEvaluationResponse {
  protocol: string;
  evaluatedAt: string;
}
