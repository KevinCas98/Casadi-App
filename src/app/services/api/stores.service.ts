import { Injectable } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Typescript custom enum for search types (optional)
export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}


@Injectable({
  providedIn: 'root'
})
export class StoresService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public global : GlobalService, private http: HttpClient) { }

  public getListStores(): Observable<any>{
    return this.http.get<{ data: any[] }>(this.global.getBaseApiUrl()+'stores/list');
  }

  public getStoreById(id: number):Observable<any>{
    return this.http.get<{ data: any[] }>(this.global.getBaseApiUrl()+'stores/view?store='+id);
  }

}
