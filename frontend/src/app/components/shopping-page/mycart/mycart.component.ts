import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class MycartComponent implements OnInit, OnDestroy {


  @Input() cartProducts: CartProducts[] = []
  @Input() cartDetails: CartModel
  cartId: number
  totalPrice: number = 0
  private messageSubscription: Subscription
  constructor(private msg: MessengerService, private custServ: CustomerService, public router: Router) {
  }

  ngOnInit(): void {
    // this.refreshCart()


this.updateCart(this.cartId)
    this.handleSubscription()


  };
  ngOnDestroy(): void {


    this.messageSubscription.unsubscribe()

  }

  // async refreshCart() {
  //   this.cartId=undefined
  //   this.cartProducts = [];
  //   const id = await this.custServ.getCart();
  //   this.cartId = id[0].id;
  //   const items = await this.custServ.getCartItems(this.cartId);
  //   this.cartProducts = items;
  //   this.calculateTotal();
  // };
  updateCart(id: number) {
    this.custServ.getCart().then(value => {
      this.cartId = value[0].id;
    }).catch(error =>
      console.log(error)
    ).finally(() => {
      console.log(this.cartId);
      this.custServ.getCartItems(this.cartId).then(value => {
        this.cartProducts = value;
        console.log(this.cartProducts);
        this.calculateTotal()
      })
    })
  };

  handleSubscription() {
    this.messageSubscription = this.msg.getMsg().subscribe((product: any[]) => {
      this.addProductToCart(product[0], product[1]);
      
      //FIXXXXXXXXXXXXX
    }, error => console.log(error)
    )
  };


  addProductToCart(product: Product, quantity: number) {

    let productExists = false
    for (let i in this.cartProducts) {
      if (this.cartProducts[i].productId === product.id) {
        this.cartProducts[i].quantity += quantity
        productExists = true
        console.log(this.cartProducts, '=========', this.totalPrice);
        break;
      }
    };
    if (!productExists) {
     

      this.cartProducts.push({
        id: null,
        productName: product.productName,
        productId: product.id,
        quantity: quantity,
        price: product.price,
        cartId: this.cartDetails.id
      });
    };
    this.custServ.addToCart(this.cartProducts).then(value => {
      console.log(this.cartProducts);

    });
    this.calculateTotal();
  };
  calculateTotal() {
    this.totalPrice = 0

    this.cartProducts.forEach(product => {
      this.totalPrice += (product.quantity * product.price);
    });
    console.log(this.totalPrice);

  };

};
