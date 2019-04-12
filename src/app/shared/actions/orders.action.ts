import {Action} from '@ngrx/store';
import {Order} from '../models/order';

export enum ActionTypes {
  AddOrder = '[Orders] AddOrder',
  AddOrderSuccess = '[Orders] AddOrder Success',
  AddOrderFail = '[Orders] AddOrder Fail',
  GetOrders = '[Orders] GetOrders',
  GetOrdersSuccess = '[Orders] GetOrders Success',
  GetOrdersFail = '[Orders] GetOrders Fail',
}

export class AddOrder implements Action {
  readonly type = ActionTypes.AddOrder;
  constructor(public payload: Order) {}
}

export class AddOrderSuccess implements Action {
  readonly type = ActionTypes.AddOrderSuccess;
  constructor(public payload: Order) {}
}

export class AddOrderFail implements Action {
  readonly type = ActionTypes.AddOrderFail;
}

export class GetOrders implements Action {
  readonly type = ActionTypes.GetOrders;
  constructor() {}
}

export class GetOrdersSuccess implements Action {
  readonly type = ActionTypes.GetOrdersSuccess;
  constructor(public payload: Order[]) {}
}

export class GetOrdersFail implements Action {
  readonly type = ActionTypes.GetOrdersFail;
}

export type ActionsUnion = AddOrder | AddOrderSuccess | AddOrderFail | GetOrders | GetOrdersSuccess | GetOrdersFail;
