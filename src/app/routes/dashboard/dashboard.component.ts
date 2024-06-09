import { Component, OnInit } from '@angular/core';
import { Employee } from '@shared/interfaces/employee.interface';
import { LocalStorageService } from '@shared/services/local-storage.service';

import employees from '@data/employees';

@Component({
  selector: 'app-dashboard',
  styleUrl: 'dashboard.component.scss',
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public employees!: Employee[] | undefined;

  constructor(private readonly _localStorageService: LocalStorageService) {}

  public ngOnInit(): void {
    if (!this._localStorageService.has('employees')) {
      this._localStorageService.set('employees', employees);
    }

    this.employees = this._localStorageService.get('employees');
  }
}
