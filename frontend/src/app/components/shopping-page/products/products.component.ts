import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @ViewChild('f') form: NgForm

  products: Product[] = []
  product: string
  constructor(private productService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.search()
    if (this.products.length < 2) {
      this.getProducts()
    }
  }

  async getProducts() {
    this.productService.getAllProducts().subscribe(value => this.products = value)
    console.log(this.products);
  }
  search() {
    if (this.products.length == 1) {
      this.getProducts()
      this.products = this.products.filter(product => product.productName.toLowerCase() == this.product.toLowerCase())
    }
    this.products = this.products.filter(product => product.productName.toLowerCase() == this.product.toLowerCase())
  }

}
