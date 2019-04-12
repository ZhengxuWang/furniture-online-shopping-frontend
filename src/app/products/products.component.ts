import { Component, OnInit } from '@angular/core';
import {Product} from '../shared/models/product';
import {ProductsService} from '../shared/services/products.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  colors = {
    Grey: 2,
    White: 1,
    Black: 3,
    Blue: 4,
    Red: 5,
    Yellow: 6,
    Orange: 7,
    Brown: 8
  };
  categories = {
    Chairs: 1,
    Beds: 2,
    Accessories: 3,
    Furniture: 4,
    HomeDeco: 5,
    Dressings: 6,
    Tables: 7
  };
  categoryss = {
    1: 'Chairs',
    2: 'Beds',
    3: 'Accessories',
    4: 'Furniture',
    5: 'HomeDeco',
    6: 'Dressings',
    7: 'Tables'
  };
  min: number;
  max: number;
  category: string;
  color: string;
  stock: boolean;
  constructor(private ar: ActivatedRoute,
              private ps: ProductsService) { }

  ngOnInit() {
    this.ps.getProducts().subscribe((res) => {
      this.products = res;
      // console.log(this.ar.snapshot.params.category);
      if (this.ar.snapshot.params.category !== undefined) {
        // console.log('success');
        this.ar.paramMap.pipe(
          switchMap((paramMap: ParamMap) => {
            const category = paramMap.get('category');
            return category;
          })
        ).subscribe((cid) => {
          this.ps.filterByCategory(+cid).subscribe((rest) => {
            this.category = this.categoryss[+cid];
            this.products = rest;
          });
        });
      }
    });
  }
  onFilterSubmit(value) {
    this.color = value.color;
    this.ps.filterByColor(this.colors[value.color]).subscribe((res) => {
      this.products = res;
    });
  }
  onFilterCategorySubmit(value) {
    this.category = value.category;
    this.ps.filterByCategory(this.categories[value.category]).subscribe((res) => {
      this.products = res;
    });
  }
  onFilterStockSubmit(value) {
    this.stock = value.stock;
    if (this.stock) {
      this.ps.filterInStock().subscribe((res) => {
        this.products = res;
      });
    }
  }
  clearFilters() {
    this.ps.getProducts().subscribe((res) => {
      this.products = res;
    });
    this.min = null;
    this.max = null;
    this.category = null;
    this.color = null;
    this.stock = null;
  }
  onStockSubmit() {
    this.ps.updateStock().subscribe((res) => {
      console.log(res);
      if (res.success) {
        this.ps.getProducts().subscribe( (products) => {
          console.log(products);
          this.products = products;
        });
      }
    });
  }
}
