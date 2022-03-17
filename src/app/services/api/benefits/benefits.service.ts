import { Injectable } from '@angular/core';
import { GlobalCommon } from '../../../commons/global/global.commons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BenefitsService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public global : GlobalCommon, private http: HttpClient) { }

  public setRecordBenefits(formData: FormData):Observable<any>{
    return this.http.post<{ data: any[] }>(this.global.getBaseApiUrl()+'record_benefits/record', formData)
  }

  public getListBenefitsByUser(id: number):Observable<any>{
    return this.http.get<{ data: any[] }>(this.global.getBaseApiUrl()+'benefits/list?type=users&id='+id)
  }
  
}
