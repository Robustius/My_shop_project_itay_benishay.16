import { ListKeyManager, ListKeyManagerModifierKey } from '@angular/cdk/a11y';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Input, OnInit, ViewChild } from '@angular/core';
import { Cities, Customer } from 'src/app/models/Customer.model';
import { Order } from 'src/app/models/Order.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { CartModel } from 'src/app/models/Cart.model';
import { CustomerService } from 'src/app/services/customer.service';
import { sharedStylesheetJitUrl } from '@angular/compiler';
import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { CartProducts } from 'src/app/models/CartProducts.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
// export interface ErrorsModel{
//   city:string;
//   street:string;
//   date:string;
// }
export class OrderFormComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  @Input() cartItems: CartProducts[];
  @Input() customerDetails: Customer;
  @Input() orderDetails: Order;
  cartDetails: CartModel;
  cities: any = Object.keys(Cities).slice(10);
  creditCard: number | string;
  errors: any;
  isValid: boolean = false;
  isOpendialog = false;
  constructor(
    private order: OrderService,
    private cart: CustomerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cart.getCart();
  }

  async validateForm() {
    this.cart
      .getCart()
      .then(async (value) => {
        this.orderDetails.cartId = value[0].id;
        this.orderDetails.customerId = value[0].customerId;
        this.orderDetails.orderDate = value[0].startDate;
        if (this.form.valid) {
          const posted = await this.postOrderToServer(this.orderDetails);
          this.openDialog();
          this.form.reset();
          this.isOpendialog = true;
        }
      })
      .catch((error) => console.log(error));
  }

  async openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      items: this.cartItems,
    };

    let dialogRef = this.dialog.open(OrderDialogComponent, dialogConfig);
    dialogRef.afterOpened().subscribe((dialogConfig) => {});
  }
  async checkDate() {
    try {
      const result = await this.order.verifyDate(
        this.orderDetails.deliveryDate
      );

      if (result[0].c >= 3) {
        this.isValid = false;
        this.orderDetails.deliveryDate = undefined;
        this.errors = 'busy day,try another day';
        return 
      } else {
        this.errors = '';
        return 
      }
    } catch (error) {
      console.log(error);
    }
  }

  async setUserInfo(info: any) {
    if (info === this.customerDetails.street) {
      this.orderDetails.street = this.customerDetails.street;
    } else if (info === this.customerDetails.city) {
      this.orderDetails.city = this.customerDetails.city;
    }
  }
  validateCreditCardNumber() {
    if (this.creditCard) var ccNum = this.creditCard.toString();

    var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    var amexpRegEx = /^(?:3[47][0-9]{13})$/;
    var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    var isValid = false;

    if (visaRegEx.test(ccNum)) {
      isValid = true;
    } else if (mastercardRegEx.test(ccNum)) {
      isValid = true;
    } else if (amexpRegEx.test(ccNum)) {
      isValid = true;
    } else if (discovRegEx.test(ccNum)) {
      isValid = true;
    }

    if (isValid === true) {
      this.isValid = isValid;
      this.orderDetails.ccv = Number(ccNum);
      this.errors = 'valid';

      return this.isValid;
    } else {
      this.isValid = false;

      this.form?.controls.creditCard.setErrors({ ccNum });
      this.errors = 'Card number is not valid';
      return this.isValid;
    }
  }

  async postOrderToServer(order: Order) {
    try {
      if (this.isValid === true) {
        const result = await this.order.postOrder(order);

        if (result) {
        }
      }
    } catch (error) {}
  }
}
