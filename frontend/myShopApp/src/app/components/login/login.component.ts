import { take } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loginSub: Subscription;

  constructor(private authService : AuthService) { }


  ngOnInit(): void {

  }

  async onLogin() {
   console.log(this.email,this.password);
   this.loginSub = this.authService.login({ 
     email:this.email,
     password:this.password
    }).pipe(take(1)).subscribe(value => console.log(value));

  }

}

