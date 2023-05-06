import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { StatementsService } from 'src/app/Shared/Services/statements.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './quick-link.component.html',
  styleUrls: ['./quick-link.component.css']
})
export class QuickLinkComponent implements OnInit {
  public id:string="";
  users:any={};
  public details:any={};
  LANG:any=""
  constructor(private statement:StatementsService,private route:ActivatedRoute,private shared:SharedService) {
    const user_data=btoa(btoa("user_info_web"));
    if(localStorage.getItem(user_data) != undefined){
     
      this.users=JSON.parse(atob(atob(localStorage.getItem(user_data) || '{}')));
      
    }
    this.shared.languageChange.subscribe((path:any)=>{
      this.changeLanguage();
    })
    this.changeLanguage();
    this.route.queryParams
      .subscribe(
        (params: Params) => {
          if(params['id']){
            this.id = atob(atob(params['id']))
            this.getPageDetails();
          }
        }
    )
   }

  ngOnInit(): void {
  }

  changeLanguage(){
    if(localStorage.getItem("arabic") == "true" && localStorage.getItem("arabic") != null) {
        this.LANG=environment.arabic_translations;
    }
    else {
        this.LANG=environment.english_translations;
    }
  }
  

  getPageDetails(){
    const mydata={
      "id": this.id,
      'user_id':this.users.id
      // "country_code": this.country_code
    }
    this.statement.getPageDetails(this.id,mydata).subscribe((data:any)=>{
      if(data.status){
        this.details=data.response;
      }
    })
  }

}
