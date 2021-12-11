import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
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
  searchItem: Product[]
  @Input() products: Product[]=[]
  product: string
  constructor(private productService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.getProducts()
  }

  async getProducts() {
    
    const result = await this.productService.getAllProducts()
    this.products = result

  }


}
