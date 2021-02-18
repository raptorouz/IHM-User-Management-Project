import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public httpApi: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
      return this.httpApi.post('https://reqres.in/api/login', {
        email,
        password
      }).pipe(
        tap((response: any) => localStorage.setItem('token', response?.token)),
        map((response: any) => !!response?.token),
        catchError(() => of(false))
      );
    }
    
    getUserList() {
      return this.httpApi.get('https://reqres.in/api/users?page=1').pipe(
        map((response: any) => response?.data)
      );
    }

    getUserDetail(id: number): Observable<any> {
      return this.httpApi.get(`https://reqres.in/api/users/${id}`).pipe(
        map((response: any) => response?.data)
      );
    }


}
