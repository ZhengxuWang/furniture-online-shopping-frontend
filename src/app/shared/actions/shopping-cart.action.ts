import {Action} from '@ngrx/store';
import {Item} from '../models/item';

export enum ActionTypes {
  AddItem = '[Shopping Cart] AddItem',
  SetItem = '[Shopping Cart] SetItem',
  RemoveItem = '[Shopping Cart] RemoveItem',
  ClearItems = '[Shopping Car] ClearItems',
}

export class AddItem implements Action {
  readonly type = ActionTypes.AddItem;
  constructor(public payload: Item) {}
}

export class SetItem implements Action {
  readonly type = ActionTypes.SetItem;
  constructor(public payload: Item) {}
}

export class RemoveItem implements Action {
  readonly type = ActionTypes.RemoveItem;
  constructor(public payload: Item) {}
}

export class ClearItems implements Action {
  readonly type = ActionTypes.ClearItems;
}

export type ActionsUnion = AddItem | SetItem | RemoveItem | ClearItems;
