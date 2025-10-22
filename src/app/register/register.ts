import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'], 
})
export class Register {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      phoneNumber2: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

    passwordMatchValidator(form: FormGroup) {
        return form.get('password')!.value === form.get('confirmPassword')!.value ? null : { mismatch: true };
    }

    submit() {
        if (this.registerForm.valid) {
            const data = this.registerForm.value;
            this.authService.register(data).subscribe({
                next: () => {
                    this.toastr.success('Registered successfully!', 'Success'); 
                    this.router.navigate(['/login']);
                },
                    error: err => {
                    this.toastr.error(err.error?.message || 'Register failed', 'Error'); 
                }
            });
        } else {
            this.toastr.warning('Please fill all fields correctly', 'Warning');
        }
    }
}
