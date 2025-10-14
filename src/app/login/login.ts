import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { RouterLink,RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,RouterLink,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: Auth, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });
  }

  post() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.authService.login(data).subscribe({
        next: () => this.router.navigate(['/']),
        error: err => alert(err.error?.message || 'Login failed')
      });
    }
  }
}
