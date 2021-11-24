import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  public getCart(userToken: any): Promise<any>{
   return this.http.post('http://localhost:4000/customer/cart', userToken).toPromise()
   

  }
}
