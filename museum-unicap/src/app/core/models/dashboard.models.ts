import { SatisfactionRating } from './satisfaction.models';

/** Generic labeled share/percentage entry used across dashboard charts. */
export interface ShareEntry {
  label: string;
  /** Absolute count, when available. */
  count?: number;
  /** Percentage (0–100). */
  percentage: number;
}

/** Age distribution of check-ins. */
export interface AgeDistributionEntry {
  range: 'crianca' | 'jovem' | 'adulto' | 'senior';
  count: number;
  percentage: number;
}

/** Distribution of the 1–5 satisfaction ratings. */
export interface RatingDistributionEntry {
  rating: SatisfactionRating;
  count: number;
  percentage: number;
}

/** Most-selected satisfaction topics. */
export interface TopicEntry {
  topicId: string;
  label: string;
  icon: string;
  mentions: number;
  percentage: number;
}

/** A contact record with explicit LGPD consent state. */
export interface ContactRecord {
  id: string;
  /** Display name (visitor or school staff). */
  name: string;
  /** Contextual detail, e.g. school name and group size. */
  detail: string;
  category: 'docente' | 'individual' | 'familia' | 'pesquisa';
  phone: string;
  email: string;
  origin: string;
  /** ISO 8601 check-in timestamp. */
  checkedInAt: string;
  /** Whether communication consent was explicitly granted. */
  consent: boolean;
}

/** Paginated contacts list. */
export interface ContactsPage {
  items: ContactRecord[];
  total: number;
  page: number;
  pageSize: number;
}

/** Pedagogical impact indicators. */
export interface PedagogicalIndicators {
  curriculumAlignmentAvg: number;
  mediatorsExcellentPct: number;
  networkShare: ShareEntry[];
  futureVisitsInterestPct: number;
}

/**
 * Aggregated dashboard summary.
 *
 * NOTE: the aggregating endpoint is a *proposed* contract
 * (`GET /api/v1/dashboard/resumo`) pending back-end confirmation.
 */
export interface DashboardSummary {
  /** ISO 8601 moment the indicators were generated. */
  generatedAt: string;
  totalVisits: number;
  /** Percentage change versus the previous period. */
  totalVisitsTrendPct: number;
  schoolsServed: number;
  studentsMediated: number;
  /** Share of ratings 4–5. */
  satisfactionPositivePct: number;
  averageRating: number;
  contactsOptIn: number;
  contactsOptInPct: number;
  ageDistribution: AgeDistributionEntry[];
  visitTypeShare: ShareEntry[];
  cityRanking: ShareEntry[];
  neighborhoodHighlights: ShareEntry[];
  ratingDistribution: RatingDistributionEntry[];
  topTopics: TopicEntry[];
  pedagogical: PedagogicalIndicators;
  contacts: ContactsPage;
}
