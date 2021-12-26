import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}
  public getAllCategories() {
    this.http.get('http://localhost:4000/categories');
  }
}
