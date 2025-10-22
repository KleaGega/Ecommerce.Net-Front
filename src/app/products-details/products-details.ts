import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink,RouterModule } from '@angular/router';
import { Product } from '../../models/product.models';
import { Auth } from '../services/auth';
@Component({
  selector: 'app-products-details',
  imports: [ReactiveFormsModule,CommonModule,RouterLink,RouterModule],
  standalone:true,
  templateUrl: './products-details.html',
  styleUrl: './products-details.css'
})
export class ProductsDetails implements OnInit {
    
    products: Product[]=[];
    product!: Product;
    role!: string;
    constructor(
        private route: ActivatedRoute,
        private productService:ProductService,
        private authService:Auth
    ) {}
    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.productService.getAllProducts().subscribe({
            next: (products) => (this.products = products),
            error: (err) => console.error('Error fetching products:', err)
        });

        this.productService.getProductDetails(id).subscribe({
            next:(data)=>(this.product=data),
            error: (err) => console.error('Error fetching products:', err)
        })

        this.getUserRole()
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
}
