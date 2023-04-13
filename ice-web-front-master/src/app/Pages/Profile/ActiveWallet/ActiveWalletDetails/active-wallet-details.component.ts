import { Component, OnInit } from '@angular/core';
declare const $:any;
@Component({
  selector: 'app-active-wallet-details',
  templateUrl: './active-wallet-details.component.html',
  styleUrls: ['./active-wallet-details.component.css']
})
export class ActiveWalletDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $('.chart').easyPieChart({
      easing: 'easeOutElastic',
      delay: 3000,
      barColor: '#00C48A',
      trackColor: '#DBF8EE',
      scaleColor: false,
      lineWidth: 5,
      trackWidth: 2,
      size: 267,
      lineCap: 'round',
      onStep: function (from:any, to:any, percent:any) {
          this.el.children[0].innerHTML = Math.round(percent);
      }
  });


  }

}
