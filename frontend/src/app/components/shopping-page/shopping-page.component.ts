import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CartModel } from 'src/app/models/Cart.model';
import { CartProducts } from 'src/app/models/CartProducts.model';
import { MessengerService } from 'src/app/services/messenger.service';
import { Product } from 'src/app/models/Product.model';
@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {
  cartBarOpen :boolean
  products: Product[]=[]
  cartItems: CartProducts[] = []
  errors: any
  cart: CartModel
@Input()  isAdmin:boolean
  constructor(private custServ: CustomerService, private auth: AuthService, private msg: MessengerService) { }

  ngOnInit(): void {
    this.errors = undefined
 
    
    this.getCart(); 
  }
  
 
  setProducts(products: Product[]) {
    this.products = products


  }
  async getCart() {
    this.products=[]
    this.cartItems=[]
   
    this.custServ.getCart().then(value => { 
   
      
      this.cart = value[0]
      this.custServ.getCartItems(this.cart.id).then(value => {
        this.cartItems = value
      }).catch(error => console.log(error)
      );
    }).catch(error => {
      this.errors = error.error
      console.log(error);
    });
  }

  cartToggler() {
    this.cartBarOpen = !this.cartBarOpen
  }


}

