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
  token: {token:'',role:''}
  getToken: Promise<any>;
  errors: any = 'please Log-in..'
  currentUser: any = localStorage.getItem('currentUser');
  constructor(private authService: AuthService, private location: Location, private router: Router) { }
  isAdmin: boolean | string = false
  isloggedin: boolean | string
  ngOnInit(): void {
    this.isloggedin = false
    this.token = this.authService.getToken();
    console.log(this.token, `what`); 
    if (this.token) {
      this.isloggedin = this.token.role
      this.isloggedin == "admin" ? this.isAdmin = true : this.isAdmin = false;
      return
    }
   



    this.errors = "please Log-in..";
  }

  async onLogin() {
    this.getToken = this.authService.login({
      email: this.email,
      password: this.password
    }).then(value => {
      this.token = value
      console.log(this.token);
      
      if (!this.token) {
        return this.errors = value
      }
      localStorage.setItem('currentUser', JSON.stringify(this.token));
      this.isloggedin = this.token?.role
      console.log(this.token);

      this.isloggedin === "admin" ? this.isAdmin = true : this.isAdmin = false;

      this.email = '';
      this.password = '';
    }).catch((error) => {

      this.errors = error



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

