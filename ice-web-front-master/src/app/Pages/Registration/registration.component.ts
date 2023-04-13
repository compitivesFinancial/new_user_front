import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { registration_data } from 'src/app/Shared/Models/registration.model';
import { errorHandlerService } from 'src/app/Shared/Services/errorHandler.service';
import { LoginService } from 'src/app/Shared/Services/login.service';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})




export class RegistrationComponent implements OnInit {
  err:boolean=false;
  load:boolean=false;
  registration_error:any={};
  first_name:string="";
  user_name:string="";
  // display_mobile_number:string="";
  last_name:string="";
  email:string="";
  password:string="";
  confirm_password:string="";
  mobile_number:string="";
  country_code: string="+966"; 
  role_type:string="3";
  subscriptions:Subscription[]=[]
  terms:boolean=false;
  number=[1,2,3,4,5,6];
  weakness=0;
  registration_type:any={"registration_type":"1"};
  LANG:any="";
  email_disable:boolean=false;
  registrationForm: any;

  constructor(private toast: ToastrService,private router:Router,private route:ActivatedRoute,private loginService:LoginService,private shared:SharedService,private error:errorHandlerService,public fb: FormBuilder) {
    this.subscriptions.push(this.shared.languageChange.subscribe((path:any)=>{
      this.changeLanguage();
    }))
    this.changeLanguage();
    const a:any=this.router.getCurrentNavigation()!.extras!.state;
    if(a){
        this.email=a.email;
        this.email_disable=true;
        // this.country_code=a.country_code;
        // this.display_mobile_number=`${this.country_code} ${this.mobile_number}`;

    }
    this.subscriptions.push(this.route.queryParams
      .subscribe(
        (params: Params) => {
          if(params['type']){
            this.role_type = atob(atob(params['type']))
            console.log(`THIS TYPE OF USER IS ${this.role_type}`);
          }
        }
    ))
    // else{
    //     this.router.navigate(['/login']);
    // }
    
  }
  public requestId:any
  orderby:any

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      reportInjury: [this.LANG.Individual, [Validators.required]]
    })
    
    // this.requestId = ;
    // console.log((this.route.snapshot.params['type']));
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.orderby = params['type'];
        console.log(this.orderby); // price
      }
    );
  }

  changeLanguage(){
    if(localStorage.getItem("arabic") == "true" && localStorage.getItem("arabic") != null) {
        this.LANG=environment.arabic_translations;
    }
    else {
        this.LANG=environment.english_translations;
    }
  }

  register(){
    if(this.load) return;
    this.err=false;
    this.resetError();
    this.registerErrorHandler();
    if(!this.err){
      if(!this.terms){
         this.toast.warning("Please agree to the terms & conditions and privacy policy.");
         return
      }
      this.load=true;
      this.registerUser();
      return
      
    }
}

changeUserType(type:string){
  this.role_type=type
}

resetError(){
  this.registration_error={
    "first_name":false,
    "user_name":false,
    "last_name":false,
    "email_id":false,
    "email_id_valid":false,
    "mobile_number":false,
    "mobile_number_valid":false,
    "password":false,
    "password_valid":false,
    "confirm_password":false,
    "password_match":false,
    "confirm_password_valid":false,
    "registration_type":false
  }
}

  registerUser(){
    const data:registration_data={
        "country_code": this.country_code,
        "mobile_number": this.mobile_number,
        "email": this.email,       
        "username": this.user_name,       
        // "name": `${this.first_name} ${this.last_name}`,
        "name": `${this.first_name}`,
        "password": this.loginService.encryptPassword(this.password),
        // "password": this.password,
        "role_type": this.role_type,
        "registration_type":this.registration_type.registration_type
      }
      this.subscriptions.push(this.loginService.register(data).subscribe((result:any)=>{
        this.load=false;
        if(result.status){
            localStorage.setItem("logged_in", btoa("1"));
            localStorage.setItem("token", result?.response?.token);
            localStorage.setItem(btoa(btoa(("user_info_web"))), btoa(btoa(JSON.stringify(result.response))));
            this.shared.changeUserStatus(true);
            this.shared.changeUserData(result.response);
            this.toast.success("Registration Successfull! Welcome "+result.response.name,"");
            // this.toast.success(result.response.message,"")
            this.router.navigate(["/add-kyc"])

            // this.router.navigate(["/add-kyc"],{queryParams:{type:btoa(btoa(result.response.role_type.toString()))}})

            return
        }
        this.toast.warning(result.response.message,"")
        
      },respagesError => {
        this.load=false;
        const error = this.error.getError(respagesError);
        if(error == "Gateway timeout"){
          return
        }
        this.toast.error(error,"Error")
      }));
}

valueonChange:any
onItemchange(value:any){
  this.valueonChange= value.target.value
  console.log(this.valueonChange);
  
  
}


registerErrorHandler(){
    if(this.first_name == "" || this.first_name == undefined){
        this.registration_error.first_name=true;
        this.err=true;
    }

    if(this.user_name == "" || this.user_name == undefined){
      this.registration_error.user_name=true;
      this.err=true;
    }

    // if(this.last_name == "" || this.last_name == undefined){
    //   this.registration_error.last_name=true;
    //   this.err=false;
    // }
  this.mobileErrorHandler();

    if(this.email == "" || this.email == undefined){
      this.registration_error.email_id=true; 
      this.err=true;
    }

    if(!this.registration_error.email_id && this.checkEmail(this.email)){
      this.registration_error.email_id_valid=true;
      this.err=true;
    }

    if(this.registration_type == "" || this.registration_type == undefined){
      this.registration_error.registration_type=true;
      this.err=true;
  }
    this.passwordErrorHandler();
  }

   mobileErrorHandler(){
    if(this.mobile_number == ""  || this.mobile_number == undefined){
      this.registration_error.mobile_number=true;	
      this.err=true;
    }
    if(this.country_code == "+966"){
      const re=/^([0]{1}[5]{1}[0-9]*)$/
      const re1=/^([5]{1}[0-9]*)$/
      if(!this.registration_error.mobile_number && !re.test(this.mobile_number) && !re1.test(this.mobile_number)){
        this.registration_error.mobile_number_valid=true;	
        this.err=true;
      }
  
      if(!this.registration_error.mobile_number && re.test(this.mobile_number) && this.mobile_number.length != 10){
        this.registration_error.mobile_number_valid=true;
        this.err=true;	
      }
  
      if(!this.registration_error.mobile_number && re1.test(this.mobile_number) && this.mobile_number.length != 9){
        this.registration_error.mobile_number_valid=true;
        this.err=true;	
      }
      return
    }
    if(this.country_code == "+91"){
      if(this.registration_error.mobile_number == false && this.mobile_number.length != 10){
        this.registration_error.mobile_number_valid=true;
        this.err=true;	
      }
      return
    }
    if(this.registration_error.mobile_number == false && (this.mobile_number.length < 8 || this.mobile_number.length > 10)){
      this.registration_error.mobile_number_valid=true;
      this.err=true;	
    }
  }

  changeCountryCode(){
    this.registration_error.mobile_number_valid=false;
  }

  passwordErrorHandler(){
    if(this.password == "" || this.password == undefined){
      this.registration_error.password=true;
      this.err=true;
    }

    this.checkPasswordValidation();

    

    if(this.confirm_password == "" || this.confirm_password == undefined){
      this.registration_error.confirm_password=true;	
      this.err=true;
    }


    if(!this.registration_error.password && this.confirm_password == ""){
      this.registration_error.confirm_password=true;	
      this.err=true;
    }

    if(this.password != this.confirm_password && !this.registration_error.confirm_password){
        this.registration_error.password_match=true;	
        this.err=true;
    }
  }


  checkEmail(email:string){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email)
  }

  checkPassword(password:string){
    if(password.length < 8){
        return true
    }
    return
  } 

  checkPasswordValidation(){
    
    var lowerCaseLetters = /[a-z]/g;
    if(this.password.match(lowerCaseLetters)) {  
      this.registration_error.password_lower_case=false;
    } else {
      this.registration_error.password_lower_case=true;

    }
    
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(this.password.match(upperCaseLetters)) {  
      this.registration_error.password_upper_case=false;

    } else {
      this.registration_error.password_upper_case=true;

    }
  
    // Validate numbers
    var numbers = /[0-9]/g;
    if(this.password.match(numbers)) {  
      this.registration_error.password_number=false;

    } else {
      this.registration_error.password_number=true;

    }
    
    if(this.password.length >= 8) {
      this.registration_error.password_length=false;

    } else {
      this.registration_error.password_length=true;
    }

    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(specialChars.test(this.password)) {
      this.registration_error.password_special=false;
    } else {
      this.registration_error.password_special=true;
    }

    this.registration_error.password_valid=true;

    if(this.password.length > 7 && this.password.length < 12 && !this.registration_error.password_special && !this.registration_error.password_number && !this.registration_error.password_upper_case && !this.registration_error.password_lower_case){
      this.weakness=4;
      this.registration_error.password_valid=false;
    }

    if(this.password.length > 12 && !this.registration_error.password_special && !this.registration_error.password_number && !this.registration_error.password_upper_case && !this.registration_error.password_lower_case){
      this.weakness=6
    }

    if(this.password.length > 2 && this.password.length < 4){
      this.weakness=2;
    }
    if(this.password.length > 0 && this.password.length < 2){
      this.weakness=1;
    }
    if(this.password.length == 0){
      this.weakness=0;
    }
  }

  passwordVisibility(id:string,icon_id:string){
    var input = document.getElementById(id) as HTMLInputElement;
    var icon = document.getElementById(icon_id) as HTMLElement;
    console.log(id)
    if (input.type == "password") {
      input.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    } 
  }

  onlyNumbers(event:any){
    var keycode = (event.which) ? event.which : event.keyCode;
    if ((keycode < 48 || keycode > 57) && keycode !== 13 || keycode == 46) {
      event.preventDefault();
      return false;
    } 
    return   
  }

  public termsandconditionborower:any
  termsCondition(){
    this.loginService.termsandCondition().subscribe((res:any)=>{
      this.termsandconditionborower = res.response
    })
  }

}
