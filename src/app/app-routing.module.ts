import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { AuthGuardService } from './auth-guard.service';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { UserDisplayComponent } from './user-display/user-display.component';

const routes: Routes = [
  {path:'' , redirectTo:"/home" , pathMatch: 'full'},
  {path:'home' , component:HomeComponent},
  {path:'about' , component:AboutComponent},
  {path:'contact' , component:ContactComponent},
  {path:'user-display' , component:UserDisplayComponent, canActivate:[AuthGuardService]},
  {path:'electronics' , component:ElectronicsComponent,canActivate:[AuthGuardService]},
  {path:'login', component:LoginComponent},
  {path:'sign-up', component:SignUpComponent},
  //{path:'cart', component:AddToCartComponent},
  {path:'checkout', component:CheckoutComponent},
  {path:'thankyou', component:ThankyouComponent},
  {path:'forgotpassword', component:ForgotpasswordComponent},
  {path:'resetpassword',component:ResetpasswordComponent},
  {path:'cart', component:CartComponent},
  {path:'**' , component:NoPageFoundComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
