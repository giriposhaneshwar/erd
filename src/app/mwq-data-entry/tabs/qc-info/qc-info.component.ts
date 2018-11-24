import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jQuery';
import { AppStorageService } from './../../../appConfiguration/app-config.service'
import { MwqDataEntryService } from 'app/mwq-data-entry/mwq-data-entry.service';
declare var $;

@Component({
  selector: 'ms-qc-info',
  templateUrl: './qc-info.component.html',
  styleUrls: ['./qc-info.component.scss']
})
export class QcInfoComponent implements OnInit {
  qcData: any[];
  constructor(public route: Router,
    public localStore: AppStorageService,
    private mwqDataEntryService: MwqDataEntryService) {
    this.loadQcInfoData();
  }

  inputOrderClass(data, key) {
    console.log("QC Data", data, key);
  }

  siteDateSave() {
    console.log("At Save(qc-site-detailsy) Screen");
  }
  siteDateNext() {
    this.route.navigate(["mwqDataQc", "site-details"]);
    console.log("At Next (qc-site-details) Screen");
  }
  qcEditRow(sampleRefNumber) {
    const lc = this.localStore;
    const that = this;
    console.log("----sampleRefNumber-----" + sampleRefNumber);
    this.mwqDataEntryService.fetchDataEntryRecord(sampleRefNumber).subscribe((restItems) => {
      this.dataEntryRecordResp = restItems;
      this.dataEntryRecordDetails = this.dataEntryRecordResp.GetDataEntryRecordResult;
      console.log("----dataEntryRecordDetails----", this.dataEntryRecordDetails);
      lc.store.set('dataEntry', this.dataEntryRecordDetails);
      that.route.navigate(["mwqDataQc", "site-details"]);
    });

    /*     $.ajax({
          url: "/assets/data/qcData.json", success: function (res) {
            this.qcData = res[0].jsonInput;
            console.log("REsponse on QC Data", res, this.qcData);
            lc.store.set('dataEntry', this.qcData);
            that.route.navigate(["mwqDataQc", "site-details"]);
          }, error: function (e) {
            console.log("Error on QC Data ", e);
          }
        }); */
  }

  ngOnInit() {

  }

  qcInfoDetails = [];
  qcInfoResp: any;

  dataEntryRecordDetails = [];
  dataEntryRecordResp: any;

  loadQcInfoData(): void {
    this.mwqDataEntryService.fetchQcInfoData().subscribe((restItems) => {
      this.qcInfoResp = restItems;
      this.qcInfoDetails = this.qcInfoResp.GetQcInfoResult.QCinfoList;
      console.log("----qcInfoDetails----", this.qcInfoDetails);
    });
  }

  getDataEntryRecord(sampleRefNumber): void {
    this.mwqDataEntryService.fetchDataEntryRecord(sampleRefNumber).subscribe((restItems) => {
      this.dataEntryRecordResp = restItems;
      this.dataEntryRecordDetails = this.dataEntryRecordResp.GetDataEntryRecordResult;
      console.log("----dataEntryRecordDetails----", this.dataEntryRecordDetails);
    });
  }
}
