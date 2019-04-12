import { Component, OnInit } from '@angular/core';
import {OrdersService} from '../shared/services/orders.service';
import {Order} from '../shared/models/order';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {GetOrders} from '../shared/actions/orders.action';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  orders$: Observable<Order[]>;
  // Doughnut
  category: number[] = [0,0,0,0,0,0,0];

  public doughnutChartLabels: string[] = [
    'Chairs',
    'Beds',
    'Accessories',
    'Furniture',
    'HomeDeco',
    'Dressings',
    'Tables'
  ];
  public doughnutChartData: number[] = this.category;
  public doughnutChartType: string;
  constructor(
    private ordersService: OrdersService,
    private store: Store<{orders: Order[]}>
  ) {
    this.orders$ = store.pipe(
      select('orders')
    );
  }

  ngOnInit() {
    // this.ordersService.getOrders().subscribe(orders => {
    //   this.orders = orders;
    // });
    this.orders$.subscribe(orders => {
      console.log(orders);
      const n = orders.map(order => {
        return order.purchases.filter((purchase) => {
          return purchase.product.category.type === 'Chairs';
        }).map(purchase => {
          return purchase.qty;
        });
      });
      let sum = 0;
      n.forEach(arr => {
        if (arr[0] !== undefined) {
          sum += arr[0];
        }
      });
      this.category[0] = sum;
    });
    this.orders$.subscribe(orders => {
      const n = orders.map(order => {
        return order.purchases.filter((purchase) => {
          return purchase.product.category.type === 'Beds';
        }).map(purchase => {
          return purchase.qty;
        });
      });
      let sum = 0;
      n.forEach(arr => {
        if (arr[0] !== undefined) {
          sum += arr[0];
        }
      });
      this.category[1] = sum;
    });
    this.orders$.subscribe(orders => {
      const n = orders.map(order => {
        return order.purchases.filter((purchase) => {
          return purchase.product.category.type === 'Accessories';
        }).map(purchase => {
          return purchase.qty;
        });
      });
      let sum = 0;
      n.forEach(arr => {
        if (arr[0] !== undefined) {
          sum += arr[0];
        }
      });
      this.category[2] = sum;
    });
    this.orders$.subscribe(orders => {
      const n = orders.map(order => {
        return order.purchases.filter((purchase) => {
          return purchase.product.category.type === 'Furniture';
        }).map(purchase => {
          return purchase.qty;
        });
      });
      let sum = 0;
      n.forEach(arr => {
        if (arr[0] !== undefined) {
          sum += arr[0];
        }
      });
      this.category[3] = sum;
    });
    this.orders$.subscribe(orders => {
      const n = orders.map(order => {
        return order.purchases.filter((purchase) => {
          return purchase.product.category.type === 'HomeDeco';
        }).map(purchase => {
          return purchase.qty;
        });
      });
      let sum = 0;
      n.forEach(arr => {
        if (arr[0] !== undefined) {
          sum += arr[0];
        }
      });
      this.category[4] = sum;
    });
    this.orders$.subscribe(orders => {
      const n = orders.map(order => {
        return order.purchases.filter((purchase) => {
          return purchase.product.category.type === 'Dressings';
        }).map(purchase => {
          return purchase.qty;
        });
      });
      let sum = 0;
      n.forEach(arr => {
        if (arr[0] !== undefined) {
          sum += arr[0];
        }
      });
      this.category[5] = sum;
    });
    this.orders$.subscribe(orders => {
      const n = orders.map(order => {
        return order.purchases.filter((purchase) => {
          return purchase.product.category.type === 'Tables';
        }).map(purchase => {
          return purchase.qty;
        });
      });
      let sum = 0;
      n.forEach(arr => {
        if (arr[0] !== undefined) {
          sum += arr[0];
        }
      });
      this.category[6] = sum;
    });
    this.doughnutChartType = 'doughnut';
    this.store.dispatch(new GetOrders());
    console.log(this.category);
  }
  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
}
