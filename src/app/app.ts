import { Component } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Auth } from './services/auth';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, ReactiveFormsModule, FormsModule,CommonModule],
  template: `
    <app-header *ngIf="showHeaderFooter"></app-header>
      <router-outlet></router-outlet>
    <app-footer *ngIf="showHeaderFooter"></app-footer>
  `
})
export class AppComponent {
  showHeaderFooter = true;

  constructor(private auth: Auth, private router: Router) {
    this.auth.checkToken();
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      const currentUrl = event.urlAfterRedirects;
      const hiddenRoutes = ['/login', '/register','/verify-email','/change-password'];
      this.showHeaderFooter = !hiddenRoutes.some(route => currentUrl.startsWith(route));
    });

  }
}
