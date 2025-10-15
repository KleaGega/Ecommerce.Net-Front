import { Component } from '@angular/core';
import { ProductService } from '../services/product';
import { Router } from '@angular/router';
import { Product } from '../../models/product.models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.html',
  styleUrls: ['./products-create.css'],
  imports:[CommonModule,FormsModule]
})
export class ProductsCreate {

  product: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    status: '',
    imagePath: ''
  };

  selectedFile?: File;

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  // Handle file selection
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Handle form submission
  onSubmit(): void {
    this.productService.createProduct(this.product, this.selectedFile).subscribe({
      next: (data) => {
        console.log('Product created:', data);
        alert('Product created successfully!');
        this.router.navigate(['/products']); // Redirect to product list or change route
      },
      error: (err) => {
        console.error('Error creating product:', err);
        alert('Failed to create product.');
      }
    });
  }
}
