import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OnInit, Component } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { LocalStorageService } from '@shared/services/local-storage.service';

@Component({
  imports: [ToastrModule, CommonModule, ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: 'sign-in.component.scss',
  standalone: true,
  templateUrl: 'sign-in.component.html',
})
export class SignInComponent implements OnInit {
  public formGroup!: FormGroup;
  public isSubmitted!: boolean;

  public get username() {
    return this.formGroup.get('username');
  }

  public get password() {
    return this.formGroup.get('password');
  }

  constructor(
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _toastrService: ToastrService,
    private readonly _localStorageService: LocalStorageService
  ) {}

  private _setupForm(): void {
    this.formGroup = this._formBuilder.group({
      username: ['EmpowerHR', Validators.required],
      password: ['EmpowerHR', Validators.required],
    });
  }

  public handleSignIn(): void {
    this.isSubmitted = true;

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();

      this.isSubmitted = false;

      return;
    }

    const { username, password } = this.formGroup.getRawValue();

    if (username !== 'EmpowerHR' || password !== 'EmpowerHR') {
      this._toastrService.error(
        'Invalid username or password. Please try again.',
        'Login Failed'
      );

      this.isSubmitted = false;

      return;
    }

    this._localStorageService.set('u', {
      access_token: Math.random().toString(36).slice(2),
    });

    this._router.navigateByUrl('/');
  }

  public ngOnInit(): void {
    this._setupForm();
  }
}
