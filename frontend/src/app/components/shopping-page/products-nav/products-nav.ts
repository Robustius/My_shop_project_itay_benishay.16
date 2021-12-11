import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product.model';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-products-nav',
  templateUrl: './products-nav.component.html',
  styleUrls: ['./products-nav.css']
})
export class ProductsNav implements OnInit {
  @Output() productsEvent = new EventEmitter<any>()
  categoryName: string
  constructor(private productServ: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  async onSelect(categoryId: number) {
    this.productServ.getProductsByCategory(categoryId).subscribe(value => {

      this.productsEvent.emit(value)
    })
    
  }
}

