import { Component, OnInit, Input, ViewChild,OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product.model';
import { MessengerService } from 'src/app/services/messenger.service';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  html = `<button  class="primary">Add</button>`;
  quantity: number
  @Input() product: Product
  constructor(private msg: MessengerService,public router:Router) { }

  ngOnInit(): void {

  }
  addToCart() {

    this.msg.sendMsg(this.product, this.quantity)
    
  }
  
}
