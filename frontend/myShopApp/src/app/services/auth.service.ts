import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs'
import { UserCreds } from '../models/login.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = environment.loginEndPoint;
  
  constructor(private http: HttpClient) { }
  login(creds: UserCreds): Observable<any> {
    return this.http.post(`${this.BASE_URL}`,creds)
  }
}


