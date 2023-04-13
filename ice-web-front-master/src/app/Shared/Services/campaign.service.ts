import {Injectable} from '@angular/core';

import {apiServiceComponent} from '../Services/api.service';




@Injectable({providedIn: 'root'})
export class CampaignService{
    private url : string = "";

	constructor(private api : apiServiceComponent){
    }


    addCampaign(data:Object){
        this.url = "add_campaign";
		return this.api.post(this.url, data);
    }
    


    getUserKycList(){
        this.url = "show_userkyc";
		return this.api.get(this.url, "");
    }

    addKyc(data:Object){
        this.url = "modify_userkyc";
		return this.api.post(this.url, data);
    }


    getProductList(){
        this.url = "product_list";
		return this.api.get(this.url, "");
    }

    getCampaignList(user_id?:number){
        this.url = "list_campaign";
        if(user_id){
            this.url = "user_campaign_borrower/"+user_id;
        }
		return this.api.get(this.url, "");
    }

    getCampaignDetails(id:string){
        this.url = `get_campaign_by_id/${id}`;
		return this.api.get(this.url, "");
    }

    invest(data:object){
        this.url = "invest";
		return this.api.post(this.url, data);
    }

    investorDashboard(data:object,type?:number){
        this.url = "borrowerdashboard";
        if(type){
            this.url = "investordashboard";
        }
		return this.api.post(this.url, data);
    }

    getHomePage(){
        this.url = "total_raised";
		return this.api.get(this.url, "");
        
    }

    getHomeData(){
        this.url = "home_page_api";
		return this.api.get(this.url,"");
    }

    contactUs(data:object){
        this.url = "contact_us";
		return this.api.post(this.url, data);
        
    }

    investmentOppertunity(){
        this.url ="list_campaignoutside";
        return this.api.get(this.url,"")
    }

    upcomingInvesmentOppertunity(){
        this.url ="list_withoutpublishoutside"
        return this.api.get(this.url,"")
    }

    verifyCrNumber(id:any){
        this.url ="checkcrnumber/"+id
      return  this.api.get(this.url,"")
    }
    

    
}