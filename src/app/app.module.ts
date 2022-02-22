import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { UserDisplayComponent } from './user-display/user-display.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { CartComponent } from './cart/cart.component'
import { NgxStripeModule, StripeService } from 'ngx-stripe';
import { NGX_STRIPE_VERSION } from 'ngx-stripe/lib/interfaces/ngx-stripe.interface';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    UserDisplayComponent,
    ElectronicsComponent,
    NoPageFoundComponent,
    LoginComponent,
    SignUpComponent,
    AddToCartComponent,
    CheckoutComponent,
    ThankyouComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSliderModule,
    MatSlideToggleModule,
    NgxStripeModule.forRoot('pk_test_51K4p9kSEH1RnTHFJisu6qcY7Vdq5xnK1Ii5Tdowsqvom7dzNCxWTURaozNKZUxvTD0AMpPPYNox1dAsYzTg9N1Rj00e3ivRGGE')
  ],
  providers: [StripeService],

  bootstrap: [AppComponent]
})
export class AppModule { }
