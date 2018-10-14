import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-qc-micro-biology',
  templateUrl: './qc-micro-biology.component.html',
  styleUrls: ['./qc-micro-biology.component.scss']
})
export class QcMicroBiologyComponent implements OnInit {

  constructor(public route: Router) { }

  inputOrderClass(data, key) {
    console.log("QC Data", data, key);
  }
  siteDatePrev() {
    this.route.navigate(["mwqDataQc", "qc-organic-chemistry"]);
    console.log("At qc-organic-chemistry Screen");
  }
  siteDateSave() {
    console.log("At Save(QcMicroBiology) Screen");
  }
  siteDateNext() {
    this.route.navigate(["mwqDataQc", "qc-upload-files"]);
    console.log("At qc-upload-files Screen");
  }


  ngOnInit() {
  }

}
