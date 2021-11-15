import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './components/login/login.component';

import { HomeComponent } from './components/Home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AndHttpInterceptor } from './services/interceptors';
import { LogoComponent } from './Layout/logo/logo.component';
import { BodyComponent } from './Layout/body/body.component';
import { RegisterComponent } from './components/register/register.component';
import { MemberForm } from './components/register/Test.component';
import { MycartComponent } from './components/mycart/mycart.component';
import { AddProductComponent } from './components/register/admin/add-product/add-product.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { ProductsComponent } from './components/products/products.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AppComponent,
    LogoComponent,
    BodyComponent,
    MemberForm,
    MycartComponent,
    AddProductComponent,
    AdminViewComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AndHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
