import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'check-in' },
  {
    path: 'check-in',
    title: 'Check-in • Espaço Cultural UNICAP',
    loadComponent: () => import('./features/check-in/check-in').then((m) => m.CheckIn),
  },
  {
    path: 'avaliacao',
    title: 'Avaliação de Satisfação • Espaço Cultural UNICAP',
    loadComponent: () =>
      import('./features/satisfaction/satisfaction').then((m) => m.Satisfaction),
  },
  {
    path: 'pedagogico',
    title: 'Avaliação Pedagógica • Espaço Cultural UNICAP',
    loadComponent: () =>
      import('./features/pedagogical/pedagogical').then((m) => m.Pedagogical),
  },
  {
    path: 'login',
    title: 'Portal de Gestão • Espaço Cultural UNICAP',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  { path: '**', redirectTo: 'check-in' },
];
