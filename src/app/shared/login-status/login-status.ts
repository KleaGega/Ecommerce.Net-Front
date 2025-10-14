import { Component } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login-status',
  template: `
    <ul class="navbar-nav ms-auto">
      <li class="nav-item" *ngIf="auth.isLoggedIn$; else loggedOut">
        <a class="nav-link text-dark" (click)="logout()">Logout</a>
      </li>
      <ng-template #loggedOut>
        <li class="nav-item">
          <a class="nav-link text-dark" routerLink="/login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-dark" routerLink="/register">Register</a>
        </li>
      </ng-template>
    </ul>
  `
})
export class LoginStatusComponent {
  constructor(public auth: Auth) {}

  logout() {
    this.auth.logout();
  }
}
