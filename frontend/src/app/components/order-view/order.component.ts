import { Component, Input, OnInit } from '@angular/core';
import { CartProducts } from 'src/app/models/CartProducts.model';
import { CustomerService } from 'src/app/services/customer.service';
import { CartModel } from 'src/app/models/Cart.model';
import { Location } from '@angular/common';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cartItems: CartProducts[]=[]
  public search: string = null;
  cartDetails: CartModel[]
  totalPrice: number
  constructor(private cart: CustomerService,private location:Location) { }

  ngOnInit(): void {
    this.setExistingCart()
  }
  async setExistingCart() {
   
    this.totalPrice = 0
    const cart = await this.cart.getCart();
    const cartItems  = await this.cart.getCartItems(cart[0].id)
    this.cartItems = cartItems
    if (cartItems) {
      
      this.calculateTotal()
    }

  }
  calculateTotal(){
  this.cartItems.forEach(item => {
    this.totalPrice += item.price * item.quantity
  });
}
  public onSearched(searchTerm: string) {
    this.search = searchTerm;
  }
goBack(){
  console.log( this.location);
  this.cartItems=[];
  this.cartDetails=undefined
  this.location.back()

}
}

