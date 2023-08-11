import { Component } from '@angular/core';
import { Router, NavigationStart  } from '@angular/router';
import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { FirebaseConfigService } from './Shared/Services/firebase-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ice-web';
  path = ""

  constructor(public router: Router,
    public firebaseConfigService :FirebaseConfigService){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.path=event.url.split("?")[0];
      }
    });
    firebase.initializeApp(this.firebaseConfigService.firebaseConfig);
  }
}
