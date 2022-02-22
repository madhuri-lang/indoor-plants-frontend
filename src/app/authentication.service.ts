import { templateJitUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  logVal=false;
  varIsLoggedIn="isLoggedIn";
  login()
  {
      localStorage.setItem(this.varIsLoggedIn,'true');
      this.logVal=true;
  }
  logout()
  {
      localStorage.setItem(this.varIsLoggedIn,'false');
      this.logVal=false;
     alert("Logged Out!");
  }
}


