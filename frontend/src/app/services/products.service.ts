import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './../models/Product.model'
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  BASE_URL = `http://localhost:4000/admin`
  // getAllProducts(): Observable<Product[]> {
  //     return this.http.get<Product[]>(`${this.BASE_URL}`);
  // }
  getAllProducts(): Promise<any> {
    return this.http.get<any>(`http://localhost:4000/products`).toPromise()
  }
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:4000/products/id/${categoryId}`).pipe(take(1));
  }


  // getProductById(id: number): Observable<Product> {
  //     return this.http.get<Product>(`${this.BASE_URL}/${id}`);
  // }
  getProductByName(product: string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:4000/products/name/${product}`).pipe(take(1));
  }

  add(newProduct: FormData): Promise<any> {
    console.log(newProduct);

    return this.http.post(`http://localhost:4000/admin`, newProduct).toPromise();
  } 

  //   update(id:number, updatedBook: BookModel): Promise<any> {
  //     return this.http.put(`${this.BASE_URL}/${id}`,updatedBook).toPromise();
  //   }

  //   delete(id: number): Promise<any> {
  //     return this.http.delete(`${this.BASE_URL}/${id}`).toPromise();
  //   }
}