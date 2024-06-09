import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { isDateGreaterThanToday } from '@shared/validators/isDateGreaterThanToday';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-add-employee',
  styleUrl: 'add.component.scss',
  standalone: true,
  templateUrl: 'add.component.html',
})
export class AddEmployeeComponent implements OnInit {
  public formGroup!: FormGroup;

  constructor(
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder
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

    console.log(this.formGroup.getRawValue());
  }

  public navigateTo(path: string): void {
    this._router.navigateByUrl(path);
  }

  public ngOnInit(): void {
    this._setupForm();
  }
}
