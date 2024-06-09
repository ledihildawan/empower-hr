import { Routes } from '@angular/router';
import { SignInComponent } from './routes/sessions/sign-in/sign-in.component';
import { Error403Component } from './routes/sessions/403.component';
import { Error404Component } from './routes/sessions/404.component';
import { Error500Component } from './routes/sessions/500.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { authenticationGuard } from '@core/authentication/authentication.guard';
import { AdminLayoutComponent } from 'theme/admin-layout/admin-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: '403', component: Error403Component },
      { path: '404', component: Error404Component },
      { path: '500', component: Error500Component },
      {
        path: 'employees',
        loadChildren: () =>
          import('./routes/employees/employees.routes').then((m) => m.routes),
      },
    ],
    canActivate: [authenticationGuard],
    canActivateChild: [authenticationGuard],
  },
  {
    path: 'auth',
    children: [{ path: 'sign-in', component: SignInComponent }],
  },
  // { path: '**', redirectTo: 'dashboard' },
];
