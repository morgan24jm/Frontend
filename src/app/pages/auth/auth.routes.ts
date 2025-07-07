import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // para /auth redirige a /auth/login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
