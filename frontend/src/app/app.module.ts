import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AndHttpInterceptor } from './services/interceptors';
import { RegisterComponent } from './components/register/register.component';
import { MycartComponent } from './components/shopping-page/mycart/mycart.component';
import { AdminViewComponent } from './components/admin/admin-view/admin-view.component'
import { ProductsComponent } from './components/shopping-page/products/products.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartItemComponent } from './components/shopping-page/mycart/cart-item/cart-item.component';
import { ProductsNav } from './components/shopping-page/products-nav/products-nav';
import { ProductItemComponent } from './components/shopping-page/product-item/product-item.component';
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component'
  

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AppComponent,
    MycartComponent,
    AddProductComponent,
    AdminViewComponent,
    ProductsComponent,
    CartItemComponent,
    ProductsNav,
    ProductItemComponent,
    ShoppingPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AndHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
