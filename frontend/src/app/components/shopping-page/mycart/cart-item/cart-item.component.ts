import {
  Component,
  Inject,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { CartProducts } from 'src/app/models/CartProducts.model';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cartProduct: CartProducts;
  @Output() deleteEvent = new EventEmitter();
  imageName:any
  constructor(
    private custServ: CustomerService,
    public router: Router,
    private prodService: ProductsService
  ) {}

  ngOnInit(): void {
  this.setImageName(this.cartProduct?.productId)
  }

  public async setImageName(productId:number) {
    try {
      const image=await this.prodService.getImageById(productId);
      this.imageName=image[0]              
      return  this.imageName
    } catch (error) {
      console.log(error);
      
    }
    
  }
  delete(id: number) {
    this.custServ.deleteCartProduct(id).subscribe((value) => {
      this.deleteEvent.emit(id);
    });
  }
}
