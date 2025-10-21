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
import { CartService } from '../services/cart';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule,CommonModule,RouterLink,RouterModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: Product[]=[];
  role: string = ''; 
  userId : string = '';
   constructor(
    private router: Router,
    private productService:ProductService,
    public authService: Auth,
    private cartService: CartService,
    private toastr : ToastrService
  ) {
    
  }
  ngOnInit(): void {
   this.productService.getAllProducts().subscribe({
      next: (products) => (this.products = products),
      error: (err) => console.error('Error fetching products:', err)
    });
    this.userId = localStorage.getItem('loggedUserId') ?? '';
    console.log("User id is", this.userId);
    this.getUserRole();
  }
  getImageUrl(imagePath:string): string{
    if(!imagePath) return 'assets/images/logo.jpg';
    if(imagePath.startsWith('http')) return imagePath;
    return  `http://localhost:5245${imagePath}`;
  }

 getUserRole() {
    this.authService.userRole().subscribe({
      next: (data) => {
        console.log("User info:", data);
        console.log("Email:", data.userName);
        this.role = data.roles[0];
        console.log("Role:", this.role);
      },
      error: (err) => {
        console.error('Error fetching user role:', err);
      }
    });
  }

  addToCart(productId: number): void {
    this.cartService.addToCart( this.userId,productId,1).subscribe({
       next: () => {
         this.toastr.success('Product added to cart successfully!', 'Success');
       },
      error: (err) => {
        this.toastr.error('Failed to add product to cart.', 'Error');
      }
    });
  }

}
