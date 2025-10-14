
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule,RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css'
})

export class VerifyEmail {
 verifyEmailForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: Auth, private router: Router) {
    this.verifyEmailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    }, );
  }
  submit() {
    if (this.verifyEmailForm.valid) {
      const {email} = this.verifyEmailForm.value;
      this.authService.verifyEmail(email).subscribe({
        next: () => this.router.navigate(['/change-password'],  { queryParams: { email } }),
        error: err => alert(err.error?.message || 'Registration failed')
      });
    }
  }
}

