import { Order } from "./Order.model";

export class CreditCard {
    number
    errors:any
    isValid:boolean
    constructor(number:any,private Order:Order){
this.number=number
    }
    validateCreditCardNumber() {
        if (this.number)
        
        console.log(this.number);
        
          var ccNum = this.number.toString()
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
    
        if (isValid) {
          this.isValid=true
          this.Order.ccv = Number(ccNum)
          this.errors.push({number:'valid'});
    
          return this.number
        } else {
          this.isValid = false
          this.errors.push({number:'Card number is not valid'}) //if isValid is false return error and exit the validateform with error
          return this.number
        }
      }

}
