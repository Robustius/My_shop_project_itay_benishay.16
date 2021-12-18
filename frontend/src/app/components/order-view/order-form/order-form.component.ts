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
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { CartProducts } from 'src/app/models/CartProducts.model';



@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
// export interface ErrorsModel{
//   city:string;
//   street:string;
//   date:string;
// }
export class OrderFormComponent implements OnInit{
  @ViewChild('f') form: NgForm;
  @Input() cartItems:CartProducts[]
  @Input() customerDetails: Customer;
  @Input() orderDetails: Order;
  cartDetails: CartModel;
  cities: any = Object.keys(Cities).slice(10);
  creditCard: number;
  errors: any;
  isValid: boolean = false
  isOpendialog = false
  constructor(private order: OrderService, private cart: CustomerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cart.getCart()

    console.log(this.form, `im here`);
  }
  validateForm() {
console.log(this.form.errors);

    if (this.isValid == false) {
      this.cart.getCart().then(value => {
        this.orderDetails.cartId = value[0].id;
        this.orderDetails.customerId = value[0].customerId;
        this.orderDetails.orderDate = value[0].startDate

      }).catch(error =>
        console.log(error)
      );
      // this.checkDate()?this.isValid=true:this.isValid=false
      this.checkDate();
      this.isValid = this.validateCreditCardNumber();

      if (this.form.valid) {
        this.postOrderToServer(this.orderDetails);
        this.openDialog();
        this.form.reset()
        this.isOpendialog = true
      }
    }
  }

  async openDialog() {
  
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data = {
     items :this.cartItems
  };
  
  
      let dialogRef = this.dialog.open(OrderDialogComponent, dialogConfig)
    dialogRef.afterOpened().subscribe(dialogConfig => {
     
    });
  }
  async checkDate() {
    try {
      //JOI DATE in nodejs from here
      const result = await this.order.verifyDate(this.orderDetails.deliveryDate);

      if (result[0].c >= 3) {
        this.isValid = false
        this.orderDetails.deliveryDate = undefined;
        this.errors = "busy day,try another day"
        return
      } return
    } catch (error) {
      console.log(error);
    }
  }

  async setUserInfo(info: any) {
    if (info === this.customerDetails.street) {
      this.orderDetails.street = this.customerDetails.street
    } else if (info === this.customerDetails.city) {
      this.orderDetails.city = this.customerDetails.city
    }
  }
  validateCreditCardNumber() {
    if (this.creditCard)
      var ccNum = this.creditCard.toString()
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
      console.log('master');
      isValid = true;
    } else if (discovRegEx.test(ccNum)) {
      console.log('master');
      isValid = true;
    }

    if (isValid) {
      this.orderDetails.ccv = Number(ccNum)
      this.errors = 'valid';

      return true
    } else {
      this.isValid = false
      this.errors = 'Card number is not valid' //if isValid is false return error and exit the validateform with error
      return false
    }
  }

  async postOrderToServer(order: Order) {
    try {
      if (this.isValid === true) {
        const result = await this.order.postOrder(order)
        console.log(result);
        if (result) {

        }
      }
    } catch (error) {

    }
  }

}


