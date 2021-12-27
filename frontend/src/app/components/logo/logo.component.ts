import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Customer } from 'src/app/models/Customer.model';
@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css'],
})
export class LogoComponent implements OnInit {
  @Output() searchResultEvent = new EventEmitter();
  @Output() searched = new EventEmitter<string>();
  productToSearch: string;
  searchRecipt: string;
  guestPreset: string;
  userInfo: Customer = new Customer(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  );
  constructor(
    public router: Router,
    private prodService: ProductsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    let token = this.auth.getToken();
    if (token!==undefined) {
      this.auth.getUser().then((value) => {
        if (value.length > 0) {
          this.userInfo.firstName = value[0].firstName;
          return (this.userInfo.email = value[0].userName);
        }
      });
    } else {
      this.guestPreset = 'Welcome-Guest!';
    }
  }
  search() {
    this.prodService
      .getProductByName(this.productToSearch)
      .subscribe((value) => {
        this.searchResultEvent.emit(value);
      });
  }
  onSearch(): void {
    this.searched.emit(this.searchRecipt);
  }
}
