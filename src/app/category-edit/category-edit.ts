import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/product.models';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../services/category';
@Component({
  standalone: true,
  selector: 'app-products-edit',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './category-edit.html',
  styleUrls: ['./category-edit.css']
})
export class CategoryEdit implements OnInit {

    category: Category = {
      id:0,
      name: '',
      description: '',
      
    };

  constructor (
    private router: Router,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private toastr : ToastrService
  ){
    
  }
ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  if (id) {
    this.loadCategory(id);
  } else {
    console.warn('No category ID found in route');
  }
}
loadCategory(id: number): void {
  this.categoryService.getCategoryById(id).subscribe({
    next: (data) => {
      this.category = data; 
    },
    error: (err) => {
      console.error('Error loading category:', err);
    }
  });
}

  onSubmit(){
    this.categoryService.editCategory(this.category).subscribe({
      next:(data)=>{
         console.log('Product edited:', data);
        this.toastr.success('Product edited successfully!', 'Success');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error creating product:', err);
       this.toastr.error('Failed to edit product.', 'Error');
      } 
    })
  }
}
