import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AppStorageService } from "../../../appConfiguration/app-config.service";
import { ToastsManager, ToastOptions } from "ng6-toastr/ng2-toastr";

@Component({
  selector: "ms-data-entry",
  templateUrl: "./data-entry.component.html",
  styleUrls: ["./data-entry.component.scss"]
})
export class DataEntryComponent implements OnInit {
  radioGroup: any = null;
  excelFile: any;
  importUploadFiles: any;
  excelFileinput: any;
  webService: any;
  uploadFileName: any;
  dataEntry: any;
  dataEntryKey: String = "dataEntry";
  constructor(
    public route: Router,
    public localStore: AppStorageService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    // this.toastr.success('You are awesome!', 'Success!', { toastLife: 10000, positionClass: "toast-top-center" });
    // this.toastr.error('You are awesome!', 'Failed!', { toastLife: 10000, positionClass: "toast-top-center" });

    // this.localStore.store.delete('user');
    // this.localStore.store.set("user", { id: 1, name: "test" });

    let currentUrl = this.route.url;
    let groupInfo = sessionStorage.getItem("groups");
    let userId = sessionStorage.getItem("userId");

    if (groupInfo === "2" || groupInfo === "20") {
      // this.spinner.show();
      console.log("-----Group Mached-----" + groupInfo, userId, currentUrl);
      this.ngOnInit();
    }
    else {
      console.log("-----Group Not Matched-----" + groupInfo, currentUrl);
      //this.spinner.hide();
      this.route.navigate(["error"]);
    }
  }

  handleFormChange(data) {
    console.log("Data Submit", data);
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    if (data == "manualEntry") {
      this.route.navigate(["mwqDataEntry", "site-details"]);
    }
  }
  cancelDataEntry() {
    this.radioGroup = null;
  }

  uploadFile(selector) {
    let uploadedFile = document.getElementById(selector);
    if (uploadedFile.hasOwnProperty("files")) {
      // this.uploadFileName = uploadedFile.files[0].name;
    } else {
      this.uploadFileName = "";
    }
    this.excelFileinput = this.uploadFileName;
    /* if (files != undefined && files.files != undefined) {
      console.log("Uploaded File", files.files);
      let fd = new FormData();
      if (files.files[0] != undefined) {
        fd.append("file", files.files[0]);
      }
    } */
  }
  importEntryData() {
    if (this.webService != undefined) {
      console.log("At Web Service");
    } else if (this.importUploadFiles != null) {
      console.log("Importing Excel Data");
    } else {
      console.log("notting to process");
    }
  }

  ngOnInit() {
    this.localStore.store.set(this.dataEntryKey, {});
    let localData = this.localStore.store.get(this.dataEntryKey);
    if (localData.status == "success") {
      this.dataEntry = localData.data;
    } else {
      this.dataEntry = {};
    }
  }
}
