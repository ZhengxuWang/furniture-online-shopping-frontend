import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import {OrdersComponent} from '../../../orders/orders.component';
@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    Ng2Charts
  ]
})
export class ChartsModule { }
