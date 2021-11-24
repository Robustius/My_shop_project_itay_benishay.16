import { Component, Inject, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { CartProducts } from 'src/app/models/CartProducts.model';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
@Input() cartProduct:CartProducts
  constructor() { }

  ngOnInit(): void {
    
  }

}
