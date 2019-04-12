import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductsComponent} from './products/products.component';
import {LoginComponent} from './users/login/login.component';
import {RegisterComponent} from './users/register/register.component';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {OrdersComponent} from './orders/orders.component';
import {UserInfoComponent} from './users/user-info/user-info.component';
import {ManageProductComponent} from './manage-product/manage-product.component';
import {AddProductComponent} from './add-product/add-product.component';
import {EditUserComponent} from './users/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: ':category',
        component: ProductsComponent
      },
      {
        path: 'product-detail/:id',
        component: ProductDetailComponent
      }
    ]
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },
  {
    path: 'manageproduct',
    children: [
      {
        path: '',
        component: ManageProductComponent
      },
      {
        path: 'addproduct',
        component: AddProductComponent
      }
    ]
  },
  {
    path: 'users',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'user-info',
        component: UserInfoComponent
      }
    ]
  },
  {
    path: 'edituser',
    component: EditUserComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
