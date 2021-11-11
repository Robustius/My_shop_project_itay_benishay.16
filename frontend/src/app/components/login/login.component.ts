import { take } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  token: string
  getToken: Promise<any>;
  errors: any = 'please Log-in..'
  currentUser: any = localStorage.getItem('currentUser');
  constructor(private authService: AuthService, private location: Location, private router: Router) { }


  ngOnInit(): void {
     this.token = this.authService.getToken();



    this.errors = "please Log-in..";
  }

  async onLogin() {
    this.errors = "please Log-in..";

    this.getToken = this.authService.login({
      email: this.email,
      password: this.password
    }).then(value => {
      this.token = value;
      if (this.token === "") {
        return this.errors = value

      } else

        localStorage.setItem('currentUser', JSON.stringify(this.token));
        
      this.email = '';
      this.password = '';
      
    }).catch((error) => {

      this.errors = error

      console.log(this.errors);

    });
    // this.loginSub = this.authService.login({
    //   email: this.email,
    //   password: this.password
    // }).pipe(take(1)).subscribe(value => this.user = value);
    // if(this.user){
    //   localStorage.setItem('currentUser', JSON.stringify(this.user));
    // }


  }

}

