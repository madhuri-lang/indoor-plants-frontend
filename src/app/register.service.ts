import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  userEmail ="UserEmailID";
  constructor(private http:HttpClient) { }

  onSignUp(signupForm:any): Observable<any>
  {
    var URL = "http://localhost:3000/register";
    var body=JSON.stringify(signupForm);
    let header= {'content-type':'application/json'};
    return this.http.post(URL,body,{'headers':header,responseType:'text'});
  }

  onLogin(loginForm:any):Observable<any>
  {
  
    var URL='http://localhost:3000/login';
    var body=JSON.stringify(loginForm);
    console.log("login form email is: "+loginForm.email);
    
    let header ={'content-type':'application/json'};
    localStorage.setItem(this.userEmail, loginForm.email);
     return this.http.post(URL,body,{'headers':header,responseType:'text'});
}

onForgotPassword(forgotForm:any):Observable<any>
{
  var URL='http://localhost:3000/forgotpassword';
    var body=JSON.stringify(forgotForm);
    
    let header ={'content-type':'application/json'};
     return this.http.post(URL,body,{'headers':header,responseType:'text'});
} 

onResetPassword(resetForm:any):Observable<any>
{
  var URL='http://localhost:3000/resetpassword';
    var body=JSON.stringify(resetForm);
    
    let header ={'content-type':'application/json'};
     return this.http.put(URL,body,{'headers':header,responseType:'text'});
}
onCheckOut():Observable<any>
{
  var URL = "http://localhost:3000/doPayment";
  return this.http.get(URL);
}

}
