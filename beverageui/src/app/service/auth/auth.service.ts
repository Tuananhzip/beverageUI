import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private api: ApiService,private router: Router, private toast: ToastService) { }

  adminLogin(email: string, password: string): Observable<any>{
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return this.http.post<any>(this.api.getAuthUrl('admin-login'), formData);
  }

  login(email: string, password: string): Observable<any>{
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return this.http.post<any>(this.api.getAuthUrl('login'), formData);
  }

  signUp(loginVM: any): Observable<any>{
    const formData = new FormData();
    formData.append('email', loginVM.email);
    formData.append('password', loginVM.password);
    formData.append('confirmPassword', loginVM.passwordConfirm);
    formData.append('lastName', loginVM.lastName);
    formData.append('firstName', loginVM.firstName);
    return this.http.post<any>(this.api.getAuthUrl('register'), formData);
  }

  refreshToken(): Observable<any>{
    const refreshToken = this.getRefreshToken();
    if(!refreshToken){
      throw new Error('No refresh token found');
    }
    return this.http.post<any>(this.api.getAuthUrl('refresh-token'), JSON.stringify(refreshToken), {headers: { 'Content-Type': 'text/plan' }}).pipe(
      tap(res =>{
        this.setSession(res.token, res.refreshToken);
      })
    );
  }

  isLoggedIn(): boolean{
    return !!this.getToken();
  }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    this.router.navigateByUrl('/user/home').then(()=>{
      window.location.reload();
    });
  }

  setSession(token: string, refreshToken: string, userId?: string){
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    if(userId){
      localStorage.setItem('userId', userId);
    }
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null{
    return localStorage.getItem('refreshToken');
  }

    getUserId(): string | null{
    return localStorage.getItem('userId');
  }

  getInfoUser(userId: string): any{
    return this.http.get<any>(this.api.getCustomersUrl(userId )).subscribe((res)=>{
      return res;
    });
  }
}