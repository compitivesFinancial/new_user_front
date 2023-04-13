import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { CampaignService } from 'src/app/Shared/Services/campaign.service';
import { SettingService } from './setting.service';
declare const $:any;
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  user_data:any={};
  dashboard_data:any={};
  public totalDetails:any
  public investorDetails:any
  public walletFund:any
  walletFundBorower:any
  amount:any =''

  
  constructor(private campaignService:CampaignService, public setingservice: SettingService, public router:Router, public toast:ToastrService) { 
    const user_data=btoa(btoa("user_info_web"));
    if(localStorage.getItem(user_data) != undefined){
      this.user_data=JSON.parse(atob(atob(localStorage.getItem(user_data) || '{}')));
    }
  }

  ngOnInit(): void {


    $('.chart').easyPieChart({
      easing: 'easeOutElastic',
      delay: 3000,
      barColor: '#00C48A',
      trackColor: '#DBF8EE',
      scaleColor: false,
      lineWidth: 5,
      trackWidth: 2,
      size: 125,
      lineCap: 'round',
      onStep: function (from:any, to:any, percent:any) {
          this.el.children[0].innerHTML = Math.round(percent);
      }
  });


  if(this.user_data.role_type == 3){
  this.TotalDetails()
  }

  if(this.user_data.role_type == 2){
    this.getInvestorDEtails()
  }

  this.getDashboardDetails()

  }

  getPercent(a:any, b:any){
      return (a/b)*100;
  }

  getDashboardDetails(type?:number){
          const data={user_id:this.user_data.id}
          this.campaignService.investorDashboard(data,type).subscribe((res:any)=>{
            this.dashboard_data=res.response.data.investor_id
            
          })
          
        }

  TotalDetails(){

    this.setingservice.walletDashboard(this.user_data.id).subscribe((res:any)=>{
    this.totalDetails= res.response.active_funds   
      this.walletFundBorower = res.response
    console.log(this.totalDetails);
    
          })
        }
public roundof:any
        roundOF(a:any){
        return  Math.round((a + Number.EPSILON) * 100) / 100
          
          
          
        }

        navToDetails(opertunityDetailList:any){
          if(opertunityDetailList.id>0){
          this.router.navigateByUrl(`/operationdetails/${btoa(opertunityDetailList.id)}`)
          }
        }

        navToDetailsInvest(opertunityDetailList:any){
          if(opertunityDetailList>0){
          this.router.navigateByUrl(`/operationdetails/${btoa(opertunityDetailList)}`)
          }
        }


        getInvestorDEtails(){
          this.setingservice.investorDetails(this.user_data.id).subscribe((res:any)=>{
            this.investorDetails = res.response.active_funds
            this.walletFund = res.response
            // console.log(this.investorDetails);
            
          })
        }


        addmoney(){
          let data ={
            'invester_id':this.user_data.id,
            'amount':this.amount
          }
          this.setingservice.addmoney(data).subscribe((res:any)=>{
            this.toast.success(res.response.message)
            this.ngOnInit()
          })
        }
       

}
