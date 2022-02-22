import { Injectable } from '@angular/core';
import { CanActivate , Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router:Router) { }
  canActivate()
  {
    let bReturn = true;
    //alert("data from localstorage from authguardservice, is the user logged in "+localStorage.getItem('isLoggedIn'));
    if(localStorage.getItem('isLoggedIn')== 'true')
    {
      return true;
      
    }
    alert("Sorry, you are not allowed to view this page.. Please Login!");
      this.router.navigate(['/login']);
      bReturn= false;
    return bReturn;
  }
}
