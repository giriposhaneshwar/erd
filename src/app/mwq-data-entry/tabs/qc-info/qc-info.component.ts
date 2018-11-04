import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-qc-info',
  templateUrl: './qc-info.component.html',
  styleUrls: ['./qc-info.component.scss']
})
export class QcInfoComponent implements OnInit {

  constructor(public route: Router) { }

  inputOrderClass(data, key) {
    console.log("QC Data", data, key);
  }

  siteDateSave() {
    console.log("At Save(qc-site-detailsy) Screen");
  }
  siteDateNext() {
    this.route.navigate(["mwqDataQc", "qc-site-details"]);
    console.log("At Next (qc-site-details) Screen");
  }

 
  ngOnInit() {
  }

}
