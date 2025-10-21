import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { WhoAmIResponse } from '../../models/account.models';
import { User } from '../../models/user.model';
@Injectable({ providedIn: 'root' })
export class Auth {
  private apiUrl = 'http://localhost:5245/api/Account';

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }

  login(data: any): Observable<any> {
    const Date_now = Date.now();
    return this.http.post(`${this.apiUrl}/Login`, data).pipe(
      tap((res: any) => {
        this.loggedIn.next(true);
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('loggedUserId',res.userId);
        localStorage.setItem('refresh_token',res.refreshToken);
        localStorage.setItem('expires_at',(Date_now+res.expiresIn*1000).toString());
      })
    );
  }

  logout() {
    this.http.post(`${this.apiUrl}/Logout`, {}).subscribe(() => {
      this.loggedIn.next(false); 
      localStorage.removeItem('access_token');
       localStorage.removeItem('loggedUserId');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('expires_at');
      this.router.navigate(['/login']);
    });
  }
  
  checkToken(): void {
  const token = localStorage.getItem('access_token');
  const expiresAt = localStorage.getItem('expires_at');

  if (token && expiresAt && Date.now() < parseInt(expiresAt)) {
    this.loggedIn.next(true);
  } else {
    this.loggedIn.next(false);
    this.logout();
  }
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

  userRole(): Observable<WhoAmIResponse>{
      const token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`
      };

    return this.http.get<WhoAmIResponse>(`${this.apiUrl}/WhoAmI`,{headers})
  }

  getUserInfo(userId:string):Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/userInfoById/${userId}`,)
  }
}
