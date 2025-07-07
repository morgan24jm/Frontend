import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './pages/auth/auth.routes';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },  // redirige a /auth
  { path: 'auth', children: AUTH_ROUTES },              // las rutas hijas bajo /auth
  { path: '**', redirectTo: '/auth' }
];
