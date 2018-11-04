import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-qc-remarks',
  templateUrl: './qc-remarks.component.html',
  styleUrls: ['./qc-remarks.component.scss']
})
export class QcRemarksComponent implements OnInit {

  siteDateEdit() {
    console.log("At Edit Screen");
  }
  siteDateSave() {
    console.log("At Save Screen");
  }
  siteDateNext() {
    this.route.navigate(["mwqDataQc", "qc-remarks"]);
    console.log("At Next Screen");
  }

  siteDatePrev() {
    this.route.navigate(["mwqDataQc", "qc-upload-files"]);
  }

  constructor(public route: Router) { }

  ngOnInit() {
  }

}
