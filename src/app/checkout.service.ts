// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CheckoutService {

//   constructor() { }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }
  baseURL="http://localhost:3000";
  stripePayment(obj: any):Observable<any>{
    let URL = this.baseURL + '/stripe';
  
    let header = {'content-type': 'application/json'};

    return this.http.post(URL,obj, {'headers': header, 'responseType': 'json'});
  }


  
}


