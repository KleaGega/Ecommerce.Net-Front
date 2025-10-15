import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink,RouterModule } from '@angular/router';
import { Product } from '../../models/product.models';
import { Auth } from '../services/auth';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule,CommonModule,RouterLink,RouterModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: Product[]=[];
   constructor(
    private router: Router,
    private productService:ProductService,
    public authService: Auth
  ) {
    
  }
  ngOnInit(): void {
   this.productService.getAllProducts().subscribe({
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
