import {Injectable} from '@angular/core';
import {Product} from '../models/product';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/index';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.API_URL}/products`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.API_URL}/products/${id}`);
  }
  getProductByName(name: string): Observable<Product> {
    return this.http.get<Product>(`${environment.API_URL}/product/${name}`);
  }
  addProduct(product: Product): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${environment.API_URL}/products`, product);
  }
  updateProduct(product: Product): Observable<{success: boolean}> {
    return this.http.put<{success: boolean, product: Product}>(`${environment.API_URL}/products`, product);
  }
  filterByCategory(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.API_URL}/products/category/${id}`);
  }
  filterByColor(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.API_URL}/products/color/${id}`);
  }
  filterInStock(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.API_URL}/products/stock`);
  }
  updateStock(): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${environment.API_WAREHOUSE}/productinstores/storage`, {withCredentials: true});
  }
}
