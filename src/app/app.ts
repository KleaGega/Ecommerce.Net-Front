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
    <main class = " my-4">
      <router-outlet></router-outlet>
    </main>
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
    console.log('🔍 Current URL:', currentUrl);

    const hiddenRoutes = ['/login', '/register'];

    this.showHeaderFooter = !hiddenRoutes.some(route => currentUrl.startsWith(route));
    console.log('👀 Show header/footer:', this.showHeaderFooter);
  });

  }
}
