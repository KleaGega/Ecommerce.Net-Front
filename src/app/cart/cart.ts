import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CartItem } from '../../models/cartItem.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,RouterModule,RouterLink,FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit{
  userId:string ='';
  cartItems: CartItem[] = [];
  constructor(
    private cartService : CartService,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loggedUserId') ?? '';

    this.cartService.getCart(this.userId).subscribe({
      next: (data) =>{
          this.cartItems = data;
          console.log("Cart Items are",this.cartItems);
      },error : (err)=>{
          console.log("Error loading");
      }
    })


    
  }
    getImageUrl(imagePath:string): string{
    if(!imagePath) return 'assets/images/logo.jpg';
    if(imagePath.startsWith('http')) return imagePath;
    return  `http://localhost:5245${imagePath}`;
  }
  calcPrice() {
    return this.cartItems.reduce((acc, prod) => acc+= prod.price * prod.quantity ,0)
  }

increaseQuantity(item: CartItem) {
  item.quantity++;
  this.cartService.updateQuantity(this.userId, item.productId, item.quantity).subscribe();
}

decreaseQuantity(item: CartItem) {
  if (item.quantity > 1) {
    item.quantity--;
    this.cartService.updateQuantity(this.userId, item.productId, item.quantity).subscribe();
  } else {
    this.cartService.removeFromCart(this.userId, item.productId).subscribe(() => {
      this.cartItems = this.cartItems.filter(i => i.productId !== item.productId);
    });
  }
}
  updateQuantity(item: CartItem) {
    if (item.quantity < 1) {
      this.removeItem(item);
      return;
    }
    this.cartService.updateQuantity(this.userId, item.productId, item.quantity).subscribe();
  }

  // Remove item completely
  removeItem(item: CartItem) {
    this.cartService.removeFromCart(this.userId, item.productId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(i => i.productId !== item.productId);
      },
      error: (err) => console.error('Failed to remove item', err)
    });
  }

  

}
