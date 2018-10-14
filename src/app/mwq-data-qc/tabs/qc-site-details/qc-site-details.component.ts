import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'ms-qc-site-details',
  templateUrl: './qc-site-details.component.html',
  styleUrls: ['./qc-site-details.component.scss']
})
export class QcSiteDetailsComponent implements OnInit {

  siteDateEdit() {
    console.log("At Edit Screen");
  }
  siteDateSave() {
    console.log("At Save Screen");
  }
  siteDateNext() {
    this.route.navigate(["mwqDataQc", "qc-in-situ-parameters"]);
    console.log("At Next Screen");
  }
  siteDatePrev() {
    this.route.navigate(["mwqDataQc", "qc-info"]);
    console.log("At qc-site-details Screen");
  }

  constructor(public route: Router) { }

  ngOnInit() {
  }

}
