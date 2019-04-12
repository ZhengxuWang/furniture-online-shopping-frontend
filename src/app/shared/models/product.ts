import {Category} from './category';
import {Color} from './color';
import {Comment} from './comment';

export class Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  image: string;
  discount: number;
  description: string;
  star: number;
  category: Category;
  comments: Comment [];
  colors: Color[];
}
