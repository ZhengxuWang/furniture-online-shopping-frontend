import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserDetail} from '../models/user-detail';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../models/user';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL}/users`);
  }
  public addUser(user: User): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${environment.API_URL}/users`, user, {withCredentials: true});
  }
  public changeUserPassword(user: User): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${environment.API_URL}/users`, user, {withCredentials: true});
  }
  public deleteUser(id: number): Observable<{success: boolean}> {
    return this.http.delete<{success: boolean}>(`${environment.API_URL}/users/${id}`, {withCredentials: true});
  }
}
