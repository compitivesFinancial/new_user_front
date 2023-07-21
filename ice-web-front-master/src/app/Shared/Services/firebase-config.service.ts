import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConfigService {
 private apiKey:string = "AIzaSyB7l5QmXf9pxwW2RZxLHQ2VtLJtL2K8OCY";
 private authDomain:string = "aaaa-6d056.firebaseapp.com";
 private  databaseURL:string =  "https://aaaa-6d056-default-rtdb.firebaseio.com";
 private  projectId:string =  "aaaa-6d056";
 private storageBucket:string =  "aaaa-6d056.appspot.com";
 private messagingSenderId:string =  "1021417514491";
 private appId:string =  "1:1021417514491:web:22abc3ab52fbafe486d75e";
 private measurementId:string = "G-GEMW853ESY";
  constructor(
  ) { }
}
