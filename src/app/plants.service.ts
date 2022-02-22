import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plants } from './Plants';

@Injectable({
  providedIn: 'root'
})
export class PlantsService {

  constructor(private http:HttpClient) { }
  
  getPlants()
  {
    return this.http.get<Plants[]>("http://localhost:3000/getPlants");
  }
  
}
