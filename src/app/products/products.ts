import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink,RouterModule } from '@angular/router';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink,RouterModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: any[]=[];
   constructor(
    private router: Router,
    private homeService:ProductService
  ) {
    
  }
  ngOnInit(): void {
   this.homeService.getAllProducts().subscribe({
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
