import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,  } from 'rxjs';
import { CartItem,UpdateQuantityRequest } from '../../models/cartItem.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5245/api/Cart';
  cartItems : CartItem[]=[];
  cartItem! : CartItem;
  constructor(private http: HttpClient) {}

  getCart(userId:string):Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/UserCart/${userId}`)
  }

  addToCart(userId:string,productId:number,quantity:number):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/${userId}` , {productId, quantity})
  }   

  deleteCartItem (cartItemId:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${cartItemId}`)
  }
  getUserCartLength(userId:string):Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/UserCartLength/${userId}`)
  }

  updateQuantity(userId: string, productId: number, quantity: number): Observable<any> {
    const body: UpdateQuantityRequest = { userId, productId, quantity };
    return this.http.put(`${this.apiUrl}/update-quantity`, body);
  }
  removeFromCart(userId: string, productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${userId}/${productId}`);
  }

  clearCart(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear/${userId}`);
  }
}
