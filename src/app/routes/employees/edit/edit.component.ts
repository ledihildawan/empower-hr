import { Employee } from '@shared/interfaces/employee.interface';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '@shared/services/local-storage.service';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { OnInit, Component } from '@angular/core';

import { isDateGreaterThanToday } from '@shared/validators/isDateGreaterThanToday';

@Component({
  imports: [CommonModule, ToastrModule, ReactiveFormsModule],
  selector: 'app-edit-employee',
  styleUrl: 'edit.component.scss',
  standalone: true,
  templateUrl: 'edit.component.html',
})
export class EditEmployeeComponent implements OnInit {
  private readonly _id: string = this._activatedRoute.snapshot.params['id'];

  public data!: Employee | undefined;
  public formGroup!: FormGroup;

  constructor(
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _toastrService: ToastrService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _localStorageService: LocalStorageService
  ) {}

  private _setupForm(): void {
    this.formGroup = this._formBuilder.group({
      id: [''],
      email: ['', [Validators.required, Validators.email]],
      group: ['', Validators.required],
      status: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      birthDate: ['', [Validators.required, isDateGreaterThanToday()]],
      firstName: ['', Validators.required],
      basicSalary: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  private _findEmployee(id: string): Employee | undefined {
    const employees: Employee[] = this._localStorageService.get('employees');

    return employees.find((emplyee: Employee): boolean => emplyee.id === id);
  }

  public navigateTo(path: string): void {
    this._router.navigateByUrl(path);
  }

  public handleUpdate(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();

      return;
    }

    const employees: Employee[] = this._localStorageService.get('employees');
    const employeeIdx: number = employees.findIndex(
      (employee: Employee): boolean => employee.id === this._id
    );

    employees[employeeIdx] = this.formGroup.getRawValue();

    this._localStorageService.set('employees', employees);

    this._toastrService.success(
      'The employee information has been successfully updated.',
      'Employee Updated!'
    );

    this.navigateTo('/employees');
  }

  public ngOnInit(): void {
    if (!this._localStorageService.get('employees')) {
      this.navigateTo('/employees');

      return;
    }

    this._setupForm();

    const employee: Employee | any = this._findEmployee(this._id);

    if (!employee) {
      this.navigateTo('/employees');

      return;
    }

    this.formGroup.patchValue((this.data = employee));
  }
}
