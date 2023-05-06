import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StatementsService } from 'src/app/Shared/Services/statements.service';

@Component({
  selector: 'app-quick-link',
  templateUrl: './quick-link.component.html',
  styleUrls: ['./quick-link.component.css']
})
export class QuickLinkComponent implements OnInit {
  public id:string="";
  public details:any={};
  users:any={};
  constructor(private statement:StatementsService,private route:ActivatedRoute) {
    const user_data=btoa(btoa("user_info_web"));
    if(localStorage.getItem(user_data) != undefined){
     
      this.users=JSON.parse(atob(atob(localStorage.getItem(user_data) || '{}')));
      
    }
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
