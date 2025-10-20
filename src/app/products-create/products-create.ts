import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product';
import { Router, RouterLink } from '@angular/router';
import { Category, Product } from '../../models/product.models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';
import { Auth } from '../services/auth';
import { CategoryService } from '../services/category';
import { every } from 'rxjs';
@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.html',
  styleUrls: ['./products-create.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
 
})
export class ProductsCreate implements OnInit {

  product: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    categoryId: 0,
    status: '',
    imagePath: ''
  };

  selectedFile?: File;
  imagePreview: string = '';
  selectedCategoryId!: number;
  categories: Category[]=[];
  constructor(
    private router: Router,
    private productService: ProductService,
    private toastr: ToastrService,
    private authService: Auth,
    private categoryService: CategoryService,
  ) {}
ngOnInit(): void {
  this.categoryService.getAllCategories().subscribe({
    next: res => {
      this.categories = res;
      console.log('Fetched categories:', this.categories);
    },
    error: err => console.error('Error fetching categories', err)
  });
}


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;
    this.selectedFile = file;
    this.imagePreview = URL.createObjectURL(file);
  }

 onSubmit(): void {
    if (!this.selectedCategoryId) {
      this.toastr.error('Please select a category', 'Validation Error');
      return;
    }

    this.product.categoryId = this.selectedCategoryId;

    this.productService.createProduct(this.product, this.selectedFile).subscribe({
      next: data => {
        this.toastr.success('Product created successfully!', 'Success');
        this.router.navigate(['/products']);
      },
      error: err => {
        console.error('Error creating product:', err);
        this.toastr.error('Failed to create product.', 'Error');
      }
    });
  }


}
