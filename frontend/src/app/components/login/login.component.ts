import { take } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { CustomerService } from 'src/app/services/customer.service';
import { CartProducts } from 'src/app/models/CartProducts.model';
import { OrderService } from 'src/app/services/order.service';
import { CartModel } from 'src/app/models/Cart.model';
import { Order } from 'src/app/models/Order.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  token: { token: '', role: '' }
  getToken: Promise<string>;
  errors: any = 'please Log-in..'
  currentUser: any = localStorage.getItem('currentUser');
  cartDetails: CartModel
  cartProducts: CartProducts[] = []
  constructor(private authService: AuthService, private cart: CustomerService, private router: Router, private orderService: OrderService) { }
  isAdmin: boolean | string = false
  userRole: boolean | string
  totalPrice: number
  lastOrder: Order

  ngOnInit(): void {

    this.userRole = false
    this.token = this.authService.getToken();
    if (this.token) {
      this.userRole = this.token.role
      this.userRole == "admin" ? this.isAdmin = true : this.isAdmin = false;
      this.setUserPreset();
      return
    }
    this.errors = "please Log-in..";
  }

  async onLogin() {
    this.getToken = this.authService.login({
      email: this.email,
      password: this.password
    }).then(value => {
      this.token = value.token
      if (!this.token) {
        return this.errors = value
      }
      localStorage.setItem('currentUser', JSON.stringify(value));
      this.userRole = value.role
      this.userRole === "admin" ? this.isAdmin = true : this.isAdmin = false;
      this.email = '';
      this.password = '';
      this.setUserPreset();

    }).catch((error) => {
      this.errors = error
    });
  }
  public async setUserPreset() {
    this.totalPrice = 0
    try {
      const cart = await this.cart.getCart();
      this.cartDetails = cart[0]
      const cartItems = await this.cart.getCartItems(cart[0].id)
      this.cartProducts = cartItems;
      this.cartProducts.forEach(item => {
        this.totalPrice += item.quantity * item.price;
      });
        try {
          const lastOrder = await this.orderService.findLastOrder();
          console.log(lastOrder);
          
          this.lastOrder = lastOrder[0]
          console.log(this.lastOrder);
          
        } catch (error) {
          console.log(error);
        }
      
    } catch (error) {
      console.log(error);
    }
  }
  async setOrderCount() {

  }
}

