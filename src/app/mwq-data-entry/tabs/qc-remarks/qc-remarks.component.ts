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
    let isValid = this.doValidate(this.dataEntry);
    if (isValid) {
      this.updateMwqDataEntryQcData(this.js);
    }
  
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

  doValidate(obj) {
    let isRequired = [];
    let popMessage = [];
    let requiredObj = {};
    for (let item in obj) {
      let row = obj[item];
      requiredObj[item] = [];
      if (typeof row === "object") {
        for (let subItem in row) {
          let subRow = row[subItem];
          // if (item !== 'upload' || item != 'AddFiles' || item != 'DeleteFiles') {
          if (item !== 'upload') {
            if (subRow === "") {
              isRequired.push(subItem);
              popMessage.push(subItem + " is required from " + item);
              requiredObj[item].push(subItem);
            }
          }
          // console.log("\n\n");
          // // http://voidcanvas.com/make-console-log-output-colorful-and-stylish-in-browser-node/
          console.log("%c" + item, "color: #c00; font-weight: bold; text-transform: uppercase;");
          // console.log(subItem, subRow);
        }
        // console.log("\n\nAt Row", typeof row, item, row);
      }
      // console.log("Showing list of item", item);
    }
    // console.log("Manditory fields", requiredObj);
    if (isRequired.length > 0) {
      let message = "";
      message += "<div class='popMessage'>"
      for (let row in requiredObj) {
        let item = requiredObj[row];
        if (item.length > 0) {
          message += "<b>" + row + "</b> : <span style='color: #bbb'>" + item.join(', ') + "</span><br>"
        }
      }
      message += '</div>';
      /* this.toastr.info('<input type="checkbox" checked> Success!', 'With HTML', {
        allowHtml: true
      }); */
      this.toastr.error(
        message,
        "Faied to submit! Please fill the required fields",
        { toastLife: 30000, allowHtml: true, }
      );
    }
    if (isRequired.length === 0) {
      return true
    }
    return false;
  }

}
