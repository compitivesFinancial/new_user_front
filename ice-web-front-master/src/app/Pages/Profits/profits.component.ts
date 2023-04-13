import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatementsService } from 'src/app/Shared/Services/statements.service';
declare const $:any;

@Component({
  selector: 'app-profits',
  templateUrl: './profits.component.html',
  styleUrls: ['./profits.component.css']
})
export class ProfitsComponent implements OnInit {
  profit_list:any=[];
  subscriptions:Subscription[]=[];
  campaign_id:string=""

  constructor(private statmentsService:StatementsService,private route:ActivatedRoute) {
    
    this.subscriptions.push(this.route.queryParams
      .subscribe((params:Params)=>{
        if(params['id']){
          this.campaign_id = atob(atob(params['id']));
          this.getProfits()

        }
      }))
  }

  ngOnInit(): void {
  }

  getProfits(){
    const data={campaign_id:this.campaign_id}
    this.subscriptions.push(this.statmentsService.getProfits(data).subscribe((res:any)=>{
      this.profit_list=res.response;
      setTimeout(() => {   
        $('#borrowers').DataTable({
          ordering: false,
          responsive: true,
          
        });
      }, 100);
    }))
  }

}
