import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule,RouterLink,Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule,CommonModule,RouterLink,RouterModule],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  products: any[]=[];
   constructor(
    private router: Router,
    private homeService:HomeService
  ) {
    
  }
  ngOnInit(): void {
   this.homeService.getProducts().subscribe({
      next: (products) => (this.products = products),
      error: (err) => console.error('Error fetching products:', err)
    });
  }
  getImageUrl(imagePath:string): string{
    if(!imagePath) return 'assets/images/logo.jpg';
    if(imagePath.startsWith('http')) return imagePath;
    return  `http://localhost:5245${imagePath}`;
  }
}
