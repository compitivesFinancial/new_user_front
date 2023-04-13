import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Shared/Services/login.service';
import { Subscription } from 'rxjs';
import { CampaignService } from 'src/app/Shared/Services/campaign.service';
import { environment } from 'src/environments/environment';
import { type } from 'os';
import { DashboardService } from './dashboard.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
// import { Toast } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user_info:any={};
  user_data:any={};
  dashboard_data:any={};
  subscriptions:Subscription[]=[];
  LANG=environment.english_translations
  opertunityDetailList:any
  requestId:any
  public teams:any
  public campaign_images:any
  public amountForm:FormGroup
  public cardDetailsForm:any
  

  constructor(private loginService:LoginService,private campaignService:CampaignService,public dashboardService:DashboardService,private route:ActivatedRoute, private formBuilder: FormBuilder, public router:Router,private toast:ToastrService) { 
    const user_data=btoa(btoa("user_info_web"));
    if(localStorage.getItem(user_data) != undefined){
      this.user_data=JSON.parse(atob(atob(localStorage.getItem(user_data) || '{}')));
    }

    this.amountForm = this.formBuilder.group({
      'amount':['',Validators.required]
    })

    this.cardDetailsForm = this.formBuilder.group({
      'cardNumber':['',Validators.required],
      'carddate':['',Validators.required]
    })
  }

  ngOnInit(): void {
    if(this.user_data.role_type == 2){
      this.getProfileDetails(1);
      this.getDashboardDetails(1);
      this.requestId = atob(this.route.snapshot.params['id']);
      if(this.requestId!=null ){
        this.getOpertunityDetails(1)
      }
      return
    }
    this.getProfileDetails();
    this.getDashboardDetails();
    
    this.requestId = atob(this.route.snapshot.params['id']);
    if(this.requestId!=null ){
      this.getOpertunityDetails()
    }

  }

  changeLanguage(){
    if(localStorage.getItem("arabic") == "true" && localStorage.getItem("arabic") != null) {
        this.LANG=environment.arabic_translations;
    }
    else {
        this.LANG=environment.english_translations;
    }
  }

  getProfileDetails(type?:number){
    const data={id:this.user_data.id}
    this.subscriptions.push(this.loginService.getProfileDetails(data,type).subscribe((res:any)=>{
      if(res.status){
        this.user_info=res.response
      }
      
    }))
    
  }

  getDashboardDetails(type?:number){
    const data={user_id:this.user_data.id}
    this.subscriptions.push(this.campaignService.investorDashboard(data,type).subscribe((res:any)=>{
      this.dashboard_data=res.response.data
      
    }))
    
  }

  getOpertunityDetails(type?:number){
    this.dashboardService.opertunityDetails(this.requestId).subscribe((res:any)=>{
      this.opertunityDetailList = res.response.campaign
      this.teams = res.response.campaign.team
      this.campaign_images = res.response.campaign.campaign_images
    })
  } 
onPaydetails:any
  onPay(){
    if (this.amountForm.valid){
      let data = {
        'amount':this.amountForm.value.amount,
        'invester_id':this.user_data.id,
        'campaign_id':this.requestId

      }

      this.dashboardService.onPay(data).subscribe((res:any)=>{
        this.onPaydetails= res.response.session_id
        this.toast.success(res.response.message)
        // $('#modalwindow').modal('hide');

        console.log(this.onPaydetails);
        // this.router.navigateByUrl(`payment/${btoa(this.onPaydetails)}`)
        
      })
    }
  }
public PaymentSession:any
   pay() {
    // UPDATE THE SESSION WITH THE INPUT FROM HOSTED FIELDS
    this.PaymentSession.updateSessionFromForm('card');
}

details()
{
  this.PaymentSession.configure({
  session: this.onPaydetails,
  fields: {
      // ATTACH HOSTED FIELDS TO YOUR PAYMENT PAGE FOR A CREDIT CARD
      card: {
          number: "#card-number",
          securityCode: "#security-code",
          expiryMonth: "#expiry-month",
          expiryYear: "#expiry-year",
          nameOnCard: "#cardholder-name"
      }
  },
  //SPECIFY YOUR MITIGATION OPTION HERE
  frameEmbeddingMitigation: ["javascript"],
  callbacks: {
      initialized: (response:any)=> {
          // HANDLE INITIALIZATION RESPONSE
      },
      formSessionUpdate: function(response: any) {
          // HANDLE RESPONSE FOR UPDATE SESSION
          if (response.status) {
              if ("ok" == response.status) {
                  console.log("Session updated with data: " + response.session.id);

                  //check if the security code was provided by the user
                  if (response.sourceOfFunds.provided.card.securityCode) {
                      console.log("Security code was provided.");
                  }

                  //check if the user entered a Mastercard credit card
                  if (response.sourceOfFunds.provided.card.scheme == 'MASTERCARD') {
                      console.log("The user entered a Mastercard credit card.")
                  }
              } else if ("fields_in_error" == response.status)  {

                  console.log("Session update failed with field errors.");
                  if (response.errors.cardNumber) {
                      console.log("Card number invalid or missing.");
                  }
                  if (response.errors.expiryYear) {
                      console.log("Expiry year invalid or missing.");
                  }
                  if (response.errors.expiryMonth) {
                      console.log("Expiry month invalid or missing.");
                  }
                  if (response.errors.securityCode) {
                      console.log("Security code invalid.");
                  }
              } else if ("request_timeout" == response.status)  {
                  console.log("Session update failed with request timeout: " + response.errors.message);
              } else if ("system_error" == response.status)  {
                  console.log("Session update failed with system error: " + response.errors.message);
              }
          } else {
              console.log("Session update failed: " + response);
          }
      }
  },
  interaction: {
      displayControl: {
          formatCard: "EMBOSSED",
          invalidFieldCharacters: "REJECT"
      }
  }
});
}

  
 

 

}
