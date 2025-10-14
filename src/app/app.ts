// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, ReactiveFormsModule,],
  template: `
    <app-header></app-header>
    <main class="container my-4">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `
})
export class AppComponent {}
