import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  editUser(user: User) {
    return this.httpApi.patch('https://reqres.in/api/users', JSON.stringify(user)).pipe(
      map((response: User) => response)
    );
  }
  deleteUser(id: number):Observable<any> {
    return this.httpApi.delete('https://reqres.in/api/users/2').pipe((response:any) => response);
  }
  postAddUser(user: User) {
    return this.httpApi.post('https://reqres.in/api/users', JSON.stringify(user)).pipe(
      map((response: User) => response)
    );
  }

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

    register(email: string, password: string): Observable<boolean> {
        return this.httpApi.post('https://reqres.in/api/register', {
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
