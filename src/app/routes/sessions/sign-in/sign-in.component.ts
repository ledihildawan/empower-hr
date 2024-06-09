import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OnInit, Component } from '@angular/core';

import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule, CommonModule],
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
    private readonly _formBuilder: FormBuilder
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

    this._router.navigateByUrl('/');
  }

  public ngOnInit(): void {
    this._setupForm();
  }
}
