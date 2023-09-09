import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../Dashboard/dashboard.service';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-dashboarddetails',
  templateUrl: './dashboarddetails.component.html',
  styleUrls: ['./dashboarddetails.component.css']
})
export class DashboarddetailsComponent implements OnInit {
  subscriptions: Subscription[] = [];
  user_data: any = {};
  LANG: any = {};
  public dashDetailsList: any = ''
  public profileDetails: any = ''
  public invesorDashDetails: any = ''


  constructor(public dashBoardService: DashboardService, private shared: SharedService) {
    const user_data = btoa(btoa("user_info_web"));
    if (localStorage.getItem(user_data) != undefined) {
      this.user_data = JSON.parse(atob(atob(localStorage.getItem(user_data) || '{}')));

    }
    if (isNaN(this.user_data.id)) {
      this.user_data.id = this.decryptAesCbc(this.user_data.id, environment.decryptionAES.key, environment.decryptionAES.iv);
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

  decryptAesCbc(base64Ciphertext: string, key: string, iv: string): number {
    // Decode the base64 ciphertext to a WordArray
    const ciphertext = CryptoJS.enc.Base64.parse(base64Ciphertext).toString(CryptoJS.enc.Hex);

    // Create WordArrays for the key and IV
    const keyBytes = CryptoJS.enc.Hex.parse(key);
    const ivBytes = CryptoJS.enc.Hex.parse(iv);

    // Decrypt the ciphertext using AES CBC mode
    const decrypted = CryptoJS.AES.decrypt(ciphertext, keyBytes, {
      iv: ivBytes,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Convert the decrypted WordArray to a UTF-8 string
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);

    return parseInt(plaintext);
  }



  ngOnInit(): void {
    if (this.user_data.role_type == 2) {
      this.investorDashdetails()
      this.profile()
    }
    if (this.user_data.role_type == 3) {
      this.dashDetails()
      this.profile()
    }
  }
  dashDetails() {
    let data = {
      'user_id': this.user_data.id
    }
    this.dashBoardService.dashDEtails(data).subscribe((res: any) => {
      this.dashDetailsList = res.response.data
    })
  }
  roundOF(a: any) {
    return Math.round((a + Number.EPSILON) * 100) / 100



  }

  profile() {
    let data = {
      'id': this.user_data.id
    }

    this.dashBoardService.profileDetails(data).subscribe((res: any) => {
      this.profileDetails = res.response
      this.profileAcountNumber();
      //must be an encryption code
      console.log("this.profileDetails", this.profileDetails);

    })
  }

  profileAcountNumber() {
    this.dashBoardService.getBankAccountNumber().subscribe((res: any) => {
      this.profileDetails.account_number = res.response.account_number;
    })
  }

  spreadO: any
  investorDashdetails() {
    let data = {
      'user_id': this.user_data.id
    }
    this.dashBoardService.investorDashDetails(data).subscribe((res: any) => {
      this.invesorDashDetails = res.response.data
      // const numberClone = this.invesorDashDetails.total_investment
    })

  }

}
