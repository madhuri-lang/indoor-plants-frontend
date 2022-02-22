import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  validUser(loginForm:any):Observable<any>{
    var URL='http://localhost:3000/login';
    var body=JSON.stringify(loginForm);
    
    let header ={'content-type':'application/json'};
     return this.http.post(URL,body,{'headers':header,responseType:'text'});
}
}
