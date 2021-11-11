import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/Home/home.component';

import { LoginComponent } from './components/login/login.component';
import { MycartComponent } from './components/mycart/mycart.component';
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
    path: 'home',
    component: HomeComponent,
    children:[
      {
        path:'cart',
        component:MycartComponent
       
      }
    ]

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
