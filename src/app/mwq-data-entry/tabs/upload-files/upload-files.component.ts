import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { Config } from "../../../appConfiguration/config";

import { AppStorageService } from "../../../appConfiguration/app-config.service";
import { ToastsManager, ToastOptions } from "ng6-toastr/ng2-toastr";
import { MwqDataEntryService } from './../../mwq-data-entry.service';
import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: "ms-upload-files",
  templateUrl: "./upload-files.component.html",
  styleUrls: ["./upload-files.component.scss"]
})
export class UploadFilesComponent implements OnInit {

  dataEntry: any;
  dataEntryKey: string = "dataEntry";
  uploadFilesInfoKey: string = "sampleInformation";

  module: String;
  uploadFile: any;
  uploadFileList: any[] = [];
  finalUploads: any[] = [];
  apiUrl: String;
  domain: String;
  addedFilesList: any[] = [];
  deletedFilesList: any[] = [];

  sampleInformation: any = {
    dataEntryComments: ""
  };
  js = {};
  file: any;

  saveMwqDataEntryResp: any;
  fielDeleteInfoResp: any;
  constructor(
    public route: Router,
    public config: Config,
    public toastr: ToastsManager,
    public localStore: AppStorageService,
    vcr: ViewContainerRef,
    public api: MwqDataEntryService,
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.domain = this.config.UPLOAD_URL;
    this.apiUrl = this.config.API_URL;
  }

  ngOnInit() {
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
      if (this.dataEntry.hasOwnProperty(this.uploadFilesInfoKey)) {
        this.sampleInformation = this.dataEntry[this.uploadFilesInfoKey];
        this.uploadFileList = (this.dataEntry["upload"] !== undefined) ? this.dataEntry["upload"] : [];

      } else {
        this.dataEntry = {};
        this.dataEntry[this.uploadFilesInfoKey] = this.sampleInformation;
        this.dataEntry['AddFiles'] = [];
        this.dataEntry['DeleteFiles'] = [];
        this.localStore.store.set(this.dataEntryKey, this.dataEntry);
      }

    } else {
      this.dataEntry = {};
      this.dataEntry[this.uploadFilesInfoKey] = this.sampleInformation;
      this.dataEntry['AddFiles'] = [];
      this.dataEntry['DeleteFiles'] = [];
      this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    }
    console.log("Data Entry", this.dataEntryKey, this.dataEntry);
  }

  fileChanged(e) {
    let uploadedFile = e.target.files;
    // console.log("Body SElection", $('body'));
    let that = this;
    let data = new FormData();
    $.each($('.uploadFile')[0].files, function (i, file) {
      console.log("-------file info-------" + i, file);
      data.append('file-' + i, file);


    });
    // debugger;
    $.ajax({
      url: that.config.API_URL + "/SaveFile",
      data: data,
      cache: false,
      contentType: 'multipart/form-data',
      processData: false,
      type: 'POST',
      success: function (data) {
        // debugger;
        console.log("Response Data", data);
        let files = data.SaveFileResult.clsUploadFilesl;
        // debugger;
        if (files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            let item = files[i];
            that.uploadFileList.push(item);
            that.addedFilesList.push(item);
          }
          let jsonMwqDataEntryInfo = that.localStore.store.get(that.dataEntryKey);
          that.dataEntry = jsonMwqDataEntryInfo.data;

          console.log("Added files ", that.addedFilesList);
          that.dataEntry['upload'] = that.uploadFileList;
          that.dataEntry['AddFiles'] = that.addedFilesList;
          // that.dataEntry["DeleteFiles"] = this.deletedFilesList;
          that.localStore.store.set(that.dataEntryKey, that.dataEntry);
        } else {
          // if no files in response throw error message
        }

        // that.uploadFileList.push()
        // alert(data);
      }
    });
  }

  updateMWQDataInfo() {
    if (this.module == "mwqDataEntry") {
      // Save form and finish here
      this.toastr.success(
        "Data Entry Form Submitted Successfully",
        "Success!",
        { toastLife: 10000 }
      );
    } else {
      // got to requlst on qc and finsih the form
    }
    console.log("At Save Screen");
  }


  dataEntrySave(sampleInformation) {

    let jsonMwqDataEntryInfo = this.localStore.store.get(this.dataEntryKey);
    let dataEntry = jsonMwqDataEntryInfo.data;

    dataEntry[this.uploadFilesInfoKey] = sampleInformation;
    this.js["jsonInput"] = dataEntry;
    // this.localStore.store.set(this.dataEntryKey, this.dataEntry);

    //console.log("At microBiologySiteDateSave Screen ----------" + JSON.stringify(this.js));
    console.log("jsonMwqDataEntryInfo ------" + JSON.stringify(jsonMwqDataEntryInfo));
    this.saveMwqData(this.js);
  }


  uploadBtnTabNavPrev(module) {
    if (module === "mwqDataEntry") {
      this.route.navigate(["mwqDataEntry", "microbiology"]);
      console.log("At mwqDataEntry - microbiology Screen");
    }
    else {
      this.route.navigate(["mwqDataQc", "microbiology"]);
      console.log("At mwqDataQc - microbiology Screen");
    }
    // this.route.navigate(["mwqDataEntry", "microbiology"]);
  }

  uploadBtnTabNavNext(module) {
    if (module === "mwqDataEntry") {
      this.route.navigate(["mwqDataEntry", "qc-remarks"]);
      console.log("At mwqDataEntry - qc-remarks Screen");
    }
    else {
      this.route.navigate(["mwqDataQc", "qc-remarks"]);
      console.log("At mwqDataQc - qc-remarks Screen");
    }
    this.route.navigate(["mwqDataQc", "qc-remarks"]);
  }
  saveMwqData(jsonMwqDataEntryInfo) {
    this.api.saveMWQDataEntryInfo(jsonMwqDataEntryInfo).subscribe((resp) => {
      this.saveMwqDataEntryResp = resp;
      console.log("----saveMwqDataEntryResp----", this.saveMwqDataEntryResp);
      this.toastr.success(this.saveMwqDataEntryResp.loadDataResult, "Success");
    });
  }

  fileDelete(fileName, indexValue) {
    console.log("--------" + fileName + " ---------------- " + indexValue);
    this.api.fileDeleteTemp(fileName).subscribe((resp) => {
      this.fielDeleteInfoResp = resp;
      console.log("----fielDeleteInfoResp----", this.fielDeleteInfoResp.FileDeleteResult);

      // let localData = this.localStore.store.get(this.dataEntryKey);
      if (this.fielDeleteInfoResp.FileDeleteResult === "File deleted Successfully") {
        this.deletedFilesList.push(this.uploadFileList[indexValue]);
        this.uploadFileList.splice(indexValue, 1);
        // debugger;
        for (let i = 0; i < this.addedFilesList.length; i++) {
          let file = this.addedFilesList[i];
          if (file.fileStoreName === fileName) {
            this.addedFilesList.splice(i, 1);
            break;
          }
        }
        this.dataEntry["AddFiles"] = this.addedFilesList;
        this.dataEntry["DeleteFiles"] = this.deletedFilesList;
        console.log("Deleted Files", this.deletedFilesList);
        this.localStore.store.set(this.dataEntryKey, this.dataEntry);
        this.toastr.success(this.fielDeleteInfoResp.FileDeleteResult, "Success");
      }
      else {
        this.toastr.error(this.fielDeleteInfoResp.FileDeleteResult, "Failed");
      }
    });
  }
}
