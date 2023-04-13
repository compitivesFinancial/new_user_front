import {Injectable} from '@angular/core';
import * as md5 from 'md5'

import {apiServiceComponent} from '../Services/api.service';




@Injectable({providedIn: 'root'})
export class LoginService{
    private url : string = "";

	constructor(private api : apiServiceComponent){
    }

    encryptPassword(password : any ){
		return md5(password);
	}



    register(data:Object){
        this.url = "register";
		return this.api.post(this.url, data);
    }

    checkMobile(data:Object){
        this.url="check_mobile";
        return this.api.post(this.url, data);
    }

    userLogin(data:Object){
        this.url = "login";
		return this.api.post(this.url, data);
    }

    logout(){
        this.url = "logout";
        let query=""
		return this.api.post(this.url, query);   
    }

    search(data:Object){
        this.url = "search";
		return this.api.post(this.url, data);   
    }

    loginWithOtp(data:object){
        this.url = "login_verify_otp";
		return this.api.post(this.url, data);
    }

    sendOtp(data:object){
        this.url = "send_otp";
		return this.api.post(this.url, data);
    }

    verifyOtp(data:object){
        this.url = "verify_otp";
		return this.api.post(this.url, data);
    }

    getProfileDetails(data:object,type?:number){
        this.url = "borrower_profile";
        if(type == 1){
            this.url = "invester_profile";
        }
		return this.api.post(this.url, data);
    }

    termsandCondition(){
        this.url = "get_page_by_idoutside/3"
        return this.api.get(this.url,"")
    }

    profileEdit(data:any){
        this.url ="borrower_profile_update"
        return this.api.post(this.url,data)
    }   

    changePassword(data:any){
        this.url ="borrower_password_update"
        return this.api.post(this.url,data)
    }   

    

    
}