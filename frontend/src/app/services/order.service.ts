import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
   
      return this.http.post<any>('http://localhost:4000/customer/user/verifydate',{date}).toPromise() 
    } catch (error) {
      console.log(error);
      
    }
  }
  async postOrder(order:Order):Promise<any>{
    try {
   
      
     return this.http.post<any>('http://localhost:4000/customer/user/order',order).toPromise();
        
    } catch (error) {
    console.log(error);
      
    }
  }
  async findLastOrder():Promise<any>{
    const token = this.auth.getToken()
    try {
     
      
       return this.http.get<any>(`http://localhost:4000/customer/user/last-order/${token.token}`).toPromise()
    } catch (error) {
      console.log(error);
      
    }
   
  }
 async getAllOrders():Promise<any>{
   return this.http.get("http://localhost:4000/customer/info/all-orders").toPromise()
 }
  
}
