import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-add-employee',
  styleUrl: 'add.component.scss',
  standalone: true,
  templateUrl: 'add.component.html',
})
export class AddEmployeeComponent implements OnInit {
  router: Router = inject(Router);
  formBuilder = inject(FormBuilder);

  formGroup!: FormGroup;

  public ngOnInit(): void {}
}
