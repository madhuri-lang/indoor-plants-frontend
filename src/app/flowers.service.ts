import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flowers } from './Flowers';

@Injectable({
  providedIn: 'root'
})
export class FlowersService {
 

  constructor(private http: HttpClient) { }
   getFlowers()
   {
     return this.http.get<Flowers[]>("http://localhost:8000/BulbFlowers");
   }
}
