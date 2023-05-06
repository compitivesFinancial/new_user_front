import {Injectable} from '@angular/core';
import SHA1 from 'sha1';

@Injectable({providedIn: 'root'})
export class configServiceComponent{

  	HOST : string = "http://localhost/cfc/admin_laravel/web_api/public/api/";
	ADMIN_HOST : string = "http://localhost/cfc/admin_laravel/admin/public/api/";
	//  HOST : string = "http://www.atam-mena.com/web_api/public/api/";
	//  ADMIN_HOST : string = "http://www.atam-mena.com/admin/public/api/";
	



	USERID : string = "	";
	USERNAME : string = "user@quickfix";
	PASSWORD : string = "JpYXQiOjE1OTU1MDc5MT";



	 constructor(){}


	getHOST(){
		return this.HOST;
	}

	getAdminHOST(){
		return this.ADMIN_HOST;
	}

	getAuthHeaders(routeUrl :any){
		let finalAuth = SHA1(this.HOST + routeUrl +"|"+ this.USERNAME +"|"+ this.PASSWORD);
		return finalAuth
	}
}
