import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/Customer.model';
import { Order } from '../models/Order.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  async getUserDetails(): Promise<any> {
    const token = this.auth.getToken()
    if (!token) {
      return undefined
    } else {
      return this.http.post<any>(`http://localhost:4000/customer/user/details`, token).toPromise()
    }
  }
  async verifyDate(date:string):Promise<any>{
    try {
      console.log(date);
      return this.http.post<any>('http://localhost:4000/customer/user/verifydate',{date}).toPromise() 
    } catch (error) {
      console.log(error);
      
    }
  }
  async postOrder(order:Order):Promise<any>{
    try {
      console.log(order);
      
     return this.http.post<any>('http://localhost:4000/customer/user/order',order).toPromise()
        
    } catch (error) {
    console.log(error);
      
    }
  }
}
