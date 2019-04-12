import * as OrdersAction from '../actions/orders.action';

export const initialState = [];

export function ordersReducer(state = initialState, action: OrdersAction.ActionsUnion) {
  switch (action.type) {
    case OrdersAction.ActionTypes.AddOrderSuccess:
      return [...state, action.payload];
    case OrdersAction.ActionTypes.GetOrdersSuccess:
      return action.payload;
    case OrdersAction.ActionTypes.AddOrderFail:
    case OrdersAction.ActionTypes.GetOrdersFail:
    default:
      return state;
  }
}
