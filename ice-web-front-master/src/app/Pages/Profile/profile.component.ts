import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  subscriptions: Subscription[] = [];
  user_data:any={};
  LANG: any = {};


  constructor(private shared: SharedService) { 
    const user_data=btoa(btoa("user_info_web"));
    if(localStorage.getItem(user_data) != undefined){
      this.user_data=JSON.parse(atob(atob(localStorage.getItem(user_data) || '{}')));
    }
    this.subscriptions.push(this.shared.languageChange.subscribe((path: any) => {
      this.changeLanguage();
    }))
    this.changeLanguage();
  }
  changeLanguage() {
    if (localStorage.getItem("arabic") == "true" && localStorage.getItem("arabic") != null) {
      this.LANG = environment.arabic_translations;
    }
    else {
      this.LANG = environment.english_translations;
    }
  }
  ngOnInit(): void {
    
  }

  

}
