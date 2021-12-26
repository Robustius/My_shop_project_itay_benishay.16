import { take } from 'rxjs/operators';
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
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  token: { token: ''; role: '' };
  getToken: Promise<string>;
  errors: any = 'please Log-in..';
  currentUser: any = localStorage.getItem('currentUser');
  cartDetails: CartModel;
  cartProducts: CartProducts[] = [];
  constructor(
    private authService: AuthService,
    private cart: CustomerService,
    private router: Router,
    private orderService: OrderService
  ) {}
  isAdmin: boolean | string = false;
  userRole: boolean | string;
  totalPrice: number;
  lastOrder: Order;
  nOrders: number;
  nProducts: number;
  ngOnInit(): void {
    this.userRole = false;
    this.setOrderCount();

    this.token = this.authService.getToken();
    if (this.token) {
      this.userRole = this.token.role;
    }

    this.userRole == 'admin'
      ? this.navigateAdminPage()
      : (this.setUserPreset(), (this.isAdmin = false));

    this.errors = 'please Log-in..';
  }
  navigateAdminPage() {
    this.router.navigate(['/adminview']);
  }
  async onLogin() {
    this.getToken = this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .then((value) => {
        this.token = value.token;
        if (!this.token) {
          return (this.errors = value);
        }
        localStorage.setItem('currentUser', JSON.stringify(value));
        this.userRole = value.role;
        this.userRole === 'admin'
          ? this.navigateAdminPage()
          : (this.isAdmin = false);
        this.email = '';
        this.password = '';

        this.setUserPreset();
      })
      .catch((error) => {
        this.errors = error;
      });
  }
  public async setUserPreset() {
    if (!this.token) {
      return;
    }

    this.errors = '';
    this.email = '';
    this.password = '';
    this.totalPrice = 0;
    try {
      const cart = await this.cart.getCart();
      this.cartDetails = cart[0];

      const cartItems = await this.cart.getCartItems(cart[0].id);
      this.cartProducts = cartItems;
      this.cartProducts.forEach((item) => {
        this.totalPrice += item.quantity * item.price;
      });
      try {
        const lastOrder = await this.orderService.findLastOrder();
        this.lastOrder = lastOrder[0];
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async setOrderCount() {
    const nOfOrders = await this.orderService.getAllOrders();

    this.nProducts = nOfOrders[1][0].nProduct;
    this.nOrders = nOfOrders[0][0].nOrders;
  }
}
