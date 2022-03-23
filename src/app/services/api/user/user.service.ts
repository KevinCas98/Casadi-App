import { Injectable } from '@angular/core';
import { GlobalCommon } from '../../../commons/global/global.commons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public global : GlobalCommon, private http: HttpClient) { }

  public registerUser(formData: FormData):Observable<any>{
    return this.http.post<{ data: any[] }>(this.global.getBaseApiUrl()+'users/register', formData)
  }

  public loginUser(formData: FormData):Observable<any>{
    return this.http.post<{ data: any[] }>(this.global.getBaseApiUrl()+'users/login', formData)
  }

}
