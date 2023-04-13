import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatementsService } from 'src/app/Shared/Services/statements.service';
declare const $:any;
@Component({
  selector: 'app-user-campaign-list',
  templateUrl: './user-campaign-list.component.html',
  styleUrls: ['./user-campaign-list.component.css']
})
export class UserCampaignListComponent implements OnInit {

  campaign_list:any=[];
  subscriptions:Subscription[]=[];
  user_data:any={};
  data_loaded:boolean=false;
  constructor(private statmentsService:StatementsService,private router:Router) {
    const user_data=btoa(btoa("user_info_web"));
    if(localStorage.getItem(user_data) != undefined){
      this.user_data=JSON.parse(atob(atob(localStorage.getItem(user_data) || '{}')));
    }
  }

  ngOnInit(): void {
    this.getUserCampaigns()
  }

  getUserCampaigns(){
    this.subscriptions.push(this.statmentsService.getUserCampaigns(this.user_data.id).subscribe((res:any)=>{
      this.campaign_list=res.response;
      this.data_loaded=true;
      console.log(res)
      setTimeout(() => {   
        $('#borrowers').DataTable({
          ordering: false,
          responsive: true,
          
        });
      }, 100);
    }))
  }

  view(data:any){
    this.router.navigate(["/user-campaign-details"],{queryParams:{id:btoa(btoa(data.id))}})
    // this.router.navigate(["/profit"],{queryParams:{id:btoa(btoa(data.id))}})
  }

}
