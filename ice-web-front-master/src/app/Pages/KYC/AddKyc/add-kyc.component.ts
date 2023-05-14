import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CampaignService } from 'src/app/Shared/Services/campaign.service';
import { FieldType } from 'src/app/Shared/Enums';
import firebase from 'firebase/app';
import 'firebase/storage';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from 'src/app/Shared/Services/login.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { data } from 'jquery';
import { findLast } from '@angular/compiler/src/directive_resolver';
import { LkServiceService } from 'src/app/Shared/Services/lk-service.service';
import { Bank } from 'src/app/Shared/Models/bank';
import { Identity } from 'src/app/Shared/Models/identity';
import { Gender } from 'src/app/Shared/Models/gender';
import { FundUse } from 'src/app/Shared/Models/fund-use';
import { MaritalStatus } from 'src/app/Shared/Models/marital-status';
import { Education } from 'src/app/Shared/Models/education';
import { JobStatus } from 'src/app/Shared/Models/job-status';
import { lookupService } from 'dns';
import { Console } from 'console';
import { YaqeenService } from 'src/app/Shared/Services/yaqeen.service';
import { YaqeenData } from 'src/app/Shared/Models/YaqeenData';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-add-kyc',
  templateUrl: './add-kyc.component.html',
  styleUrls: ['./add-kyc.component.css']
})
export class AddKycComponent implements OnInit, OnChanges {
  err: boolean = false;
  load: boolean = false;
  kyc_form: any = [];
  field_types = FieldType;
  subscriptions: Subscription[] = [];
  data_loaded: boolean = false;
  image_count: number = 0;
  uploaded_count: number = 0;
  post_data: any = [];
  upload_called: boolean = false;
  user_type!: string;
  user_data: any = {};
  user_details: any = {};
  type!: number;
  disabled_inputs: boolean = false;
  LANG: any = {}
  tab_index: number = 0;
  public crname: string = ''
  expiryDate: any
  issueDate: any
  businessType: any
  crEntityNumber: any

  //added By Qaysar For updating the page with dynamic list
  public yaqeenArName: any = ''
  public yaqeenEnName: any = ''
  // yaqeenArName: Subject<string> = new BehaviorSubject<string>(``);
  // yaqeenEnName: Subject<string> = new BehaviorSubject<string>(``);
  identityList: Identity[] = [];
  genderList: Gender[] = [];
  banksList: Bank[] = [];
  fundUseList: FundUse[] = [];
  maritalStatusList: MaritalStatus[] = [];
  educationList: Education[] = [];
  jobStatusList: JobStatus[] = [];
  yearsHijri: number[] = [];
  monthsHijri: string[] = [];
  days: number[] = [];

  identityStr: string = '';
  genderStr: string = '';
  banksStr: string = '';
  fundUseStr: string = '';
  maritalStatusStr: string = '';
  educationStr: string = '';
  jobStatusStr: string = '';
  yearsHStr: string = '';
  monthStr: string = '';
  dayStr: string = '';
  yaqeenIdNumber: any = '';
  public yaqeenRes: any;
  yaqeenData?: YaqeenData;
  // yageenRes: any;
  iqamaDOB: any | undefined;

  status: boolean = false;
  birthDateG: string = '';
  familyName: string = '';
  familyNameT: string = '';
  fatherName: string = '';
  fatherNameT: string = '';
  firstName: string = '';
  firstNameT: string = '';
  grandFatherName: string = '';
  grandFatherNameT: string = '';
  nationalityDescAr: string = '';// for iqama only
  sexDescAr: string = '';
  idExpirationDate: string = '';
  subTribeName: string = '';// for sudi only
  //End add by qaysar



  constructor(private campaign_service: CampaignService, private shared: SharedService, private loginService: LoginService, private route: ActivatedRoute, private toast: ToastrService, private router: Router, private lkservice: LkServiceService, private yaqeenService: YaqeenService) {
    const user_data = btoa(btoa("user_info_web"));
    if (localStorage.getItem(user_data) != undefined) {
      this.user_data = JSON.parse(atob(atob(localStorage.getItem(user_data) || '{}')));
    }
    if (this.router.url == "/kyc-details") {
      this.type = 1;
    }
    this.subscriptions.push(this.route.queryParams
      .subscribe(
        (params: Params) => {
          if (params['type']) {
            this.user_type = atob(atob(params['type']))
          }
        }
      ))
    this.subscriptions.push(this.shared.languageChange.subscribe((path: any) => {
      this.changeLanguage();
      this.getUserKycList();
      if (this.user_data.role_type == 2) {
        this.getProfileDetails(1);
        return
      }
      this.getProfileDetails();

    }))
    this.changeLanguage();

    this.getIdentityList();
    this.getGenderList();
    this.getBanksList();
    this.getFundList();
    this.getMaritalStatusList();
    this.getEducationList();
    this.getJobStatusList();
    this.getYearsHijri();
    this.getMonthsHijri();
    this.getDays();

  }

  ngOnInit(): void {
    this.getUserKycList();
    if (this.user_data.role_type == 2) {
      this.getProfileDetails(1);
      return
    }
    this.getProfileDetails();
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log("Changes detected");
  }

  changeLanguage() {
    if (localStorage.getItem("arabic") == "true" && localStorage.getItem("arabic") != null) {
      this.LANG = environment.arabic_translations;
    }
    else {
      this.LANG = environment.english_translations;
    }
  }
  //added By Qaysar For updating the page with dynamic list
  onChangeIdentity() {
    this.yaqeenArName = '';
    this.yaqeenEnName = '';
    this.yearsHStr = '';
    this.monthStr = '';
    this.dayStr = '';
    this.yaqeenIdNumber = '';
    this.iqamaDOB = '';

  }
  resetYaqeenData() {
    this.status = false;
    this.birthDateG = '';
    this.familyName = '';
    this.familyNameT = '';
    this.fatherName = '';
    this.fatherNameT = '';
    this.firstName = '';
    this.firstNameT = '';
    this.grandFatherName = '';
    this.grandFatherNameT = '';
    this.nationalityDescAr = '';// for iqama only
    this.sexDescAr = '';
    this.idExpirationDate = '';
    this.subTribeName = '';// for sudi only
  }
  getIdentityList() {
    this.identityList = this.lkservice.getIdentityList();
  }
  getGenderList() {
    this.genderList = this.lkservice.getGenderList();
  }
  getBanksList() {
    this.banksList = this.lkservice.getBankList();
  }
  getFundList() {
    this.fundUseList = this.lkservice.getFundUseList();
  }
  getMaritalStatusList() {
    this.maritalStatusList = this.lkservice.getMaritalStatus();
  }
  getEducationList() {
    this.educationList = this.lkservice.getEducationList();
  }
  getJobStatusList() {
    this.jobStatusList = this.lkservice.getJobStatusList();
  }
  getYearsHijri() {
    this.yearsHijri = this.lkservice.getYearsHijri();
  }
  getMonthsHijri() {
    this.monthsHijri = this.lkservice.getMonthsHijri();
  }
  getDays() {
    this.days = this.lkservice.getDays();
  }
  /*************************************************************************************************************/

  checkYaqeenService() {
    let hasData = false;
    if (this.identityStr != null && this.identityStr != '' && this.identityStr != undefined) {
      if (this.identityStr == '1') {
        if (this.yaqeenIdNumber == null || this.yaqeenIdNumber == '' || this.yaqeenIdNumber.length < 10 || this.yearsHStr == null || this.yearsHStr == '' || this.yearsHStr == undefined || this.monthStr == null || this.monthStr == '' || this.monthStr == undefined || this.dayStr == null || this.dayStr == '' || this.dayStr == undefined) {
          this.errorHandler(1);
          alert("please fill Identity Type and the ID number and birthdate in Hijri to retrieve tha data");
          console.log(`the error says ${this.err}`);
          if (this.err) return;
        } else {
          this.getYaqeenSaudiData();
          hasData = true;
        }
      } else if (this.yaqeenIdNumber == null || this.yaqeenIdNumber == '' || this.yaqeenIdNumber.length < 10 || this.iqamaDOB == null || this.iqamaDOB == '' || this.iqamaDOB == undefined) {
        this.errorHandler(1);
        alert("please fill Identity Type and the ID number and birthdate to retrieve tha data");
        console.log(`the error says ${this.err}`);
        if (this.err) return;
      } else {
        console.log(`the Date Of birth iqama service ${this.iqamaDOB}`)
        const monthYear = new Date(this.iqamaDOB).getFullYear().toString() + '-' + (new Date(this.iqamaDOB).getMonth() + 1).toString().slice(-2);
        console.log(`the Date Of birth iqama service ${monthYear}`)
        this.getYaqeenIqamaData(monthYear);
        hasData = true;
      }

    } else {
      alert("please fill Identity Type and the ID number and birthdate in Hijri to retrieve tha data");
    }
  }

  /*************************************************************************************************************/
  getYaqeenSaudiData() {
    let yearMonth = `${this.yearsHStr}-${this.monthStr}`;
    this.subscriptions.push(this.yaqeenService.getYaqeenSaudiData(this.yaqeenIdNumber, yearMonth).subscribe((res: any) => {
      if (res.status) {
        this.yaqeenRes = res.response;
        const hasData = this.getSafe(() => res.response.personBasicInfo.birthDateG);
        console.log(`THE VLUE NOT EXIST ${hasData}`);
        if (hasData === 'undefined') {
          this.toast.error("The Id number not exist ");
          return;
        }
        this.yaqeenData = new YaqeenData(
          res.status,
          res.response.personBasicInfo.birthDateG,
          res.response.personBasicInfo.familyName,
          res.response.personBasicInfo.familyNameT,
          res.response.personBasicInfo.fatherName,
          res.response.personBasicInfo.fatherNameT,
          res.response.personBasicInfo.firstName,
          res.response.personBasicInfo.firstNameT,
          res.response.personBasicInfo.grandFatherName,
          res.response.personBasicInfo.grandFatherNameT,
          '',
          res.response.personBasicInfo.sexDescAr,
          res.response.personIdInfo.idExpirationDate,
          res.response.personBasicInfo.subTribeName
        );
        this.yaqeenArName = this.yaqeenData.firstName + ' ' + this.yaqeenData.fatherName + ' ' + this.yaqeenData.grandFatherName + ' ' + this.yaqeenData.familyName;
        this.yaqeenEnName = this.yaqeenData.firstNameT + ' ' + this.yaqeenData.fatherNameT + ' ' + this.yaqeenData.grandFatherNameT + ' ' + this.yaqeenData.familyNameT;
        this.toast.success("verified")
      } else {
        this.toast.error("Not Verified ")
      }
    }));
  }

  /*************************************************************************************************************/
  getYaqeenIqamaData(yearMonth: any) {
    this.subscriptions.push(this.yaqeenService.getYaqeenIqamaData(this.yaqeenIdNumber, yearMonth).subscribe((res: any) => {
      if (res.status) {
        const hasData = this.getSafe(() => res.response.personBasicInfo.birthDateG);
        console.log(`THE VLUE NOT EXIST ${hasData}`);
        if (hasData === 'undefined') {
          this.toast.error("The Id number not exist ");
          return;
        }
        this.yaqeenData = new YaqeenData(
          res.status,
          res.response.personBasicInfo.birthDateG,
          res.response.personBasicInfo.familyName,
          res.response.personBasicInfo.familyNameT,
          res.response.personBasicInfo.fatherName,
          res.response.personBasicInfo.fatherNameT,
          res.response.personBasicInfo.firstName,
          res.response.personBasicInfo.firstNameT,
          res.response.personBasicInfo.grandFatherName,
          res.response.personBasicInfo.grandFatherNameT,
          res.response.personBasicInfo.nationalityDescAr,
          res.response.personBasicInfo.sexDescAr,
          res.response.personIdInfo.idExpirationDate,
          ``
        );
        this.yaqeenArName = this.yaqeenData.firstName + ' ' + this.yaqeenData.fatherName + ' ' + this.yaqeenData.grandFatherName + ' ' + this.yaqeenData.familyName;
        this.yaqeenEnName = this.yaqeenData.firstNameT + ' ' + this.yaqeenData.fatherNameT + ' ' + this.yaqeenData.grandFatherNameT + ' ' + this.yaqeenData.familyNameT;
        this.toast.success("Verified")
      } else {
        this.toast.error("Not Verified ")
      }
    }));
  }

  getSafe<T>(func: () => T): T {
    try {
      return func()
    } catch {
      const str: string = 'undefined' as string;
      return str as unknown as T;
    }
  }
  //end add By Qaysar For updating the page with dynamic list

  getProfileDetails(type?: number) {
    const data = { id: this.user_data.id }
    this.subscriptions.push(this.loginService.getProfileDetails(data, type).subscribe((res: any) => {
      if (res.status) {
        this.user_details = res.response;
        if (res.response.kyc_approved_status == 1) {
          this.disabled_inputs = true;
        }
      }

    }))

  }



  getUserKycList() {
    this.subscriptions.push(this.campaign_service.getUserKycList().subscribe((res: any) => {
      this.kyc_form = res.response;
      this.kyc_form.map((data: any) => {
        data.info_type.map((item: any) => {
          item.detail.map((fields: any) => {
            if (fields.id == 6) {
              fields.value = this.user_data?.email;
            }
            if (fields.id == 8) {
              fields.value = this.user_data?.mobile_number;
            }
            if (fields.id == 100) {
              fields.value = this.user_data?.name;
            }
            //start add by qaysar 04-05
            if (fields.id == 131) {
              this.identityStr = fields.value;
            }
            if (fields.id == 132) {
              this.yearsHStr = fields.value;
            }
            if (fields.id == 133) {
              this.monthStr = fields.value;
            }
            if (fields.id == 134) {
              this.dayStr = fields.value;
            }
            if (fields.id == 135) {
              this.yaqeenIdNumber = fields.value;
            }
            if (fields.id == 136) {
              this.iqamaDOB = fields.value;
            }
            //end add by qaysar 04-05
          })
        })
      })
      this.data_loaded = true;
    }))
  }

  showFileInput(i: number, j: number, k: number) {
    const fileInput = document.getElementById("fileInput" + i + j + k) as HTMLInputElement;
    fileInput.click()
  }

  changeImage(event: any, data: any) {
    let file = event.target.files[0];
    let ext = file.type.split('/').pop().toLowerCase();
    if (ext !== "jpeg" && ext !== "jpg" && ext !== "png" && ext !== "pdf" && file.name.split('.').pop() !== "docx") {
      this.toast.warning("", file.name + "is not a valid file")
      return false
    }
    if (file) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        data.value = e.target.result;
        data.file = file
        data.image_selected = true;
        if (file.name.split('.').pop() === "docx") {
          data.ext = "docx";
        } else {
          data.ext = ext;
        }
        // this.uploadImage(data)
      }
      reader.readAsDataURL(file);
    }
    return
  }

  uploadImage(data: any) {
    this.upload_called = true;
    var n = Date.now();
    var fileName = data.file.name;
    var path = fileName + n
    const filePath = `Kyc/${path}`;
    this.load = true;
    const uploadTask =
      firebase.storage().ref().child(`${filePath}`).put(data.file);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        data.progress = progress
      },
      error => console.log(error),
      async () => {
        await uploadTask.snapshot.ref.getDownloadURL().then(res => {
          data.value = res;
          this.uploaded_count += 1;
          if (this.image_count == this.uploaded_count) {
            this.add();
          }
        });
      }
    );
  }


  onlyNumbers(event: any, data: any) {
    if (data.type == this.field_types.Number || data.type == this.field_types.Mobile) {
      var keycode = (event.which) ? event.which : event.keyCode;
      if ((keycode < 48 || keycode > 57) && keycode !== 13 || keycode == 46) {
        event.preventDefault();
        return false;
      }
    }
    return
  }

  next(index: number) {
    // if(this.verifyCR== null && this.verifyCR == ''){
    //   this.toast.warning("Verify CR Number")
    //   return
    //   }
    if (this.disabled_inputs) {
      this.tab_index = index + 1;
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
      return

    }

    this.addKYCDetails(index);
  }

  back(index: number) {
    this.tab_index = index - 1;
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  addKYCDetails(index: number) {

    if (this.yaqeenData?.firstName != '' || this.yaqeenData != null) {
      this.kyc_form[index].info_type.map((data: any) => {
        data.detail.map((fields: any) => {
          // console.log(fields.id);
          //Added By Qaysar For Yaqeen Service Data
          if (fields.id == 131 && fields.value == null) {
            fields.value = this.identityStr
          }
          if (fields.id == 132 && fields.value == null) {
            fields.value = this.yearsHStr
          }
          if (fields.id == 133 && fields.value == null) {
            fields.value = this.monthStr
          }

          if (fields.id == 134 && fields.value == null) {
            fields.value = this.dayStr
          }

          if (fields.id == 135 && fields.value == null) {
            fields.value = this.yaqeenIdNumber
          }
          if (fields.id == 136 && fields.value == null) {
            fields.value = this.iqamaDOB
          }

          if (fields.id == 137 && fields.value == null) {
            fields.value = this.yaqeenArName
          }
          if (fields.id == 138 && fields.value == null) {
            fields.value = this.yaqeenEnName
          }
          console.log(`the value for sield ID is ${fields.id} and the fields value is ${fields.value}`);
        })
      })
    }



    this.kyc_form[index].info_type.map((data: any) => {

      data.detail.map((fields: any) => {
        // console.log(fields.id);

        if (fields.id == 112 && fields.value == null) {
          fields.value = this.crname
        }
        if (fields.id == 113 && fields.value == null) {
          fields.value = this.crEntityNumber
        }
        if (fields.id == 114 && fields.value == null) {
          fields.value = this.businessType
        }

        if (fields.id == 115 && fields.value == null) {
          fields.value = this.issueDate
        }

        if (fields.id == 116 && fields.value == null) {
          fields.value = this.expiryDate
        }
      })
    })
    if (this.tab_index == this.kyc_form.length - 1) {
      this.kyc_form[index].info_type.map((data: any) => {

        data.detail.map((fields: any) => {
          // console.log(fields.id);

          if (fields.id == 112 && fields.value == null) {
            fields.value = this.crname
          }
          if (fields.id == 113 && fields.value == null) {
            fields.value = this.crEntityNumber
          }
          if (fields.id == 114 && fields.value == null) {
            fields.value = this.businessType
          }

          if (fields.id == 115 && fields.value == null) {
            fields.value = this.issueDate
          }

          if (fields.id == 116 && fields.value == null) {
            fields.value = this.expiryDate
          }
        })
      })

    }
    this.errorHandler(index);
    if (this.err) return;
    if (this.tab_index == this.kyc_form.length - 1) {
      this.load = true;
      this.kyc_form.map((data: any) => {
        data.info_type.map((item: any) => {
          item.detail.map((fields: any) => {
            if (fields.image_selected) {
              this.uploadImage(fields);
              this.image_count += 1;
              return
            }
          });
        })
      })
      if (!this.err && !this.upload_called) {
        this.add();
      }
    } else {
      this.tab_index = index + 1;
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }

  }
  add() {
    if (this.verifyCR == null && this.verifyCR == '') {
      return
    }
    else {
      const data = {
        "field": this.post_data,
        "crnumber": this.verifyCR
      }
      this.subscriptions.push(this.campaign_service.addKyc(data).subscribe((res: any) => {
        this.load = false;
        if (res.status) {
          this.toast.success("Kyc added successfully!");
          if (this.user_type == "3") {
            // this.router.navigate(["/add-campaign"]);
            this.router.navigate(["/dashboard"]);
            return
          }
          this.router.navigate(["/dashboard"]);

          // this.router.navigate(["/thank-you"]);
          return
        }
        this.toast.warning(res.response.message);
      }))
    }
  }

  errorHandler(index: number) {
    this.err = false;
    this.kyc_form[index].info_type.map((data: any) => {
      data.detail.map((fields: any) => {
        // console.log(data.detail.length);


        if (fields.mandatory == 1 && !fields.value) {
          fields.required = true;
          this.err = true;
        } else {
          fields.required = false;
        }
        if (fields.type != this.field_types.Mobile) {
          if (fields.value && fields.length != "" && fields.value.length > +fields.length) {
            fields.invalid = true;
            fields.error_message = `${this.LANG.value_cannot_exceed} ${fields.length} ${this.LANG.characters}`;
            this.err = true;
          } else {
            fields.invalid = false;

          }
        }
        if (fields.type == this.field_types.Mobile) {
          if (fields.value && (fields.value.length < 9 || fields.value.length > 10)) {
            fields.invalid = true;
            fields.error_message = this.LANG.Enter_valid_Mobile_Number;
            this.err = true;
          } else {
            fields.invalid = false;
            fields.error_message = "";
          }
        }
        if (fields.type == this.field_types.Email) {
          if (fields.value && this.checkEmail(fields.value)) {
            fields.invalid = true;
            fields.error_message = this.LANG.Enter_valid_Email_Id;
            this.err = true;
          } else {
            fields.invalid = false;
            fields.error_message = "";
          }
        }
        // console.log(fields.id);
      });
      if (!this.err) {
        this.post_data.push.apply(this.post_data, data.detail);
      }
    })
  }

  checkEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email)
  }
  public verifyCR: any
  verfyimg: boolean = false
  verifyCrNumber(number: any) {
    this.campaign_service.verifyCrNumber(number).subscribe((res: any) => {
      let status = res.status
      this.verifyCR = res.response
      if (status) {
        this.toast.success("verified")
        this.crname = this.verifyCR.crName
        this.crEntityNumber = this.verifyCR.crEntityNumber
        this.issueDate = this.verifyCR.issueDate
        this.expiryDate = this.verifyCR.expiryDate
        this.businessType = this.verifyCR.businessType.name

      }
      else {
        this.toast.error("not veriied")
      }

    })
  }
  change(event: any) {
    let crName = event.target.value;
    if (crName.length === 10) {
      console.log(`the value from user is ${event.target.value}`);
      this.verifyCrNumber(crName);
    }
  }
}

