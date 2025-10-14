import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'http://localhost:5245/api/Product';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Products`);
  }
  
}
