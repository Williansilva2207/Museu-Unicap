import { ContactsPage, DashboardSummary } from '../models/dashboard.models';

/**
 * Simulated dashboard data used exclusively by the `MockApiInterceptor`
 * (development only). Numbers mirror the approved prototype so the UI can be
 * demonstrated before the real back-end exists. This is NOT live data.
 */
export const MOCK_DASHBOARD_SUMMARY: DashboardSummary = {
  generatedAt: '2026-05-24T18:00:00-03:00',
  totalVisits: 4820,
  totalVisitsTrendPct: 14.2,
  schoolsServed: 68,
  studentsMediated: 2340,
  satisfactionPositivePct: 93,
  averageRating: 4.8,
  contactsOptIn: 1845,
  contactsOptInPct: 38.3,
  ageDistribution: [
    { range: 'jovem', count: 1976, percentage: 41 },
    { range: 'adulto', count: 1253, percentage: 26 },
    { range: 'crianca', count: 1060, percentage: 22 },
    { range: 'senior', count: 531, percentage: 11 },
  ],
  visitTypeShare: [
    { label: 'Grupos Escolares', count: 2313, percentage: 48 },
    { label: 'Individual / Espontânea', percentage: 27 },
    { label: 'Famílias', percentage: 16 },
    { label: 'Pesquisa / Cultural', percentage: 9 },
  ],
  cityRanking: [
    { label: 'Recife (Capital)', percentage: 58 },
    { label: 'Olinda', percentage: 18 },
    { label: 'Jaboatão dos Guararapes', percentage: 12 },
    { label: 'Paulista / Abreu e Lima', percentage: 5 },
    { label: 'Demais Estados (PB, AL, RN)', percentage: 7 },
  ],
  neighborhoodHighlights: [
    { label: 'Boa Vista', percentage: 34 },
    { label: 'Soledade', percentage: 16 },
    { label: 'Santo Amaro', percentage: 14 },
    { label: 'Graças', percentage: 12 },
    { label: 'Derby', percentage: 11 },
  ],
  ratingDistribution: [
    { rating: 5, count: 2246, percentage: 72 },
    { rating: 4, count: 655, percentage: 21 },
    { rating: 3, count: 156, percentage: 5 },
    { rating: 2, count: 44, percentage: 1.4 },
    { rating: 1, count: 19, percentage: 0.6 },
  ],
  topTopics: [
    { topicId: 'acervo-historico', label: 'Acervo Histórico UNICAP', icon: 'history_edu', mentions: 1420, percentage: 78 },
    { topicId: 'mediacao-monitores', label: 'Monitores & Guias Mediadores', icon: 'record_voice_over', mentions: 1280, percentage: 70 },
    { topicId: 'climatizacao', label: 'Climatização das Galerias', icon: 'ac_unit', mentions: 940, percentage: 52 },
    { topicId: 'curadoria-pedagogica', label: 'Curadoria Pedagógica e Textos', icon: 'menu_book', mentions: 860, percentage: 47 },
    { topicId: 'arquitetura', label: 'Arquitetura Patrimonial', icon: 'apartment', mentions: 810, percentage: 44 },
  ],
  pedagogical: {
    curriculumAlignmentAvg: 4.9,
    mediatorsExcellentPct: 89,
    networkShare: [
      { label: 'Pública Estadual', percentage: 54 },
      { label: 'Pública Municipal', percentage: 24 },
      { label: 'Rede Privada', percentage: 15 },
      { label: 'Rede Federal / IFPE', percentage: 7 },
    ],
    futureVisitsInterestPct: 96,
  },
  contacts: { items: [], total: 8, page: 1, pageSize: 4 },
};

const MOCK_CONTACT_ITEMS: ContactsPage['items'] = [
  {
    id: 'c-001',
    name: 'Profa. Dra. Mariana Gusmão',
    detail: 'E.E.M. Sylvio Rabello • 35 alunos',
    category: 'docente',
    phone: '(81) 99888-2341',
    email: 'mariana.gusmao@educacao.pe.gov.br',
    origin: 'Recife (Boa Vista)',
    checkedInAt: '2026-05-24T10:15:00-03:00',
    consent: true,
  },
  {
    id: 'c-002',
    name: 'Carlos Eduardo Bezerra',
    detail: 'Estudante Universitário (História)',
    category: 'individual',
    phone: '(81) 98777-9023',
    email: 'carlos.bezerra@unicap.br',
    origin: 'Olinda (Bairro Novo)',
    checkedInAt: '2026-05-24T11:40:00-03:00',
    consent: true,
  },
  {
    id: 'c-003',
    name: 'Família Silveira & Rocha',
    detail: 'Grupo de 4 pessoas (2 adultos + 2 crianças)',
    category: 'familia',
    phone: '(81) 99123-4567',
    email: 'silveira.rocha@gmail.com',
    origin: 'Recife (Graças)',
    checkedInAt: '2026-05-24T14:05:00-03:00',
    consent: true,
  },
  {
    id: 'c-004',
    name: 'Prof. Thiago Menezes',
    detail: 'Pesquisa Barroco Pernambucano (UFPE)',
    category: 'pesquisa',
    phone: '(81) 98811-3322',
    email: 'thiago.menezes@ufpe.br',
    origin: 'Recife (Derby)',
    checkedInAt: '2026-05-23T16:30:00-03:00',
    consent: true,
  },
  {
    id: 'c-005',
    name: 'Escola Municipal Monteiro Lobato',
    detail: 'Turma Fundamental II • 42 alunos',
    category: 'docente',
    phone: '(81) 98444-1020',
    email: 'coordenacao@emlobato.rec.br',
    origin: 'Recife (Espinheiro)',
    checkedInAt: '2026-05-22T09:20:00-03:00',
    consent: true,
  },
  {
    id: 'c-006',
    name: 'Ana Paula Ferreira',
    detail: 'Visita individual',
    category: 'individual',
    phone: '(81) 99555-8877',
    email: 'ana.ferreira@exemplo.com.br',
    origin: 'Jaboatão dos Guararapes',
    checkedInAt: '2026-05-22T13:45:00-03:00',
    consent: false,
  },
  {
    id: 'c-007',
    name: 'Colégio Santa Clara',
    detail: 'Ensino Médio • 3 turmas (98 alunos)',
    category: 'docente',
    phone: '(81) 98222-3040',
    email: 'eventos@santaclara.pe.edu.br',
    origin: 'Paulista',
    checkedInAt: '2026-05-21T08:50:00-03:00',
    consent: true,
  },
  {
    id: 'c-008',
    name: 'Marcos Antônio Lins',
    detail: 'Pesquisador (Museologia UFPE)',
    category: 'pesquisa',
    phone: '(81) 99333-2211',
    email: 'marcos.lins@ufpe.br',
    origin: 'Recife (Casa Forte)',
    checkedInAt: '2026-05-20T15:10:00-03:00',
    consent: false,
  },
];

/** Returns a paginated slice of the simulated contacts. */
export function getMockContactsPage(page: number, pageSize = 4): ContactsPage {
  const total = MOCK_CONTACT_ITEMS.length;
  const safePage = Math.min(Math.max(1, page), Math.max(1, Math.ceil(total / pageSize)));
  const start = (safePage - 1) * pageSize;
  return {
    items: MOCK_CONTACT_ITEMS.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
  };
}
