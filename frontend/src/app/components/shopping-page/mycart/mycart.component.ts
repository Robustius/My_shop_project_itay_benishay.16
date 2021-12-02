import { Component, Input, OnInit } from '@angular/core';
import { CartModel } from 'src/app/models/Cart.model';
import { CartProducts } from 'src/app/models/CartProducts.model';
import { Product } from 'src/app/models/Product.model';
import { CustomerService } from 'src/app/services/customer.service';
import { MessengerService } from 'src/app/services/messenger.service';
@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

  totalPrice = 0
  @Input() cartProducts: CartProducts[] = []
  @Input() cartDetails: CartModel
  cartId: number
  constructor(private msg: MessengerService, private custServ: CustomerService) {
  }

  ngOnInit(): void {
    this.handleSubscription()


  }
  updateCart(id: number) {
    this.custServ.getCart().then(value => {
      this.cartId = value[0].id
    }).catch(error => console.log(error)
    ).finally(() => {
      console.log(this.cartId);
      this.custServ.getCartItems(this.cartId).then(value => {
        this.cartProducts = value
        console.log(this.cartProducts);       
      })
    })
  }
// getCartItems(){
//   this.custServ.getCartItems(this.cartId);
// }

  handleSubscription() {
    this.msg.getMsg().subscribe((product: Product) => {
      this.addProductToCart(product);
    }, error => console.log(error)
    )
  }

  addProductToCart(product: Product) {
    let productExists = false
    for (let i in this.cartProducts) {
      if (this.cartProducts[i].productId === product.id) {
        this.cartProducts[i].quantity++;
        productExists = true
        break;
      }
    }
    if (!productExists) {
      console.log(product.productName);
      
      this.cartProducts.push({
        id: null,
        productName: product.productName,
        productId: product.id,
        quantity: 1,
        price: product.price,
        cartId: this.cartDetails.id
      });
    }
    this.totalPrice = 0
    this.custServ.addToCart(this.cartProducts).then(value => {
    })
    this.cartProducts.forEach(product => {
      this.totalPrice += (product.quantity * product.price);
    });
  }

}
