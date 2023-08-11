import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConfigService {
  constructor() { }
   firebaseConfig:any ={
    apiKey: "AIzaSyB7l5QmXf9pxwW2RZxLHQ2VtLJtL2K8OCY",
    authDomain: "aaaa-6d056.firebaseapp.com",
    //authDomain: "https://www.cfc.sa",
    databaseURL: "https://aaaa-6d056-default-rtdb.firebaseio.com",
    projectId: "aaaa-6d056",
    storageBucket: "aaaa-6d056.appspot.com",
    messagingSenderId: "1021417514491",
    appId: "1:1021417514491:web:22abc3ab52fbafe486d75e",
    measurementId: "G-GEMW853ESY"
  }
}
