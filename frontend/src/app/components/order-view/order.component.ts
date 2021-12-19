import { Component, Input, OnInit } from '@angular/core';
import { CartProducts } from 'src/app/models/CartProducts.model';
import { CustomerService } from 'src/app/services/customer.service';
import { CartModel } from 'src/app/models/Cart.model';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Customer } from 'src/app/models/Customer.model';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order.model';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cartItems: CartProducts[] = []
  public search: string = null;
  cartDetails: CartModel[]
  totalPrice: number
  customerDetails: Customer
  orderDetails: Order = new Order(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)
  constructor(private order: OrderService, private cart: CustomerService, private location: Location, private auth: AuthService) { }

  ngOnInit(): void {
    this.setExistingCart();
  }
  async getCustomerInfo() {
    try {
      const customerDetails = await this.order.getUserDetails()
      this.customerDetails = customerDetails
      this.customerDetails = customerDetails[0]
    } catch (error) {
      console.log(error);
    }
  }
  public async setExistingCart() {

    this.totalPrice = 0
    const cart = await this.cart.getCart();
    const cartItems = await this.cart.getCartItems(cart[0].id)
    this.cartItems = cartItems

    if (cartItems) {
      this.getCustomerInfo();
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.cartItems.forEach(item => {
      this.totalPrice += item.price * item.quantity
    });
    this.orderDetails.price = this.totalPrice;
  }

  public onSearched(searchTerm: string) {
    this.search = searchTerm;
  }
  public goBack() {
    this.cartItems = [];
    this.cartDetails = undefined
    this.location.back()

  }
}

