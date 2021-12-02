import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../models/Product.model';
import { HttpClient } from '@angular/common/http';
import { CartProducts } from '../models/CartProducts.model';
@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  subject = new Subject<Product>()
  xSubject=new Subject<CartProducts[]>()
  constructor(private http: HttpClient) { }
  sendMsg(product: Product) {
    this.subject.next(product)
  }
 
  getProducts() {
    return this.xSubject.asObservable()
  }
  getMsg() {
    return this.subject.asObservable()
  }
}
