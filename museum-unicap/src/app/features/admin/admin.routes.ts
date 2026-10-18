import { Routes } from '@angular/router';
import { adminGuard } from './admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivateChild: [adminGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        title: 'Dashboard • Portal de Gestão UNICAP',
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
      },
    ],
  },
];
