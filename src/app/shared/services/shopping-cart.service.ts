import { Injectable } from '@angular/core';
import {Item} from '../models/item';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  items: Item[] = [];
  itemCount = 0;

  constructor() {
    this.items = JSON.parse(localStorage.getItem('items')) || [];
    this.setItemCount();
  }

  setCart(item: Item) {
    const index = this.findInCart(item);
    this.items[index].qty = item.qty;
    this.updateCache();
  }

  addToCart(item: Item) {
    const index = this.findInCart(item);
    if (index !== -1) {
      this.items[index].qty++;
    } else {
      this.items.push(item);
    }
    this.updateCache();
  }

  removeFromCart(item: Item) {
    const index = this.findInCart(item);
    this.items.splice(index, 1);
    this.updateCache();
  }

  findInCart(item: Item): number {
    return this.items.findIndex(i => i.product.id === item.product.id);
  }

  updateCache() {
    localStorage.setItem('items', JSON.stringify(this.items));
    this.setItemCount();
  }

  setItemCount() {
    this.itemCount = this.items.length ? this.items.map(item => item.qty).reduce((a, b) => a + b) : 0;
  }

  clearCart() {
    this.items = [];
    this.updateCache();
  }

}
