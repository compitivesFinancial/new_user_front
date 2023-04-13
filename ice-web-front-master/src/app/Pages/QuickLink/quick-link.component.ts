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
  constructor(private statement:StatementsService,private route:ActivatedRoute) {
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
    this.statement.getPageDetails(this.id).subscribe((data:any)=>{
      if(data.status){
        this.details=data.response;
      }
    })
  }

}
