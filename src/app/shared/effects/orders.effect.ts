import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {OrdersService} from '../services/orders.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as OrdersAction from '../actions/orders.action';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {ClearItems} from '../actions/shopping-cart.action';

@Injectable()
export class OrdersEffect {

  @Effect()
  addOrder$: Observable<Action> = this.actions$.pipe(
    ofType(OrdersAction.ActionTypes.AddOrder),
    mergeMap((action: OrdersAction.AddOrder) => {
      return this.ordersService.addOrder(action.payload).pipe(
        map(res => {
          if (res.success) {
            return new OrdersAction.AddOrderSuccess(action.payload);
          } else {
            return new OrdersAction.AddOrderFail();
          }
        }),
        catchError(() => of(new OrdersAction.AddOrderFail())),
      );
    }),
  );

  @Effect()
  addOrderSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(OrdersAction.ActionTypes.AddOrderSuccess),
    map((action: OrdersAction.AddOrderSuccess) => {
      return new ClearItems();
    })
  );

  @Effect()
  getOrders$: Observable<Action> = this.actions$.pipe(
    ofType(OrdersAction.ActionTypes.GetOrders),
    mergeMap((action: OrdersAction.GetOrders) => {
      return this.ordersService.getOrders().pipe(
        map(res => new OrdersAction.GetOrdersSuccess(res)),
        catchError(() => of(new OrdersAction.GetOrdersFail()))
      );
    })
  );

  constructor(
    private ordersService: OrdersService,
    private actions$: Actions
  ) { }
}
