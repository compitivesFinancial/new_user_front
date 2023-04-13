import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investmentdetails',
  templateUrl: './investmentdetails.component.html',
  styleUrls: ['./investmentdetails.component.css']
})
export class InvestmentdetailsComponent implements OnInit {
public requestId:any
public investmentDetailsList:any
public investorDetails:any
  constructor(private route:ActivatedRoute,public investmentservice:InvestmentService,public router:Router) { }

  ngOnInit(): void {
    this.requestId = atob(this.route.snapshot.params['id']);
    if(this.requestId!=null ){
      this.investmentDetails()
      
    }
  }

  investmentDetails(){
    this.investmentservice.opertunityDetails(this.requestId).subscribe((res:any)=>{
      this.investmentDetailsList=res.response.campaign
      this.investorDetails = res.response.received_investment
    })
  }

  percantageInvestment(a:number,b:number){
    return(`${(a/b)*100}`)
  }

  navTo(){
    if(this.requestId!= null ){
      
      
      this.router.navigateByUrl(`/dashboard/${btoa(this.requestId)}`)
    }
  }
  }




