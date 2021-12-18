import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs'
import { UserCreds } from '../models/UserCreds.model';
import { Customer } from '../models/Customer.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = environment.loginEndPoint;
  
  // *** use router location through service 
  //       ->nav to /login if no currentUser set ***

  constructor(private http: HttpClient) { }

  public getToken(): any {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser === null) {
      return undefined;
    }

    else {
      return JSON.parse(currentUser);
    }
  }
 

  login(creds: UserCreds): Promise<any> {
    return this.http.post(`${this.BASE_URL}`, creds).toPromise();

  }
  FirstVerify(customer: Customer): Promise<any> {
    return this.http.post(`http://localhost:4000/register/verify`, customer).toPromise();
  }
  register(customer: Customer): Promise<any> {
    return this.http.post(`http://localhost:4000/register`, customer).toPromise();
  }
}
