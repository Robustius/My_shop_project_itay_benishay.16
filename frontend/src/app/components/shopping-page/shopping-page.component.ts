import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {
  cart: string[] = []
  errors: any
  constructor(private custServ: CustomerService, private auth: AuthService, private location: Location) { }

  ngOnInit(): void {
    const userToken = this.auth.getToken()
    this.custServ.getCart(userToken).then(value => {
      this.cart = value[0]
      console.log(this.cart, "NU ANI POOOOOOOOOO");

    }).catch(error => {
      this.errors = error.error
      console.log(error);

    })
  }
}

