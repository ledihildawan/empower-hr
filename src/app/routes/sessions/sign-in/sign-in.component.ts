import { CommonModule } from '@angular/common';

import { OnInit, Component } from '@angular/core';

import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
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

  constructor(private readonly _formBuilder: FormBuilder) {}

  private _setupForm(): void {
    this.formGroup = this._formBuilder.group({
      username: ['EmpowerHR', Validators.required],
      password: ['EmpowerHR', Validators.required],
    });
  }

  public handleSignIn(): void {
    this.isSubmitted = true;
  }

  public ngOnInit(): void {
    this._setupForm();
  }
}
