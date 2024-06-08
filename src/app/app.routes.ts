import { Routes } from '@angular/router';
import { SignInComponent } from './routes/sessions/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [{ path: 'sign-in', component: SignInComponent }],
  },
  {
    path: 'auth',
    children: [{ path: 'sign-in', component: SignInComponent }],
  },
];
