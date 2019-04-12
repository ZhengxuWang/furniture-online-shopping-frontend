import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {environment} from '../../../environments/environment';
import {UserDetail} from '../models/user-detail';
import {Mail} from '../models/mail';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  constructor(
    private http: HttpClient
  ) { }

  public addUserDetail(userDetail: UserDetail): Observable<{success: boolean, userDetail: UserDetail}> {
    return this.http.post<{success: boolean, userDetail: UserDetail}>(`${environment.API_URL}/user-details`, userDetail, {withCredentials: true});
  }
  public updateUserDetail(userDetail: UserDetail): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${environment.API_URL}/user-details`, userDetail, {withCredentials: true});
  }
  public sendMail(mail: Mail): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${environment.API_URL}/mail`, mail, {withCredentials: true});
  }
}
