import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'] 
})
export class Login {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
    private toastr: ToastrService 
  ) {
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
            next: () => {
                this.toastr.success('Logged in successfully!', 'Success'); 
                this.getUserRole()
                this.router.navigate(['/']);
            },
                error: err => {
                this.toastr.error(err.error?.message || 'Login failed', 'Error'); 
            }
        });
        } else {
            this.toastr.warning('Please fill in valid email and password', 'Warning'); 
        }
    }

    getUserRole(){
        this.authService.userRole().subscribe({
            next: (data)=>{
                console.log("User info", data);
                console.log("Email:",data.userName);
                console.log("Role:",data.roles[0]);
            }
        })
    }
}
