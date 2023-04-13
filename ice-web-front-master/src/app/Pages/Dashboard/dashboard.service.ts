import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {apiServiceComponent} from '../../Shared/Services/api.service';

@Injectable({
  providedIn: 'root'
})


export class DashboardService {
  private url: string =""


  constructor(public api:apiServiceComponent, public http:HttpClient) { }

  opertunityDetails(id:any){
    this.url="opportunity_detail/"+id;
    return this.api.get(this.url,"")
  }

  onPay(data:any){
    this.url ="invest"
    return this.api.post(this.url,data)
  }

//   on2Pay(data:any){
//     this.url = "https://test-anb.mtf.gateway.mastercard.com/api/rest/version/69/merchant/1050/session"
//     let headers= new HttpHeaders()
//     headers=headers.set
// (    
//     'Authorization', 'Basic bWVyY2hhbnQuMTA1MDo5MTRhYzgwYzZhOTA5MGRkYjBiNDM4ZmNhMGRhM2EyMA=='
// )    
//     return this.http.post(this.url,data,{headers})
//   }

dashDEtails(data:any){
  this.url="borrowerdashboard"
  return this.api.post(this.url,data)
}
profileDetails(data:any){
  this.url="borrower_profile"
  return this.api.post(this.url,data)
}

investorDashDetails(data:any){
  this.url= "investordashboard"
  return this.api.post(this.url,data)
}
}
