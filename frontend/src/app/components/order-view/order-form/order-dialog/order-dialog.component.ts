import { Component, Input, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CartProducts } from 'src/app/models/CartProducts.model';



@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {
  cartItems: CartProducts[]
  @Input() recipt = [{}]
  totalPrice = 0
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.cartItems = this.data.items
    this.calculateTotal()

  }
  calculateTotal() {
    this.totalPrice = 0
    console.log(this.cartItems);

    this.cartItems.forEach(item => {

      this.totalPrice += item.price * item.quantity
    });
    return this.totalPrice;
  }
  // createRecipt() {
  //   this.totalPrice = this.calculateTotal();

  //   this.cartItems.forEach(product => {
  //     this.recipt.push([product.productName, product.quantity, `/n`, product.price])
  //   })

  //   console.log(this.recipt);

  //   this.recipt.push(['/n', this.totalPrice])
  //   return
  // }

  // downloadRecipt() {
  //   // this.createRecipt()
  //   const recipt = this.recipt
  //   this.download(JSON.stringify(recipt), 'recipt.txt', 'text/plain')
  // }


  // download(products: any, fileName: any, contentType: any): any {
  //   console.log(arguments);

  //   var a = document.createElement("a");

  //   var file = new Blob([products], { type: contentType });
  //   a.href = URL.createObjectURL(file);
  //   a.download = fileName;
  //   a.click();
  // }
  download() {

    var a = document.body.appendChild(
      document.createElement("a")
    );
    a.download = "Recipt.txt";

    var list = document.getElementsByClassName("Precipt");
    var b = "";
    for (var i = 0; i < list.length; i++) {
      console.log(list[i].innerHTML); //second console output
      b += list[i].innerHTML + "\r\n";
    }
    b = encodeURIComponent(b);
    a.href = "data:text/html," + b;
    a.click();
  }
 
}
