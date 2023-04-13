import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CampaignService } from '../../Services/campaign.service';
import { SharedService } from '../../Services/shared.service';
import { StatementsService } from '../../Services/statements.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  pages_list:any=[];
  LANG:any={};
  logo:string="assets/images/main-logo.png";
  logo_1:string="assets/images/main-logo1.png";
  constructor(private footer:StatementsService,private router:Router,private shared:SharedService, public campaignService:CampaignService) { 
    this.shared.languageChange.subscribe((path:any)=>{
      this.changeLanguage();
      this.getPageList();
      

    })
    this.changeLanguage();
  }

  ngOnInit(): void {
    this.getPageList();
    this.getFooter()
  }

  getPageList(){
    this.footer.getPagesList().subscribe((data:any)=>{
      if(data.status){
        this.pages_list=data.response;
      }
    })
  } 

  changeLanguage(){
    if(localStorage.getItem("arabic") == "true" && localStorage.getItem("arabic") != null) {
        this.LANG=environment.arabic_translations;
        this.logo="assets/images/main-logo-ar.png";
        this.logo_1="assets/images/main-logo1-ar.png";
    }
    else {
        this.LANG=environment.english_translations;
        this.logo="assets/images/main-logo.png";
        this.logo_1="assets/images/main-logo1.png";
    }
  }


  goToDetails(data:any){
    this.router.navigate(['/quick-link'],{ queryParams: { id: btoa(btoa(data.id))}})

  }
  investfooterDetails:any
  compdetails:any
  legalDetails:any
  raiseDetauls:any

  getFooter(){
    this.campaignService.getHomeData().subscribe((res:any)=>{
      this.investfooterDetails = res.response.footer.Invest
      
      
      this.compdetails = res.response.footer.Compp
      this.legalDetails = res.response.footer.Legal
      this.raiseDetauls = res.response.footer.Raise
    })
  }

}
