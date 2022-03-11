import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private baseAPiUrl: string;

  constructor() { 
    this.baseAPiUrl = "http://localhost:8080/casadi/api/";
  }

  public getBaseApiUrl(){
    return this.baseAPiUrl;
  }

}