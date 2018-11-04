import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jQuery';
import { AppStorageService } from './../../../appConfiguration/app-config.service'
declare var $;

@Component({
  selector: 'ms-qc-info',
  templateUrl: './qc-info.component.html',
  styleUrls: ['./qc-info.component.scss']
})
export class QcInfoComponent implements OnInit {
  qcData: any[];
  constructor(public route: Router, public localStore: AppStorageService) { }

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
  qcEditRow() {
    const lc = this.localStore;
    const that = this;
    $.ajax({url: "/assets/data/qcData.json", success: function(res) {
      this.qcData  = res[0].jsonInput;
      console.log("REsponse on QC Data", res, this.qcData);
      lc.store.set('dataEntry', this.qcData);
      that.route.navigate(["mwqDataQc", "site-details"]);
    }, error: function(e) {
      console.log("Error on QC Data ", e);
    }});
  }

  ngOnInit() {
    
  }

}
