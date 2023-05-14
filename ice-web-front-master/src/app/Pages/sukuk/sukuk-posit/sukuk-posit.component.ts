import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sukuk-posit',
  templateUrl: './sukuk-posit.component.html',
  styleUrls: ['./sukuk-posit.component.css']
})
export class SukukPositComponent implements OnInit {
  opertunityDetail:any;
  constructor() {
    let storageObj = localStorage.getItem("opertunitiyDetail");
    this.opertunityDetail =JSON.parse(storageObj!);
   }

  ngOnInit(): void {
  }

}
