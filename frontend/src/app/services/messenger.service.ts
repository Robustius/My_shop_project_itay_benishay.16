import { Injectable } from '@angular/core';
import { Subject, Subscriber } from 'rxjs';
import { Product } from '../models/Product.model';
import { HttpClient } from '@angular/common/http';
import { CartProducts } from '../models/CartProducts.model';
import { take, takeUntil } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  subject = new Subject<any>()//??????????
  constructor(private http: HttpClient) { }
  sendMsg(product: Product,quantity:number) {
    this.subject.next([product,quantity])
  }
 
  
  getMsg() {
    console.log('im here');
    
    
    return this.subject.asObservable()
    
  }
}
