import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '@shared/services/local-storage.service';

import { OnInit, Component } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { isDateGreaterThanToday } from '@shared/validators/isDateGreaterThanToday';

@Component({
  imports: [CommonModule, ToastrModule, ReactiveFormsModule],
  selector: 'app-add-employee',
  styleUrl: 'add.component.scss',
  standalone: true,
  templateUrl: 'add.component.html',
})
export class AddEmployeeComponent implements OnInit {
  public formGroup!: FormGroup;

  constructor(
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _toastrService: ToastrService,
    private readonly _localStorageService: LocalStorageService
  ) {}

  private _setupForm(): void {
    this.formGroup = this._formBuilder.group({
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

  public handleSave(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();

      return;
    }

    let employees = this._localStorageService.get('employees');

    if (employees) {
      employees = [...employees, this.formGroup.getRawValue()];
    }

    this._localStorageService.set('employees', employees);

    this._toastrService.success(
      'The employee has been successfully added to the system.',
      'Employee Added'
    );

    this.navigateTo('/employees');
  }

  public navigateTo(path: string): void {
    this._router.navigateByUrl(path);
  }

  public ngOnInit(): void {
    this._setupForm();
  }
}
