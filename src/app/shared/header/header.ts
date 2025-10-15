import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Auth } from '../../services/auth';
import { RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  standalone: true,
  imports: [NgIf,RouterLink,RouterModule,CommonModule],
  styleUrl:'./header.css',  
})
export class Header {
  constructor(public authService: Auth) {}

  logout() {
    this.authService.logout();
  }
}
