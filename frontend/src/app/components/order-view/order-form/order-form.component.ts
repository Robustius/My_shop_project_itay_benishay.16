import { Component, OnInit } from '@angular/core';
import { Cities, Customer } from 'src/app/models/Customer.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})

export class OrderFormComponent implements OnInit {
  cities: any[] = Object.keys(Cities).slice(10)
    userCity: Cities;
    count=0
    userInfo:Customer
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  
   
    
  

  }
  async getUserInfo(){
    const token=await this.auth.getToken();
    

    
  }
async setUserInfo(data:Boolean){
if (data===true){
  this.count++
  console.log(this.cities);
  console.log(this.count);
  
  }

}
}
