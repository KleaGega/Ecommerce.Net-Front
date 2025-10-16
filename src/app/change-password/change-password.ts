import { Component, OnInit } from '@angular/core';
import { Auth } from '../services/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.css'], 
})
export class ChangePassword implements OnInit {
  changePasswordForm: FormGroup;
  email: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService 
  ) {
    this.changePasswordForm = this.fb.group({
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
    this.changePasswordForm.patchValue({ email: this.email });
  }

  submit() {
    if (this.changePasswordForm.valid) {
      const data = this.changePasswordForm.getRawValue();
      this.authService.changePassword(data.email, data.newPassword, data.confirmNewPassword).subscribe({
        next: () => {
          this.toastr.success('Password changed successfully!', 'Success'); 
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.toastr.error(err.error?.message || 'Something went wrong!', 'Error'); 
        }
      });
    } else {
      this.toastr.warning('Please fill in all required fields correctly', 'Warning'); 
    }
  }
}
