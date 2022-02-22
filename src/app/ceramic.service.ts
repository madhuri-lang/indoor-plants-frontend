import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ceramic } from './Ceramic';

@Injectable({
  providedIn: 'root'
})
export class CeramicService {

  constructor(private http: HttpClient) { }
  getCeramic()
  {
    return this.http.get<Ceramic[]>("http://localhost:8000/Ceramic");
  }
}
