import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products:Product[]
  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }
getProducts(){
this.productService.getAllProducts().subscribe(value=>this.products=value)
}
}
