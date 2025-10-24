import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { User } from '../../models/user.model';
import { RouterLink, RouterModule } from '@angular/router';
import { CartItem } from '../../models/cartItem.models';
@Component({
  selector: 'app-orders',
  imports: [CommonModule,FormsModule,RouterLink,RouterModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit   {
  cartItems: CartItem[] = [];
  orders:Order[]=[];
  user!:User;
  userId: string ='';
  role:string ='';
  constructor( private orderService: OrderService,
    private authService:Auth
  ){

}
ngOnInit(): void {
  this.getAllOrders()

}
  getAllOrders(){
    this.orderService.getAllOrders().subscribe({
      next:(data) =>{
        this.orders = data;

        console.log("Orders of user are", this.orders)
      }
    })

    
  }

	getImageUrl(imagePath:string): string{
		if(!imagePath) return 'assets/images/logo.jpg';
		if(imagePath.startsWith('http')) return imagePath;
		return  `http://localhost:5245${imagePath}`;
	}
}
