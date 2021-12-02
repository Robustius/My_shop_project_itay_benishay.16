import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, NgModule, OnInit, ViewChild, ViewChildren, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { Cities, Customer } from 'src/app/models/Customer.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  @ViewChild('f') form: NgForm
  @ViewChild('f2') form2: NgForm
  @ViewChild('confirmPass') confirmPass: NgForm
  visible: boolean = true;
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  customer: Customer = new Customer(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)
  errors: any;
  cities: any = Object.keys(Cities).slice(10)
  constructor(private authService: AuthService, private location: Location) { }
  ngOnInit() {
  }
  public async firstStep() {
    if (this.visible) {
      this.open.emit(this.authService.FirstVerify(this.customer)
        .then
        (value => {        
          if (value) {
            this.visible = false
          }
        })
        .catch
        (errors => {
          console.log(errors);
          if (errors.status === 406) {
            this.errors = `email or id are already in use!`
          }
        }));
    } else {
      this.close.emit();
    }
  }
  public async onRegister() {
    this.authService.register(this.customer)
      .then
      (value => {
        
        this.authService.login
          ({ email: this.customer.email, password: this.customer.password })
          .then(token => {
            localStorage.setItem('currentUser', JSON.stringify(token))
            this.errors = ''
            this.customer = new Customer(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
            return this.location.back();
          }).catch(error => error)



      }).catch
      (error =>
        console.log(error));
    console.log(this.customer);

  }




}