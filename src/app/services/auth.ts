import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Auth {
  private apiUrl = 'http://localhost:5245/api/Account';

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, data).pipe(
      tap((res: any) => {
        this.loggedIn.next(true);
      })
    );
  }

  logout() {
    this.http.post(`${this.apiUrl}/Logout`, {}).subscribe(() => {
      this.loggedIn.next(false); 
      this.router.navigate(['/login']);
    });
  }

  verifyEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verifyemail`, { email });
  }

  changePassword(email: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/changepassword`, { email, newPassword, confirmNewPassword: confirmPassword });
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/Register`, data);
  }
}
