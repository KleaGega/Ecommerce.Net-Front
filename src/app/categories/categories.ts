import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CategoryService } from '../services/category';
import { Category } from '../../models/product.models';
import { Auth } from '../services/auth';
import { WhoAmIResponse } from '../../models/account.models';

@Component({
  selector: 'app-categories',
  imports: [CommonModule,RouterModule,RouterLink],
  standalone: true,
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit {
  categories: Category[]=[];
  role!: string;


  constructor( 
    private categoryService : CategoryService,
    private route:ActivatedRoute,
    private authService : Auth
  ){

  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) =>{
        this.categories = data;
        console.log("Categories are " , this.categories)
      }
    })

    this.authService.userRole().subscribe({
      next: (data) =>{
        this.role = data.roles[0];
      }

    })
  }

}
