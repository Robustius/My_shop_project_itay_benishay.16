import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  @Output() searchResultEvent = new EventEmitter();
  @Output() searched = new EventEmitter<string>();
  productToSearch: string;
  searchRecipt: string
  constructor(public router: Router, private prodService: ProductsService) { }

  ngOnInit(): void {
  }
  search() {
  
    this.prodService.getProductByName(this.productToSearch).subscribe(value => {
      this.searchResultEvent.emit(value)
    })
  }
  onSearch():void{  
    this.searched.emit(this.searchRecipt)
  }
  
}
