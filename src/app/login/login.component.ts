import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../shared/dashboard.service';
import { login } from '../shared/manager.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private service = inject(DashboardService);

  form = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
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

  ngOnInit() {
    const subscription = this.form.valueChanges.subscribe(value => {
      window.localStorage.setItem('saved-login-form', JSON.stringify({ password: value.password }));
    });
  }onSubmit() {
    if (this.form.valid) {
      const formValue: login = {
        username: this.form.value.username || '', 
        password: this.form.value.password || '', 
      };
  
      this.service.postUserInfo(formValue).subscribe({
        next: (res: login[]) => {
          this.service.loginData = res;
          console.log('Login successful:', res);
          this.router.navigate(['/app-manager']);
        },
        error: (err: any) => {
          console.error('Login failed:', err);
          this.router.navigate(['/app-manager']);

        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
    }
