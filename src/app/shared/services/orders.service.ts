import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/index';
import {Order} from '../models/order';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient
  ) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.API_URL}/orders`, {withCredentials: true});
  }

  addOrder(order: Order): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${environment.API_URL}/orders`, order, {withCredentials: true});
  }

}
