import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CustomStyleModule} from './shared/modules/custom-style/custom-style.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './home/slider/slider.component';
import {SliderItemDirective} from './home/slider/slider-item.directive';

import {FooterComponent} from './footer/footer.component';
import {ProductsComponent} from './products/products.component';
import {LoginComponent} from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {shoppingCartReducer} from './shared/reducers/shopping-cart.reducer';
import {ordersReducer} from './shared/reducers/orders.reducer';
import { OrdersComponent } from './orders/orders.component';
import {StoreModule} from '@ngrx/store';
import {OrdersEffect} from './shared/effects/orders.effect';
import {EffectsModule} from '@ngrx/effects';
import {BarRatingModule} from 'ngx-bar-rating';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbdCarouselConfigComponent} from './home/carousel/carousel-config';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductsPipePipe } from './shared/pipes/products-pipe.pipe';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import {LanguageTranslationModule} from './shared/modules/language-translation/language-translation.module';
import {ChartsModule} from 'ng2-charts';
import {EmbedVideo} from 'ngx-embed-video/dist';
import { VideoComponent } from './home/video/video.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {CountdownModule} from 'ngx-countdown';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SliderComponent,
    SliderItemDirective,
    FooterComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    OrdersComponent,
    NgbdCarouselConfigComponent,
    UserInfoComponent,
    ManageProductComponent,
    AddProductComponent,
    ProductsPipePipe,
    EditUserComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomStyleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LanguageTranslationModule,
    BrowserAnimationsModule,
    BarRatingModule,
    NgbModule,
    ChartsModule,
    Ng2SearchPipeModule,
    CountdownModule,
    [HttpClientModule, EmbedVideo.forRoot()],
    StoreModule.forRoot({
      items: shoppingCartReducer,
      orders: ordersReducer
    }),
    EffectsModule.forRoot([
      OrdersEffect
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
