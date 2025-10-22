import { Component, OnInit } from '@angular/core';
import { Auth } from '../services/auth';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  imports: [FormsModule,CommonModule],
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  userId: string = '';
  user!: User;

  constructor(private authService: Auth) {}

    ngOnInit(): void {
        this.userId = localStorage.getItem('loggedUserId') ?? '';
        if (this.userId) {
            this.authService.getUserInfo(this.userId).subscribe({
                next: (user) => { 
                    this.user = user;
                },
                error: (err) => {
                    console.error('Failed to get user information', err);
                }
            });
            } else {
            console.warn('No loggedUserId found in localStorage');
        }
    }

    logout() {
        this.authService.logout();
    }
  
}
