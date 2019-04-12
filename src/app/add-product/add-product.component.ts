import { Component, OnInit } from '@angular/core';
import {Product} from '../shared/models/product';
import {ProductsService} from '../shared/services/products.service';
import {Color} from '../shared/models/color';
import {BehaviorSubject, Subject} from 'rxjs';
import {Category} from '../shared/models/category';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  colors = {
    Grey: false,
    White: false,
    Black: false,
    Blue: false,
    Red: false,
    Yellow: false,
    Orange: false,
    Brown: false
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
  resColors: Color[] = [];
  product: Product = new Product();
  productSubject: Subject<Product> = new BehaviorSubject<Product>(null);
  constructor(private ps: ProductsService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  onAddSubmit(value) {
    this.product.name = value.name;
    const category = new Category();
    category.id = this.categories[value.category];
    category.type = value.category;
    this.product.category = category;
    console.log(category);
    this.product.description = value.description;
    this.product.discount = value.discount;
    this.product.stock = value.stock;
    this.product.brand = value.brand;
    this.product.price = value.price;
    this.product.image = value.image;
    this.colors.Brown = value.Brown;
    this.colors.Orange = value.Orange;
    this.colors.Yellow = value.Yellow;
    this.colors.Red = value.Red;
    this.colors.Blue = value.Blue;
    this.colors.Black = value.Black;
    this.colors.Grey = value.Grey;
    this.colors.White = value.White;
    this.resColors = [];
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
    this.productSubject.next(this.product);
    this.ps.addProduct(this.product).subscribe(res => {
    });
    this.ps.getProductByName(this.product.name).subscribe(res => {
      this.product.id = res.id;
    });
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    this.snackBar.open('Add Product Success', undefined, config);
  }
}
