import { Employee } from '@shared/interfaces/employee.interface';
import { CommonModule } from '@angular/common';
import { StatusComponent } from '@shared/components/status.component';
import { LocalStorageService } from '@shared/services/local-storage.service';

import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  imports: [CommonModule, StatusComponent],
  selector: 'app-employee-details',
  styleUrl: 'details.component.scss',
  standalone: true,
  templateUrl: 'details.component.html',
})
export class EmployeeDetailsComponent implements OnInit {
  private readonly _id: string = this._activatedRoute.snapshot.params['id'];

  public data!: Employee | undefined;

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _localStorageService: LocalStorageService
  ) {}

  private _findEmployee(id: string): Employee | undefined {
    const employees: Employee[] = this._localStorageService.get('employees');

    return employees.find((emplyee: Employee): boolean => emplyee.id === id);
  }

  public navigateTo(path: string): void {
    this._router.navigateByUrl(path);
  }

  public ngOnInit(): void {
    if (!this._localStorageService.get('employees')) {
      this.navigateTo('/employees');

      return;
    }

    const employee: Employee | any = this._findEmployee(this._id);

    if (!employee) {
      this.navigateTo('/employees');

      return;
    }

    this.data = employee;
  }
}
