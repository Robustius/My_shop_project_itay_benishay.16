import { Component, Input, OnInit } from '@angular/core';
import { CartProducts } from 'src/app/models/CartProducts.model';
import { Product } from 'src/app/models/Product.model';
import { MessengerService } from 'src/app/services/messenger.service';
@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
  @Input() cartDetails: any = []
  totalPrice = 0
  cartProducts: CartProducts[] = [];
  constructor(private msg: MessengerService) {
  }

  ngOnInit(): void {
    console.log(this.cartDetails, 'THIS IS THE CART DETAILS');
    this.msg.getMsg().subscribe((product: Product) => {
      this.addProductToCart(product)
    },error=>console.log(error)
    )
  }
  addProductToCart(product: Product) {
    if (this.cartProducts.length === 0) {
      this.cartProducts.push({
        id: null,
        productName: product.productName,
        productId: product.id,//get Product Name!!!!!!
        quantity: 1,
        price: product.price,
        cartId: this.cartDetails.id
      });
    } else {
      for (let i in this.cartProducts) {
        if (this.cartProducts[i].productId === product.id) {
          console.log(this.cartProducts[i].productId);
          this.cartProducts[i].quantity++
        } else {
          this.cartProducts.push({
            id: null,
            productName: product.productName,
            productId: product.id,//get Product Name!!!!!!
            quantity: 1,
            price: product.price,
            cartId: this.cartDetails.id
          });
        }
      }
    }
    this.totalPrice = 0
    this.cartProducts.forEach(product => {
      this.totalPrice += (product.quantity * product.price);
    });
  }
}
