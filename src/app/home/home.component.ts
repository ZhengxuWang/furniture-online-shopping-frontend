import { Component, OnInit } from '@angular/core';
import {Product} from '../shared/models/product';
import {ProductsService} from '../shared/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[];
  sales = [];
  chair = 1;
  bed = 2;
  accessory = 3;
  furniture = 4;
  homedeco = 5;
  dressing = 6;
  table = 7;
  topstars = [];
  constructor(private ps: ProductsService) { }

  ngOnInit() {
    this.ps.getProducts().subscribe((res) => {
      this.products = res;
      this.sales = this.products.filter((p) => {
        return p.discount < 1;
      });
    });

    this.ps.getProducts().subscribe((res) => {
      this.products = res;
      this.topstars = this.products.filter((p) => {
        return p.star > 4;
      });
    });
  }

}
