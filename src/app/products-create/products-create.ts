import { Component } from '@angular/core';
import { ProductService } from '../services/product';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product.models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.html',
  styleUrls: ['./products-create.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
 
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
  imagePreview: string = '';

  constructor(
    private router: Router,
    private productService: ProductService,
    private toastr: ToastrService,
  ) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;
    this.selectedFile = file;
    this.imagePreview = URL.createObjectURL(file);
  }

  onSubmit(): void {
    this.productService.createProduct(this.product, this.selectedFile).subscribe({
      next: (data) => {
        console.log('Product created:', data);
        this.toastr.success('Product created successfully!', 'Success');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error creating product:', err);
        this.toastr.error('Failed to create product.', 'Error');
      }
    });
  }

}
