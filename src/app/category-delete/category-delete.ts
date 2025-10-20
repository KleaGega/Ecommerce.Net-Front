import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/product.models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;
@Component({
  selector: 'app-category-delete',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './category-delete.html',
  styleUrl: './category-delete.css'
})
export class CategoryDelete  implements OnInit{
   category: Category = {
    id: 0,
    name: '',
    description: '',
  };
  modal:any
  constructor(
    private categoryService: CategoryService,
    private route : ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ){

  }
  ngOnInit(): void {
     const modalElement = document.getElementById('deleteModal')
    this.modal = new bootstrap.Modal(modalElement);
       const id = Number(this.route.snapshot.paramMap.get('id')) 
    if(id){
      this.loadCategoryDelete(id);
    }
    
  }
  
  loadCategoryDelete(id:number){
   this.categoryService.getCategoryByIdDelete(id).subscribe({
    next: (data) =>{
      this.category = data;
    }, error: (err) =>{
       console.error('Error loading category:', err);
    }
   })
  }
    openModalDelete(){
    this.modal.show()
  }
  closeModalDelete( ){
    this.modal.hide()
  }
  confirmDeleteCategory() {
    this.deleteCategory();
    this.modal.hide();
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.category.id).subscribe({
      next: (res) => {
        this.modal.hide();
        this.toastr.success('Category deleted successfully!', 'Success');
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        const message = err?.error?.message || 'Failed to delete category.';
        this.toastr.error(message, 'Error');
        console.error('Delete error:', err);
      }
    });
  }


}
