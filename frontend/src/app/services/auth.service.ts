import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { from, Observable } from 'rxjs';
import { UserCreds } from '../models/UserCreds.model';
import { Customer } from '../models/Customer.model';
import { interceptorSkipHeader } from './interceptors';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = environment.loginEndPoint;
  user:any
 token: any
  // *** use router location through service
  //       ->nav to /login if no currentUser set ***

  constructor(private http: HttpClient) {}

  public getToken(): any {
    const currentUser = localStorage.getItem('currentUser');
    
    
    if (currentUser === null) {
      return undefined;
    } else {
      this.user = JSON.parse(currentUser)?.role;
      return JSON.parse(currentUser);
    }
  }
   getUser():Promise<any>{
    const headers = new HttpHeaders().set(interceptorSkipHeader, '');
    this.user=this.getToken()
    return this.http.get<any>(`http://localhost:4000/customer/info/get/${this.user.token}`,{ headers }).toPromise()
    
  }

  login(creds: UserCreds): Promise<any> {
    const headers = new HttpHeaders().set(interceptorSkipHeader, '');
    return this.http.post(`${this.BASE_URL}`, creds, { headers }).toPromise();
  }
  FirstVerify(customer: Customer): Promise<any> {
    
    const headers = new HttpHeaders().set(interceptorSkipHeader, '');
    return this.http
      .post<any>(`http://localhost:4000/register/verify`, customer, { headers })
      .toPromise();
  }
  register(customer: Customer): Promise<any> {
    const headers = new HttpHeaders().set(interceptorSkipHeader, '');
    return this.http
      .post<any>(`http://localhost:4000/register`, customer, { headers })
      .toPromise();
  }
}
