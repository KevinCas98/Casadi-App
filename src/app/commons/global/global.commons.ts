import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalCommon {

  private baseAPiUrl: string;
  private baseWebUrl: string;



  constructor() { 
    this.baseAPiUrl = "http://localhost:8080/casadi/api/";
    this.baseWebUrl = "http://localhost:8080/casadi/web/upload/";
  }

  public getBaseApiUrl(){
    return this.baseAPiUrl;
  }

  public getBaseWebUrl(){
    return this.baseWebUrl;
  }

}
