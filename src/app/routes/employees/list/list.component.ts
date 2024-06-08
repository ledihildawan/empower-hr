import { Component, inject } from '@angular/core';
import { InputSearchComponent } from '@shared/components/input-search/input-search.component';
import { EntriesPerPageComponent } from '@shared/components/entries-per-page.component';
import { Router, RouterLink } from '@angular/router';

import data from './data';
import { CommonModule } from '@angular/common';

@Component({
  imports: [InputSearchComponent, EntriesPerPageComponent, CommonModule],
  selector: 'app-employees',
  styleUrl: 'list.component.scss',
  standalone: true,
  templateUrl: 'list.component.html',
})
export class EmployeesComponent {
  router: Router = inject(Router);
  employees: Employee[] = data;
}

interface Employee {
  email: string;
  group: string;
  status: string;
  username: string;
  lastName: string;
  birthDate: string;
  firstName: string;
  basicSalary: number;
  description: string;
}
