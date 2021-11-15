import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { HomeComponent } from './components/Home/home.component';

import { LoginComponent } from './components/login/login.component';
import { MycartComponent } from './components/mycart/mycart.component';
import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/register/admin/add-product/add-product.component';
import { RegisterComponent } from './components/register/register.component';
import { MemberForm } from './components/register/Test.component';

const routes: Routes = [

  {
    path: "login",
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'adminview',
    component: AdminViewComponent,
    children: [
      {
        path: 'add',
        component: AddProductComponent
      }
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'cart',
        component: MycartComponent

      },
      {
        path: 'app-products',
        component: ProductsComponent

      }]
  },

  {
    path: "",
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
