import {Injectable} from '@angular/core';

import {apiServiceComponent} from '../Services/api.service';




@Injectable({providedIn: 'root'})
export class StatementsService{
    private url : string = "";

	constructor(private api : apiServiceComponent){
    }


    getStatements(data:Object){
        this.url = "borrower_statement";
		return this.api.post(this.url, data);
    }

    getProfits(data:Object){
        this.url = "invester_statement";
		return this.api.post(this.url, data);
    }

    getUserCampaigns(user_id:string){
        this.url = "user_campaign/"+user_id;
		return this.api.get(this.url, "");
    }

    getUserCampaignDetails(id:string){
        this.url = "opportunity_detail/"+id;
		return this.api.get(this.url, "");
    }

    payLoan(data:Object){
        this.url = "payloan";
		return this.api.post(this.url, data); 
    }

    getInvestorWallet(data:Object){
        this.url = "invester_wallet";
		return this.api.post(this.url, data);
    }
    getBorrowersWallet(data:Object){
        this.url = "borrower_wallet";
		return this.api.post(this.url,data);
    }

    getPagesList(){
        this.url = "footer";
		return this.api.get(this.url,"");
    }

    getPageDetails(id:string){
        this.url = `get_page_by_id/${id}`;
		return this.api.get(this.url,"");
    }


   

    

    
}