/** Education network of the visiting school. */
export type EducationNetwork = 'estadual' | 'municipal' | 'privada' | 'federal';

/** Education cycles/levels attended by the group (multiple allowed). */
export type EducationCycle = 'fund1' | 'fund2' | 'medio' | 'eja' | 'superior';

/** Rating of the UNICAP mediators/monitors. */
export type MediatorRating = 'excelente' | 'muito_bom' | 'regular' | 'insuficiente';

/** Rating of the pedagogical support materials. */
export type MaterialsRating = 'adequado' | 'inadequado' | 'nao_utilizado';

/** Preferred channel for future contact with the school staff. */
export type ContactChannel = 'whatsapp' | 'phone';

/**
 * Payload for `POST /api/v1/avaliacoes-pedagogicas`.
 * The server generates date/time and the evaluation protocol.
 */
export interface PedagogicalEvaluationRequest {
  institutionName: string;
  network: EducationNetwork;
  cycles: EducationCycle[];
  /** Approximate number of students. Must be greater than zero. */
  studentCount: number;
  /** Curriculum alignment (BNCC) score, 1 to 5. */
  curriculumAlignmentScore: 1 | 2 | 3 | 4 | 5;
  mediatorsRating: MediatorRating;
  materialsRating: MaterialsRating;
  suggestions: string | null;
  interestedInFutureVisits: boolean;
  contactChannel: ContactChannel | null;
  contactValue: string | null;
}

/** Response of `POST /api/v1/avaliacoes-pedagogicas`. */
export interface PedagogicalEvaluationResponse {
  protocol: string;
  evaluatedAt: string;
}
