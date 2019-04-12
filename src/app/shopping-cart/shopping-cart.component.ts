import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../shared/services/shopping-cart.service';
import {Item} from '../shared/models/item';
import {Product} from '../shared/models/product';
import {OrdersService} from '../shared/services/orders.service';
import {Order} from '../shared/models/order';
import {select, Store} from '@ngrx/store';
import {RemoveItem, SetItem} from '../shared/actions/shopping-cart.action';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AddOrder} from '../shared/actions/orders.action';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  items: Item[];

  qtyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  items$: Observable<Item[]>;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private ordersService: OrdersService,
    private store: Store<{items: Item[]}>,
    public snackBar: MatSnackBar
  ) {
    this.items$ = store.pipe(
      select('items'),
      map((items: Item[]) => this.items = items)
    );
  }

  ngOnInit() {
    // this.items = this.shoppingCartService.items;
  }

  setCart(qty: number, product: Product) {
    // this.shoppingCartService.setCart({
    //   qty,
    //   product
    // });
    this.store.dispatch(new SetItem({
      qty,
      product
    }));
  }

  checkout() {
    if (!this.items.length) return; // TODO: better UX.
    const order: Order = {
      purchase_date: JSON.stringify(new Date()).substring(1, 11),
      purchases: this.items
    };
    // this.ordersService.addOrder(order)
    //   .subscribe(res => {
    //     this.items = [];
    //     this.shoppingCartService.clearCart();
    //   });
    this.store.dispatch(new AddOrder(order));
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    this.snackBar.open('Place Order Success', undefined, config);
  }

  removeFromCart(item) {
    // this.shoppingCartService.removeFromCart(item);
    this.store.dispatch(new RemoveItem(item));
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    this.snackBar.open('Remove Cart Success', undefined, config);
  }

}
