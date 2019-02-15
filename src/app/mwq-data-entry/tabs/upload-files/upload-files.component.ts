import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { Config } from "../../../appConfiguration/config";

import { AppStorageService } from "../../../appConfiguration/app-config.service";
import { ToastsManager, ToastOptions } from "ng6-toastr/ng2-toastr";
import { MwqDataEntryService } from './../../mwq-data-entry.service';
import * as $ from 'jquery';
import { NgxSpinnerService } from "ngx-spinner";
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
    private spinner: NgxSpinnerService,
    public api: MwqDataEntryService,
  ) {
    let currentUrl = this.route.url;
    let groupInfo = sessionStorage.getItem("groups");
    let username = sessionStorage.getItem("username");

    if (groupInfo === "2" || groupInfo === "20") {

      console.log("-----Group Mached-----" + groupInfo, username, currentUrl);
      this.toastr.setRootViewContainerRef(vcr);
      this.domain = this.config.UPLOAD_URL;
      this.apiUrl = this.config.API_URL;
    }
    else {
      console.log("-----Group Not Matched-----" + groupInfo, currentUrl);
      this.spinner.hide();
      this.route.navigate(["error"]);
    }
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

  fileChanged(e, txtMwqFileUpload: HTMLInputElement) {
    let uploadedFile = e.target.files;
    // console.log("Body SElection", $('body'));

    let that = this;
    let data = new FormData();
    $.each($('.uploadFile')[0].files, function (i, file) {
      /* console.log("-------file info-------" + i, file); */
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
        /* console.log("Response Data", data); */
        let files = data.SaveFileResult.clsUploadFilesl;
        // debugger;
        if (files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            let item = files[i];
            console.log("Duplicate file---" + JSON.stringify(that.uploadFileList), item.fileName);
            if (that.uploadFileList.length === 0) {
              that.uploadFileList.push(item);
              that.addedFilesList.push(item);
            }
            else {
              if (that.uploadFileList[i].fileName === item.fileName) {
                console.log("MACHED");
                alert("Duplicate file not allowed " + item.fileName);
              }
              else {
                console.log("NOT MACHED");
                that.uploadFileList.push(item);
                that.addedFilesList.push(item);
              }
            }
          }
          let jsonMwqDataEntryInfo = that.localStore.store.get(that.dataEntryKey);
          that.dataEntry = jsonMwqDataEntryInfo.data;

          /* console.log("Added files ", that.addedFilesList); */
          that.dataEntry['upload'] = that.uploadFileList;
          that.dataEntry['AddFiles'] = that.addedFilesList;
          /*  console.log("upload files ", that.uploadFileList); */
          // that.dataEntry["DeleteFiles"] = this.deletedFilesList;
          that.localStore.store.set(that.dataEntryKey, that.dataEntry);
        } else {
          // if no files in response throw error message
        }

        // that.uploadFileList.push()
        // alert(data);
      }
    });

    if (txtMwqFileUpload.value != 'undefined') {
      txtMwqFileUpload.value = null;
    }
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

  uploadDuplicateFiles(fileName) {
    this.toastr.error(fileName, " Duplicate files are not allowed");
  }

  dataEntrySave(sampleInformation) {

    let jsonMwqDataEntryInfo = this.localStore.store.get(this.dataEntryKey);
    let dataEntry = jsonMwqDataEntryInfo.data;

    dataEntry[this.uploadFilesInfoKey] = sampleInformation;
    
    if(sampleInformation.dataEntryComments!= undefined){
      console.log("-----sampleInformation----" + JSON.stringify(sampleInformation.dataEntryComments));
    }
    else{
      this.sampleInformation.dataEntryComments=" ";
      console.log("-----sampleInformation----" + JSON.stringify(sampleInformation.dataEntryComments));
    }
    this.js["jsonInput"] = dataEntry;
    let isValid = this.doValidate(dataEntry);
    // this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    //console.log("At microBiologySiteDateSave Screen ----------" + JSON.stringify(this.js));
    //console.log("jsonMwqDataEntryInfo ------" + JSON.stringify(jsonMwqDataEntryInfo));
    if (isValid) {
      this.saveMwqData(this.js);
    }
    // console.log("jsonMwqDataEntryInfo ------" + JSON.stringify(this.js));
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
      console.log("----saveMwqDataEntryResp----", this.saveMwqDataEntryResp, this.saveMwqDataEntryResp.loadDataResult.Status);
      if (this.saveMwqDataEntryResp.loadDataResult.Status === "Success") {
        this.toastr.success(this.saveMwqDataEntryResp.loadDataResult.Message, "Success");
        this.route.navigate(["mwqDataQc", "qc-info"]);
      }
      else {
        this.toastr.error(this.saveMwqDataEntryResp.loadDataResult.Message);
      }
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
            /*     isRequired.push(subItem);
                popMessage.push(subItem + " is required from " + item);
                requiredObj[item].push(subItem); */
            if (subRow === "") {
              isRequired.push(subItem);
              popMessage.push(subItem + " is required from " + item);
              requiredObj[item].push(subItem);
            }
          }
          // console.log("\n\n");
          // // http://voidcanvas.com/make-console-log-output-colorful-and-stylish-in-browser-node/
          // console.log("%c" + item, "color: #c00; font-weight: bold; text-transform: uppercase;");
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
        "Failed to submit! Please fill the required fields",
        { toastLife: 30000, allowHtml: true, }
      );
    }
    if (isRequired.length === 0) {
      return true
    }
    return false;
  }
}
