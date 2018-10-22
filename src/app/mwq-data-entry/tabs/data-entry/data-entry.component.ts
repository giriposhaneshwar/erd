import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "ms-data-entry",
  templateUrl: "./data-entry.component.html",
  styleUrls: ["./data-entry.component.scss"]
})
export class DataEntryComponent implements OnInit {
  radioGroup: any = null;
  excelFile: any;
  importUploadFiles: any;
  webService: any;
  uploadFileName: any;
  constructor(public route: Router) {}

  handleFormChange(data) {
    console.log("Data Submit", data);

    if (data == "manualEntry") {
      this.route.navigate(["mwqDataEntry", "site-details"]);
    }
  }
  cancelDataEntry() {
    this.radioGroup = null;
  }

  uploadFile(data, selector) {
    let files = document.getElementById(selector);
    this.uploadFileName = files.files[0].name;
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

  ngOnInit() {}
}
