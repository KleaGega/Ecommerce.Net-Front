import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product';
import { Product } from '../../models/product.models';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-products-edit',
  imports:[CommonModule,FormsModule,RouterLink],
  templateUrl: './products-edit.html',
  styleUrl: './products-edit.css'
})
export class ProductsEdit implements OnInit {

    product: Product = {
      id:0,
      name: '',
      price: 0,
      description: '',
      categoryId: 0,
      status: '',
      imagePath: ''
    };
  
      selectedFile?: File;
      imagePreview: string = '';

  constructor (
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private toastr : ToastrService
  ){
    
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')) 
    if(id){
      this.loadProduct(id);
    }
    
  }
  loadProduct(id:number):void{
    this.productService.getProductById(id).subscribe({
      next:(data)=>{
        this.product=data;
        if(this.imagePreview){
          this.imagePreview= `http://localhost:5245`+ this.product.imagePath;
        }
      },
       error: (err) => {
        console.error('Error creating product:', err);
        this.toastr.error('Failed to edit product.', 'Error');
      } 

    })

  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;
    this.selectedFile = file;
    this.imagePreview = URL.createObjectURL(file);
  }

  onSubmit(){
    this.productService.editProduct(this.product, this.selectedFile).subscribe({
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
