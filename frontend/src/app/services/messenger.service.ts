import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../models/Product.model';
@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  subject = new Subject<Product>()
  constructor() { }
  sendMsg(product: Product) {
    this.subject.next(product)
  }
  getMsg() {
    return this.subject.asObservable()
  }
}
