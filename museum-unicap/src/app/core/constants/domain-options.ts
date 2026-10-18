import { AgeRange, InstitutionalBond, VisitType } from '../models/checkin.models';
import {
  EducationCycle,
  EducationNetwork,
  MaterialsRating,
  MediatorRating,
} from '../models/pedagogical.models';
import { SatisfactionRating } from '../models/satisfaction.models';

/**
 * Canonical option lists shared by the touch forms and the dashboard.
 *
 * Values must stay aligned with the API contract. Labels are user-facing
 * (Brazilian Portuguese) and can be adjusted without breaking the contract.
 */

export interface LabeledOption<T> {
  value: T;
  label: string;
}

export interface VisitTypeOption {
  value: VisitType;
  label: string;
  description: string;
  hint: string;
  icon: string;
}

export const VISIT_TYPE_OPTIONS: readonly VisitTypeOption[] = [
  {
    value: 'individual',
    label: 'Individual',
    description: '1 pessoa • Acesso livre',
    hint: 'Visita autônoma ao acervo',
    icon: 'person',
  },
  {
    value: 'familia',
    label: 'Família',
    description: 'Adultos e crianças acompanhadas',
    hint: 'Atividades lúdicas infantis',
    icon: 'family_restroom',
  },
  {
    value: 'escola',
    label: 'Grupo Escolar',
    description: 'Colégios, turmas ou excursão',
    hint: 'Roteiro pedagógico mediado',
    icon: 'school',
  },
  {
    value: 'academico',
    label: 'Cultural / Pesquisa',
    description: 'Pesquisador, palestra ou docência',
    hint: 'Consulta a arquivos e obras',
    icon: 'menu_book',
  },
] as const;

export const AGE_RANGE_OPTIONS: readonly (LabeledOption<AgeRange> & { range: string })[] = [
  { value: 'crianca', label: 'Criança', range: '0 a 12 anos' },
  { value: 'jovem', label: 'Jovem', range: '13 a 24 anos' },
  { value: 'adulto', label: 'Adulto', range: '25 a 59 anos' },
  { value: 'senior', label: 'Sênior', range: '60+ anos' },
] as const;

export const INSTITUTIONAL_BOND_OPTIONS: readonly LabeledOption<InstitutionalBond>[] = [
  { value: 'comunidade', label: 'Público Geral / Visitante Externo' },
  { value: 'aluno', label: 'Estudante UNICAP' },
  { value: 'professor', label: 'Docente / Colaborador' },
  { value: 'egresso', label: 'Egresso / Alumni' },
] as const;

export const FEDERATION_UNIT_OPTIONS: readonly LabeledOption<string>[] = [
  { value: 'PE', label: 'Pernambuco (PE)' },
  { value: 'PB', label: 'Paraíba (PB)' },
  { value: 'AL', label: 'Alagoas (AL)' },
  { value: 'RN', label: 'Rio Grande do Norte (RN)' },
  { value: 'OUTRO', label: 'Outro Estado / Internacional' },
] as const;

export const MUNICIPALITY_OPTIONS: readonly LabeledOption<string>[] = [
  { value: 'Recife', label: 'Recife' },
  { value: 'Olinda', label: 'Olinda' },
  { value: 'Jaboatão', label: 'Jaboatão dos Guararapes' },
  { value: 'Paulista', label: 'Paulista' },
  { value: 'Camaragibe', label: 'Camaragibe' },
  { value: 'Outro', label: 'Outro Município' },
] as const;

/** Quick-select neighborhoods shown when the municipality is Recife. */
export const RECIFE_NEIGHBORHOOD_OPTIONS: readonly LabeledOption<string>[] = [
  { value: 'Boa Vista', label: 'Boa Vista (Campus)' },
  { value: 'Santo Amaro', label: 'Santo Amaro' },
  { value: 'Soledade', label: 'Soledade' },
  { value: 'Graças', label: 'Graças' },
  { value: 'Derby', label: 'Derby' },
  { value: 'Espinheiro', label: 'Espinheiro' },
  { value: 'Casa Forte', label: 'Casa Forte' },
  { value: 'Outro', label: 'Outro Bairro' },
] as const;

export const EDUCATION_NETWORK_OPTIONS: readonly LabeledOption<EducationNetwork>[] = [
  { value: 'estadual', label: 'Pública Estadual' },
  { value: 'municipal', label: 'Pública Municipal' },
  { value: 'privada', label: 'Rede Privada' },
  { value: 'federal', label: 'Rede Federal / IFPE' },
] as const;

export const EDUCATION_CYCLE_OPTIONS: readonly LabeledOption<EducationCycle>[] = [
  { value: 'fund1', label: 'Fundamental I' },
  { value: 'fund2', label: 'Fundamental II' },
  { value: 'medio', label: 'Ensino Médio' },
  { value: 'eja', label: 'EJA' },
  { value: 'superior', label: 'Ensino Superior' },
] as const;

export const MEDIATOR_RATING_OPTIONS: readonly (LabeledOption<MediatorRating> & { icon: string })[] = [
  { value: 'excelente', label: 'Excelente', icon: 'sentiment_very_satisfied' },
  { value: 'muito_bom', label: 'Muito bom', icon: 'sentiment_satisfied' },
  { value: 'regular', label: 'Regular', icon: 'sentiment_neutral' },
  { value: 'insuficiente', label: 'Insuficiente', icon: 'sentiment_dissatisfied' },
] as const;

export const MATERIALS_RATING_OPTIONS: readonly (LabeledOption<MaterialsRating> & { icon: string })[] = [
  { value: 'adequado', label: 'Adequado', icon: 'thumb_up' },
  { value: 'inadequado', label: 'Inadequado', icon: 'thumb_down' },
  { value: 'nao_utilizado', label: 'Não utilizei', icon: 'remove_done' },
] as const;

export const CURRICULUM_ALIGNMENT_SCALE: readonly (LabeledOption<number> & { caption: string })[] = [
  { value: 1, label: '1', caption: 'Baixa' },
  { value: 2, label: '2', caption: 'Parcial' },
  { value: 3, label: '3', caption: 'Média' },
  { value: 4, label: '4', caption: 'Alta' },
  { value: 5, label: '5', caption: 'Excelente' },
] as const;

export interface RatingScaleOption {
  value: SatisfactionRating;
  label: string;
  caption: string;
  emoji: string;
}

/** Likert labels per the MVP business rules (1 = very poor … 5 = excellent). */
export const RATING_SCALE_OPTIONS: readonly RatingScaleOption[] = [
  { value: 1, label: 'Muito Ruim', caption: 'Frustrante', emoji: '😞' },
  { value: 2, label: 'Ruim', caption: 'Insatisfatória', emoji: '🙁' },
  { value: 3, label: 'Regular', caption: 'Mediana', emoji: '😐' },
  { value: 4, label: 'Boa', caption: 'Agradável', emoji: '🙂' },
  { value: 5, label: 'Excelente', caption: 'Marcante', emoji: '🤩' },
] as const;

/** Municipalities that trigger the Recife neighborhood quick-select. */
export const MUNICIPALITY_WITH_NEIGHBORHOODS = 'Recife';
