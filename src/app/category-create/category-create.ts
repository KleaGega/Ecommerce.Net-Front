import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../services/category';
import { Category } from '../../models/product.models';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-category-create',
  imports: [CommonModule,RouterLink,FormsModule,RouterLink],
  templateUrl: './category-create.html',
  styleUrl: './category-create.css'
})
export class CategoryCreate {
  category: Category = {
    id: 0,
    name: '',
    description: '',
  };
  constructor(
    private categoryService : CategoryService,
    private router : Router,
  ){}
    
    onSubmit(): void {
        this.categoryService.createCategory(this.category).subscribe({
            next: (res) => {
                this.router.navigate(['/categories'])
                console.log('Response of category is', res);
                console.log('Category created', res);
            },
            error: (err) => {
                console.error('Error creating category:', err);
            }
        });
    }
}
