import { Component, Inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { CartProducts } from 'src/app/models/CartProducts.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() cartProduct: CartProducts
@Output() deleteEvent=new EventEmitter()
  constructor(private custServ: CustomerService) { }

  ngOnInit(): void {
console.log(this.cartProduct);

  }
  delete(id: number) {
    this.custServ.deleteCartProduct(id).subscribe(value => {
      this.deleteEvent.emit(id) 
    })
  }
}
