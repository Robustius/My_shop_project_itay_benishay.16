import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartProducts } from '../models/CartProducts.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  public getCart(): Promise<any> {
    const token = this.auth.getToken()
    return this.http.post('http://localhost:4000/customer/cart', token).toPromise()
  }
  public getCartItems(cartId: number): Promise<CartProducts[]> {

    return this.http.get<CartProducts[]>(`http://localhost:4000/customer/cart/get/${cartId}`).toPromise()
    
  }
  public addToCart(cartProducts: CartProducts[]): Promise<any> {
    return this.http.post(`http://localhost:4000/customer/cart/add`, cartProducts).toPromise()

  }
  public deleteCartProduct(ProductId: number): Observable<CartProducts[]> {
    return this.http.delete<CartProducts[]>(`http://localhost:4000/customer/cart/delete-product/${ProductId}`).pipe(take(1))
  }
}

