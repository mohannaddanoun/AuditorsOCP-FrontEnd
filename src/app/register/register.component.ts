import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../shared/dashboard.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private router = inject(Router);
  private service = inject(DashboardService);

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  get userIsInvalid() {
    return this.form.controls.username.touched &&
      this.form.controls.username.dirty &&
      this.form.controls.username.invalid;
  }

  get passwordIsInvalid() {
    return this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid;
  }

  get passwordMismatch() {
    return this.form.controls.password.value !== this.form.controls.confirmPassword.value &&
      this.form.controls.confirmPassword.touched;
  }

  ngOnInit() {}

  onSubmit() {
    if (this.passwordMismatch) {
      return;
    }

    const formValue = {
      username: this.form.value.username || '',
      password: this.form.value.password || '',
    };

    this.service.registerUser(formValue).subscribe({
      next: (res) => {
        console.log('Registration successful:', res);
        alert('User registered successfully.');
        this.router.navigate(['/app-login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
      },
    });
  }
}
