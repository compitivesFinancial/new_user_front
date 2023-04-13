import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../Dashboard/dashboard.service';

@Component({
  selector: 'app-dashboarddetails',
  templateUrl: './dashboarddetails.component.html',
  styleUrls: ['./dashboarddetails.component.css']
})
export class DashboarddetailsComponent implements OnInit {
  user_data:any={};

  constructor( public dashBoardService: DashboardService) { 
    const user_data=btoa(btoa("user_info_web"));
    if(localStorage.getItem(user_data) != undefined){
      this.user_data=JSON.parse(atob(atob(localStorage.getItem(user_data) || '{}')));
    }
  }

  ngOnInit(): void {
  if(this.user_data.role_type==2){
    this.investorDashdetails()
    this.profile()
  }
  if(this.user_data.role_type==3)
  {  this.dashDetails()
    this.profile()}
  }
  public dashDetailsList:any
  public profileDetails:any
  public invesorDashDetails:any

  dashDetails(){
    let data= {
      'user_id':this.user_data.id
    }
    this.dashBoardService.dashDEtails(data).subscribe((res:any)=>{
      this.dashDetailsList = res.response.data
    })
  }
  roundOF(a:any){
    return  Math.round((a + Number.EPSILON) * 100) / 100
      
      
      
    }

  profile(){
    let data= {
      'id':this.user_data.id
    }
    this.dashBoardService.profileDetails(data).subscribe((res:any)=>{
      this.profileDetails= res.response
      console.log(this.profileDetails);
      
    })
  }
spreadO:any
  investorDashdetails(){
    let data ={
      'user_id':this.user_data.id
    }
    this.dashBoardService.investorDashDetails(data).subscribe((res:any)=>{
      this.invesorDashDetails= res.response.data
      // const numberClone = this.invesorDashDetails.total_investment
      
      
       
    })

  }

}
