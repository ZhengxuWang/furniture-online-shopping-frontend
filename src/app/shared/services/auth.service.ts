import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_API_URL = `${environment.API_URL}`;
  user: User = null;
  userSubject: Subject<User> = new BehaviorSubject<User>(null);
  adminSubject: Subject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient
  ) {
    this.checkLogin();
    this.checkAdmin();
  }

  checkLogin() {
    this.http.get(`${this.AUTH_API_URL}/checklogin`, {withCredentials: true})
      .subscribe((res: {success: boolean, user: User}) => {
        if (res.success) {
          this.userSubject.next(res.user);
        }
      });
  }
  checkAdmin() {
    this.http.get(`${this.AUTH_API_URL}/checkadmin`, {withCredentials: true})
      .subscribe((res: {success: boolean, user: User}) => {
        if (res.success) {
          this.adminSubject.next(true);
        }
      });
  }
  checkAuthority() {
    if (!this.user) {
      return;
    }
    this.user.profiles.forEach(profile => {
      console.log(profile);
      if (profile.id === 1) {
        console.log('admin');
        this.adminSubject.next(true);
      }
    });
    return;
  }
  login(user: User): Observable<{success: boolean, user: User}> {
    const httpParams: HttpParams = new HttpParams()
      .append('username', user.username)
      .append('password', user.password);
    return this.http.post<{success: boolean, user: User}>(`${this.AUTH_API_URL}/login`, httpParams, {withCredentials: true})
      .pipe(
        map((res: {success: boolean, user: User}) => {
          console.log(res);
          this.userSubject.next(res.user);
          this.user = res.user;
          this.checkAuthority();
          return res;
        })
      );
  }

  register(user: User): Observable<{success: boolean, user: User}> {
    return this.http.post<{success: boolean, user: User}>(`${this.AUTH_API_URL}/users`, user);
  }

  logout(): Observable<{success: boolean}> {
    this.user = null;
    this.adminSubject.next(false);
    return this.http.post<{success: boolean}>(`${this.AUTH_API_URL}/logout`, null, {withCredentials: true});
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(`${error.error}`);
  }
  setAdmin(userid: number): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${this.AUTH_API_URL}/users/${userid}`, userid);
  }
}
