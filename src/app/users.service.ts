import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
   getUsers(): Observable<any>
   {
     var URL = "http://localhost:3000/getAllUsers";
     return this.http.get(URL);
   }


   getUserByName(name:string):Observable<any>
   {
       var URL = "http://localhost:3000/getUserByName/"+ name;
       return this.http.get(URL);
   }

   getUserById(id:number): Observable<any>
   {
    var URL = "http://localhost:3000/getUserById/"+ id;
    return this.http.get(URL);
   }

   getOrder(emailID:string):Observable<any>
   {
     var URL = 'http://localhost:3000/order/'+emailID;
     return this.http.get(URL);
   }
}
