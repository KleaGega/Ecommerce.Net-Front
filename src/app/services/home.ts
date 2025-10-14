import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,  } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private apiUrl = 'http://localhost:5245/api/Home';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Index`);
  }
}
