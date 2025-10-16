import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../services/product';
import { Product } from '../../models/product.models';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;
@Component({
  selector: 'app-products-delete',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './products-delete.html',
  styleUrl: './products-delete.css'
})
export class ProductsDelete implements OnInit {
  modal:any
 product: Product = {
      id:0,
      name: '',
      price: 0,
      description: '',
      status: '',
      imagePath: ''
    };
  
      selectedFile?: File;
      imagePreview: string = '';
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ){

  }
  ngOnInit(): void {
    const modalElement = document.getElementById('exampleModal')
    this.modal = new bootstrap.Modal(modalElement);
    const id = Number(this.route.snapshot.paramMap.get('id')) 
    if(id){
      this.loadProduct(id);
    }
    
  }
      getImageUrl(imagePath:string): string{
    if(!imagePath) return 'assets/images/logo.jpg';
    if(imagePath.startsWith('http')) return imagePath;
    return  `http://localhost:5245${imagePath}`;
  }
  loadProduct(id:number):void{
    this.productService.getProductByIdDelete(id).subscribe({
      next:(data)=>{
        this.product = data;
      }, error:(err) =>{
        console.error('Error deleting product:', err);
        this.toastr.error('Failed to delete product.', 'Error');
      }
    })
  }

  openModal(){
    this.modal.show()
  }
  closeModal( ){
    this.modal.hide()
  }
  confirmDelete() {
    this.onSubmit();
    this.modal.hide();
  }


  onSubmit ():void{
    this.productService.deleteProduct(this.product.id).subscribe({
      next:()=>{
        this.toastr.success('Product deleted successfully!', 'Success');
        this.router.navigate(['/products'])

      }, error:(err) =>{
        console.error('Error deleting product:', err);
        this.toastr.error('Failed to delete product.', 'Error');
      }
    })
  }

}
