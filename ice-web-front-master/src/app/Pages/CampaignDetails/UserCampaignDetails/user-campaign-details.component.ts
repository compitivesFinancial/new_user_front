import { Component, OnInit } from '@angular/core';
import { StatementsService } from 'src/app/Shared/Services/statements.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  templateUrl: './user-campaign-details.component.html',
  styleUrls: ['./user-campaign-details.component.css']
})
export class UserCampaignDetailsComponent implements OnInit {
  campaign_details:any={};
  subscriptions:Subscription[]=[];
  data_loaded:boolean=false;
  id:string="";
  
  constructor(private statmentsService:StatementsService,private route:ActivatedRoute) {
    this.subscriptions.push(this.route.queryParams
      .subscribe(
        (params: Params) => {
          if(params['id']){
            this.id = atob(atob(params['id']));
            this.getUserCampaigns();
          }
        }
    ))
  }

  ngOnInit(): void {
  }

  getUserCampaigns(){
    this.subscriptions.push(this.statmentsService.getUserCampaignDetails(this.id).subscribe((res:any)=>{
      this.campaign_details=res.response;
      this.data_loaded=true;
      console.log(res)
      
    }))
  }


}
