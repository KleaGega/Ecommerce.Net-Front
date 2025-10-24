import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,  } from 'rxjs';
import { Order } from '../../models/order.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  userId: string = '';
  order: Order[] = [];
  private apiUrl = 'http://localhost:5245/api/Order';

  constructor(private http: HttpClient) {
    this.userId = localStorage.getItem('loggedUserId') ?? '';
  }

  createOrder(userId: string): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}`,{ userId });
  }

  getAllOrders() : Observable<Order [] >{
    const token = localStorage.getItem('access_token');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    return this.http.get<Order[]>(`${this.apiUrl}`,{ headers });
  }
}
