import { Routes } from '@angular/router';
import { EmployeesComponent } from './list/list.component';
import { AddEmployeeComponent } from './add/add.component';
import { EditEmployeeComponent } from './edit/edit.component';
import { EmployeeDetailsComponent } from './details/details.component';

export const routes: Routes = [
  { path: '', component: EmployeesComponent },
  { path: 'add', component: AddEmployeeComponent },
  { path: ':id/edit', component: EditEmployeeComponent },
  { path: ':id/details', component: EmployeeDetailsComponent },
];
