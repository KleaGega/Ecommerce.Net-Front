import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Auth } from '../../services/auth';
import { RouterLink, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';
@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  standalone: true,
  imports: [NgIf,RouterLink,RouterModule,CommonModule],
  styleUrl:'./header.css',  
})
export class Header implements OnInit {
  userId : string = '';
  cartLength: number =0;

  constructor(
    public authService: Auth,
    private cartService: CartService

  ) {}
  ngOnInit(): void {
    this.userId = localStorage.getItem('loggedUserId') ?? '';
    this.cartService.getUserCartLength(this.userId).subscribe({
      next : (count) =>{
        this.cartLength = count;
      },error : (err) =>{
        console.log('Error count failed');
      }
    })
    
  }

  logout() {
    this.authService.logout();
  }

}
