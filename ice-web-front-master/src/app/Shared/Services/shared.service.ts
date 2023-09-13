import {Injectable, EventEmitter} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})

export class SharedService {
    
    private isLoggedIn:boolean=false;
    private userInfo:any={};


    private loggedIn = new BehaviorSubject(this.isLoggedIn);
    private user_info = new BehaviorSubject(this.userInfo);
    
    languageChange = new EventEmitter();



    
    currentUserStatus =this.loggedIn.asObservable();
    
    currentUserData=this.user_info.asObservable();




    changeUserStatus(user:boolean){
        this.loggedIn.next(user);
    }


    changeUserData(data:Object){
        this.user_info.next(data);
    }


    emitLanguageChange(path: string) {
        this.languageChange.emit(path);
    }
    
        

    
}