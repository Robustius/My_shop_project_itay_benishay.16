import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { MessengerService } from 'src/app/services/messenger.service';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product:Product
  constructor(private msg:MessengerService) { }

  ngOnInit(): void {
  }
  addToCart(){
    this.msg.sendMsg(this.product)
  }

}
