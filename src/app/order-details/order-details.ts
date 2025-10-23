import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { User } from '../../models/user.model';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-order-details',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css'
})
export class OrderDetails implements OnInit {

  order : Order ={
    id: 0,
    userId: '',
    orderDate: '',
    totalAmount:0,
    status: '',
    items: [],
  }
  user!:User;
  userId: string ='';
  constructor( private orderService: OrderService,
    private authService:Auth
  ){

}
ngOnInit(): void {
  // const sampleOrder: Order = {
  //   id: 0,
  //   userId: '123',          
  //   orderDate: '',          
  //   totalAmount: 0,        
  //   status: '',
  //   items: [
    
  //   ]
  // };

this.orderService.createOrder(this.orderService.userId).subscribe({
  next: (data) => {
    this.order = data;
    console.log("Order data is", this.order);
  },
  error: (err) => {
    console.error("Error creating order", err);
  }
});
this.userId = localStorage.getItem('loggedUserId') ?? '';
        if (this.userId) {
            this.authService.getUserInfo(this.userId).subscribe({
                next: (user) => { 
                    this.user = user;
                },
                error: (err) => {
                    console.error('Failed to get user information', err);
                }
            });
            } else {
            console.warn('No loggedUserId found in localStorage');
        }



}
	getImageUrl(imagePath:string): string{
		if(!imagePath) return 'assets/images/logo.jpg';
		if(imagePath.startsWith('http')) return imagePath;
		return  `http://localhost:5245${imagePath}`;
	}
}
