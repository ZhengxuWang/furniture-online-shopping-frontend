import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../shared/services/products.service';
import {Product} from '../shared/models/product';
import {BehaviorSubject, Subject} from 'rxjs';
import {Color} from '../shared/models/color';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';


@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  colors = {
    Grey: false,
    White: false,
    Black: false,
    Blue: false,
    Red: false,
    Yellow: false,
    Orange: false,
    Brown: false
  }
  resColors: Color[] = [];
  product: Product = new Product();
  productSubject: Subject<Product> = new BehaviorSubject<Product>(null);
  constructor(private ps: ProductsService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  onsearchSubmit(value) {
    if (value.id !== '') {
      this.ps.getProduct(+value.id).subscribe(res => {
        this.product.id = res.id;
        this.product.name = res.name;
        this.product.category = res.category;
        this.product.colors = res.colors;
        res.colors.forEach(color => {
          this.colors[color.type] = true;
        });
        this.product.star = res.star;
        this.product.description = res.description;
        this.product.discount = res.discount;
        this.product.stock = res.stock;
        this.product.brand = res.brand;
        this.product.price = res.price;
        this.product.image = res.image;
        this.product.comments = res.comments;
        this.productSubject.next(this.product);
      });
    } else if (value.name !== '') {
      this.ps.getProductByName(value.name).subscribe(res => {
        this.product.id = res.id;
        this.product.name = res.name;
        this.product.category = res.category;
        this.product.colors = res.colors;
        res.colors.forEach(color => {
          this.colors[color.type] = true;
        });
        this.product.star = res.star;
        this.product.description = res.description;
        this.product.discount = res.discount;
        this.product.stock = res.stock;
        this.product.brand = res.brand;
        this.product.price = res.price;
        this.product.image = res.image;
        this.product.comments = res.comments;
        this.productSubject.next(this.product);
      });
    }
  }
  onEditSubmit(value) {
    this.colors.Brown = value.Brown;
    this.colors.Orange = value.Orange;
    this.colors.Yellow = value.Yellow;
    this.colors.Red = value.Red;
    this.colors.Blue = value.Blue;
    this.colors.Black = value.Black;
    this.colors.Grey = value.Grey;
    this.colors.White = value.White;
    if (this.colors.White) {
      const color: Color = new Color();
      color.id = 1;
      color.type = 'White';
      this.resColors.push(color);
    }
    if (this.colors.Brown) {
      const color: Color = new Color();
      color.id = 8;
      color.type = 'Brown';
      this.resColors.push(color);
    }
    if (this.colors.Grey) {
      const color: Color = new Color();
      color.id = 2;
      color.type = 'Grey';
      this.resColors.push(color);
    }
    if (this.colors.Black) {
      const color: Color = new Color();
      color.id = 3;
      color.type = 'Black';
      this.resColors.push(color);
    }
    if (this.colors.Blue) {
      const color: Color = new Color();
      color.id = 4;
      color.type = 'Blue';
      this.resColors.push(color);
    }
    if (this.colors.Red) {
      const color: Color = new Color();
      color.id = 5;
      color.type = 'Red';
      this.resColors.push(color);
    }
    if (this.colors.Yellow) {
      const color: Color = new Color();
      color.id = 6;
      color.type = 'Yellow';
      this.resColors.push(color);
    }
    if (this.colors.Orange) {
      const color: Color = new Color();
      color.id = 7;
      color.type = 'Orange';
      this.resColors.push(color);
    }
    this.product.colors = this.resColors;
    this.ps.updateProduct(this.product)
      .subscribe(res => {
        return res;
      });
    this.productSubject.next(null);
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    this.snackBar.open('Edit Success', undefined, config);
  }
}
