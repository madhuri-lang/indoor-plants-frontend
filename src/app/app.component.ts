import { Component } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';
import { CartService } from './cart.service';
import { Cart2Service } from './cart2.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'routing-app';

  public totalItem : number=0;
  cartProducts:any=[];
  cartLength=0;
  constructor(private authenticationService : AuthenticationService , private authguard:AuthGuardService, private cartService:Cart2Service){}
  valLogin= false;
  ngDoCheck()
  {
    if(localStorage.getItem('isLoggedIn')=='true')
    {
      this.valLogin=true;
    }
  }

  
  logInForAuthGuard()
  {
    this.authenticationService.login();
     if(this.authenticationService.logVal==true)

     this.valLogin= true;
    
  }
  logOutForAuthGuard()
  {
    this.authenticationService.logout();
     if(this.authenticationService.logVal==false)
     this.valLogin= false;
  }

  

    // cartLengthFunc():number
    // {
    //   this.readCart();
    //   return this.cartLength;
    // }


ngOnInit():void{
  
}
}
