import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../models/product';

@Pipe({
  name: 'productsPipe'
})
export class ProductsPipePipe implements PipeTransform {

  transform(products: Product[], min, max): any {
    // should match brand and price ranges from min to max.
    min = min || Number.MIN_VALUE; // default values if undefined.
    max = max || Number.MAX_VALUE;
    return products ? products.filter(p => p.price >= min && p.price <= max) : products;
  }

}
