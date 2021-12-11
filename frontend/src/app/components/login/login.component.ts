import { take } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { CustomerService } from 'src/app/services/customer.service';
import { CartProducts } from 'src/app/models/CartProducts.model';

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
  userCart: CartProducts[] = []
  constructor(private authService: AuthService, private cart: CustomerService, private router: Router) { }
  isAdmin: boolean | string = false
  isloggedin: boolean | string
  ngOnInit(): void {
    this.isloggedin = false
    this.token = this.authService.getToken();
    if (this.token) {
      this.isloggedin = this.token.role
      this.isloggedin == "admin" ? this.isAdmin = true : this.isAdmin = false;
      this.setExistingCart();
      return
    }
    this.errors = "please Log-in..";
  }
  async onLogin() {
    this.getToken = this.authService.login({
      email: this.email,
      password: this.password
    }).then(value => {
      console.log(value);


      this.token = value.token
      if (!this.token) {
        return this.errors = value
      }
      console.log(this.token);

      localStorage.setItem('currentUser', JSON.stringify(value));
      this.isloggedin = value.role
      this.isloggedin === "admin" ? this.isAdmin = true : this.isAdmin = false;
      this.email = '';
      this.password = '';
      this.setExistingCart();

    }).catch((error) => {
      this.errors = error
    });
  }
  public async setExistingCart() {

  const cart = await this.cart.getCart();
  const cartItems = await this.cart.getCartItems(cart[0].id)
  this.userCart = cartItems;
  let totalPrice = 0
  this.userCart.forEach(item => {
    totalPrice += item.quantity * item.price;
  });
}
}

