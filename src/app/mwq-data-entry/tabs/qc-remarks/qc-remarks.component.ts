import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'app/appConfiguration/config';
import { AppStorageService } from 'app/appConfiguration/app-config.service';
import { MwqDataEntryService } from 'app/mwq-data-entry/mwq-data-entry.service';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'ms-qc-remarks',
  templateUrl: './qc-remarks.component.html',
  styleUrls: ['./qc-remarks.component.scss']
})
export class QcRemarksComponent implements OnInit {
  updatedBy = 'QC Admin';
  dataEntry: any;
  dataEntryKey: string = "dataEntry";
  qcCommentsInfoKey: string = "sampleInformation";
  sampleInformation: any = {
    statusId: "",
    qCComments: "",
    updatedBy: ""
  };
  module: String;
  js = {};
  updateMwqDataEntryQcResp: any;

  constructor(public route: Router,
    public config: Config,
    public localStore: AppStorageService,
    public api: MwqDataEntryService,
    vcr: ViewContainerRef,
    public toastr: ToastsManager) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {

    console.log(this.sampleInformation.updatedBy)
    // this.sampleInformation.updatedBy='new val';
    let mod = this.config.getModuleName();
    this.module = mod.module;
    console.log("----module name----" + this.module);

    let localData = this.localStore.store.get(this.dataEntryKey);
    if (localData.status == "success") {
      this.dataEntry = localData.data;
      this.dataEntry['upload'] = (this.dataEntry.hasOwnProperty('upload')) ? this.dataEntry.upload : [];
      this.dataEntry['AddFiles'] = (this.dataEntry.hasOwnProperty('AddFiles')) ? this.dataEntry.AddFiles : [];
      this.dataEntry['DeleteFiles'] = (this.dataEntry.hasOwnProperty('DeleteFiles')) ? this.dataEntry.DeleteFiles : [];
      this.localStore.store.set(this.dataEntryKey, this.dataEntry);
      if (this.dataEntry.hasOwnProperty(this.qcCommentsInfoKey)) {
        this.sampleInformation = this.dataEntry[this.qcCommentsInfoKey];
      } else {
        this.dataEntry = {};
        this.dataEntry[this.qcCommentsInfoKey] = this.sampleInformation;
        this.dataEntry['AddFiles'] = [];
        this.dataEntry['DeleteFiles'] = [];
        this.localStore.store.set(this.dataEntryKey, this.dataEntry);
      }
    } else {
      this.dataEntry = {};
      this.dataEntry[this.qcCommentsInfoKey] = this.sampleInformation;
      this.dataEntry['AddFiles'] = [];
      this.dataEntry['DeleteFiles'] = [];
      this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    }
    //console.log("Data Entry", this.dataEntryKey, this.dataEntry);
  }


  qCRemarksBtnTabNavSave(sampleInformation) {
    this.sampleInformation.updatedBy = this.updatedBy;
    this.dataEntry[this.qcCommentsInfoKey] = sampleInformation;
    this.js["jsonInput"] = this.dataEntry;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    console.log("At QC Update Screen" + JSON.stringify(this.js));
    this.updateMwqDataEntryQcData(this.js);
  }

  updateMwqDataEntryQcData(jsonMwqDataEntryInfo) {
    this.api.updateMWQDataEntryInfo(jsonMwqDataEntryInfo).subscribe((resp) => {
      this.updateMwqDataEntryQcResp = resp;
      console.log("----updateMwqDataEntryQcResp----", this.updateMwqDataEntryQcResp);
      if (this.updateMwqDataEntryQcResp.updateDataResult === "Record updated successfully") {
        this.toastr.success(this.updateMwqDataEntryQcResp.updateDataResult, "Success");
        this.route.navigate(["mwqDataQc", "qc-info"]);
      }
      else {
        this.toastr.error(this.updateMwqDataEntryQcResp.updateDataResult, "Failed");
      }
    });
  }

  qCRemarksBtnTabNavPrev(module) {
    if (module === "mwqDataEntry") {
      this.route.navigate(["mwqDataEntry", "microbiology"]);
      console.log("At mwqDataEntry - microbiology Screen");
    }
    else {
      this.route.navigate(["mwqDataQc", "upload-files"]);
      console.log("At mwqDataQc - upload-files Screen");
    }
  }

}
