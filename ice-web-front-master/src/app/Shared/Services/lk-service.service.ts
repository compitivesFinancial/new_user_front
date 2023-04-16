
import { Injectable } from '@angular/core';
import { Bank } from '../Models/bank';
import { Identity } from '../Models/identity';
import { Gender } from '../Models/gender';
import { FundUse } from '../Models/fund-use';
import { Education } from '../Models/education';
import { MaritalStatus } from '../Models/marital-status';
import { JobStatus } from '../Models/job-status';

@Injectable({
  providedIn: 'root'
})
export class LkServiceService {

  bankList: Array<Bank> = [];
  identityList: Array<Identity> = [];
  genderList: Array<Gender> = [];
  fundUseList: Array<FundUse> = [];
  educationList: Array<Education> = [];
  maritalStatusList: Array<MaritalStatus> = [];
  jobStatusList: Array<JobStatus> = [];

  constructor() { }

  getBankList() {
    this.bankList.push(new Bank("1", "Saudi National Bank", "البنك الأهلي السعودي", "1"));
    this.bankList.push(new Bank("2", "The Saudi British Bank (SABB)", "البنك السعودي البريطاني (ساب)", "1"));
    this.bankList.push(new Bank("3", "Saudi Investment Bank", "البنك السعودي للاستثمار", "1"));
    this.bankList.push(new Bank("4", "Alinma bank", "مصرف الإنماء", "1"));
    this.bankList.push(new Bank("5", "Banque Saudi Fransi", "البنك السعودي الفرنسي", "1"));
    this.bankList.push(new Bank("6", "Riyad Bank", "بنك الرياض", "1"));
    this.bankList.push(new Bank("7", "Al Rajhi Bank", "مصرف الراجحي", "1"));
    this.bankList.push(new Bank("8", "Arab National Bank", "البنك العربي الوطني", "1"));
    this.bankList.push(new Bank("9", "Bank AlBilad", "بنك البلاد", "1"));
    this.bankList.push(new Bank("10", "Bank AlJazira", "بنك الجزيرة", "1"));
    this.bankList.push(new Bank("11", "Gulf International Bank Saudi Arabia (GIB-SA)", "بنك الخليج الدولي - السعودية", "1"));
    return this.bankList;
  }
  getIdentityList() {
    this.identityList.push(new Identity("1", "Saudi", "سعودي", "1"));
    this.identityList.push(new Identity("2", "Residence Permit", "مقيم", "1"));
    this.identityList.push(new Identity("3", "GCC", "مجلس تعاون خليجي", "1"));
    return this.identityList;
  }
  getGenderList() {
    this.genderList.push(new Gender("1", "Male", "ذكر", "1"));
    this.genderList.push(new Gender("2", "Female", "أنثى", "1"));
    return this.genderList;
  }
  getFundUseList() {
    this.fundUseList.push(new FundUse("1", "Opex", "نفقات تشغيلية", "1"));
    this.fundUseList.push(new FundUse("2", "Procurement", "مشتريات", "1"));
    this.fundUseList.push(new FundUse("3", "Lease", "تأجير", "1"));
    this.fundUseList.push(new FundUse("4", "Wages", "راتب", "1"));
    this.fundUseList.push(new FundUse("5", "Others", "اخرى", "1"));
    return this.fundUseList;
  }
  getMaritalStatus() {
    this.maritalStatusList.push(new MaritalStatus("1", "Single", "غير مرتبط", "1"));
    this.maritalStatusList.push(new MaritalStatus("2", "Married", "مرتبط", "1"));
    this.maritalStatusList.push(new MaritalStatus("3", "Other", "اخرى", "1"));
    return this.maritalStatusList;
  }
  getEducationList() {
    this.educationList.push(new Education("1", "Doctorate", "دكتوراة", "1"));
    this.educationList.push(new Education("2", "Master", "ماجستير", "1"));
    this.educationList.push(new Education("3", "Bachelor", "بكالوريوس", "1"));
    this.educationList.push(new Education("4", "Deploma", "دبلوم", "1"));
    this.educationList.push(new Education("5", "Secondary edu", "ثانوية عامه", "1"));
    this.educationList.push(new Education("6", "others", "اخرى", "1"));
    return this.educationList;
  }
  getJobStatusList() {
    this.jobStatusList.push(new JobStatus("1", "Employed", "موظف", "1"));
    this.jobStatusList.push(new JobStatus("2", "Unemployed", "غير موظف", "1"));
    this.jobStatusList.push(new JobStatus("3", "Student", "طالب علم", "1"));
    return this.jobStatusList;
  }
}
