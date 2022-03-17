import { Injectable } from '@angular/core';
import { GlobalCommon } from '../../../commons/global/global.commons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class StoresService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public global : GlobalCommon, private http: HttpClient) { }

  public getListStores(): Observable<any>{
    return this.http.get<{ data: any[] }>(this.global.getBaseApiUrl()+'stores/list');
  }

  public getStoreById(id: number):Observable<any>{
    return this.http.get<{ data: any[] }>(this.global.getBaseApiUrl()+'stores/view?store='+id);
  }

}
