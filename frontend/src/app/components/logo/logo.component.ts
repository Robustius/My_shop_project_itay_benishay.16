import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  @ViewChild('f') form: NgForm
  productToSearch:string
  constructor(public router: Router, private prodService: ProductsService) { }

  ngOnInit(): void {
  }
  search() {
    let products=this.prodService.getAllProducts().subscribe(value=>{
      
    })
    console.log(products);
    
    this.prodService.getProductByName(this.productToSearch).subscribe()
  }
}
