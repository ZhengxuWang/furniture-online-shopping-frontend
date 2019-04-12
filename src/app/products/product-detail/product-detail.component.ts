import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {AuthService} from '../../shared/services/auth.service';
import {Product} from '../../shared/models/product';
import {Comment} from '../../shared/models/comment';
import {ProductsService} from '../../shared/services/products.service';
import {User} from '../../shared/models/user';
import {Category} from '../../shared/models/category';
import {Color} from '../../shared/models/color';
import {AddItem} from '../../shared/actions/shopping-cart.action';
import {Store} from '@ngrx/store';
import {ShoppingCartService} from '../../shared/services/shopping-cart.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  sameCategories: Product[];
  comment: Comment = null;
  constructor(
    private router: ActivatedRoute,
    private ps: ProductsService,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    private store: Store<{}>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.router.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        const id = +paramMap.get('id');
        return this.ps.getProduct(id);
      })
    ).subscribe((res) => {
      this.product = res;
      this.ps.filterByCategory(this.product.category.id).subscribe(cat => {
        console.log(cat);
        this.sameCategories = [];
        cat.forEach((pro) => {
          if (pro.id !== this.product.id) {
            this.sameCategories.push(pro);
          }
        });
      });
    });
  }
  addToCart() {
    this.store.dispatch(new AddItem({
      qty: 1,
      product: this.product
    }));
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    this.snackBar.open('Add to Cart Success', undefined, config);
  }
  onSubmit(value) {
    this.comment = new Comment();
    this.comment.comment = value.comment;
    this.comment.star = value.rating;
    const product = new Product();
    product.id = this.product.id;
    product.name = this.product.name;
    product.brand = this.product.brand;
    product.stock = this.product.stock;
    product.image = this.product.image;
    product.discount = this.product.discount;
    product.description = this.product.description;
    product.star = this.product.star;
    product.category = this.product.category;
    product.colors = this.product.colors;
    this.comment.product = product;
    this.product.comments.push(this.comment);
    this.ps.updateProduct(this.product).subscribe(
      res => {
        if (res.success) {
          // console.log('success');
          this.ps.getProduct(this.product.id).subscribe(rest => {
            this.product = rest;
          });
        } else {
          // console.log('fail');
        }
      }
    );
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    this.snackBar.open('Add Comment Success', undefined, config);
  }
}
