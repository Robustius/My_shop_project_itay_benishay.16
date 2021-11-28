import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './components/admin/admin-view/admin-view.component';
import { LoginComponent } from './components/login/login.component';
import { MycartComponent } from './components/shopping-page/mycart/mycart.component';
import { ProductsComponent } from './components/shopping-page/products/products.component';
import { AddProductComponent } from '../app/components/admin/add-product/add-product.component';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './app.component';
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';
import { ProductsNav } from './components/shopping-page/products-nav/products-nav';

const routes: Routes = [

  { path: "login", component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'adminview', component: AdminViewComponent,
    children: [
      { path: 'add', component: AddProductComponent }
    ]
  },
  {
    path: 'home', component: ShoppingPageComponent,
    children: [
      { path: 'cart', component: MycartComponent },
      {
        path: 'products', component: ProductsComponent
      },
      {
        path: 'products/categoryId', component: ProductsNav
      }]
  },
  { path: 'search/:searchTerm', component: ShoppingPageComponent },
  { path: "", redirectTo: "/login", pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
