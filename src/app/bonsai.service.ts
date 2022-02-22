import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bonsai } from './Bonsai';

@Injectable({
  providedIn: 'root'
})
export class BonsaiService {

  constructor(private http: HttpClient) { }
  getBonsai()
  {
    return this.http.get<Bonsai[]>("http://localhost:8000/BonsaiPlants");
  }
}
