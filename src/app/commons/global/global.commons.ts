import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalCommon {

  private baseAPiUrl: string;
  private baseWebUrl: string;



  constructor() { 
    this.baseAPiUrl = "https://seditlacalera.com.ar/casadi/api/";
    this.baseWebUrl = "https://seditlacalera.com.ar/casadi/web/upload/";
  }

  public getBaseApiUrl(){
    return this.baseAPiUrl;
  }

  public getBaseWebUrl(){
    return this.baseWebUrl;
  }

}
