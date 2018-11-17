import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { Config } from "../../../appConfiguration/config";

import { AppStorageService } from "../../../appConfiguration/app-config.service";
import { ToastsManager, ToastOptions } from "ng6-toastr/ng2-toastr";
import { MwqDataEntryService } from './../../mwq-data-entry.service';

@Component({
  selector: "ms-upload-files",
  templateUrl: "./upload-files.component.html",
  styleUrls: ["./upload-files.component.scss"]
})
export class UploadFilesComponent implements OnInit {

  dataEntry: any;
  dataEntryKey: string = "dataEntry";
  uploadFilesKey: string = "FileUpload";

  module: String;
  uploadFile: any;

  uploadFilesInfo: any = {
    createdBy: "DeptUser_DE",
    dataEntryComments: ""
  };

  constructor(
    public route: Router,
    public config: Config,
    public toastr: ToastsManager,
    public localStore: AppStorageService,
    vcr: ViewContainerRef,
    public api: MwqDataEntryService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    let mod = this.config.getModuleName();
    this.module = mod.module;
  }

  file: any;
  fileChanged(e) {
    this.file = e.target.files[0];
    console.log("File Changed --", this.file.name, this.file.size);
    this.uploadDocument()
  }

  uploadDocument() {

    // files is a FileList object (similar to NodeList)
    

    // object for allowed media types
    var accept = {
      binary: ["image/png", "image/jpeg"],
      text: ["text/plain", "text/css", "application/xml", "text/html"]
    };

    for (var i = 0; i < this.file.length; i++) {
      let file = this.file[i];

      // if file type could be detected
      if (file !== null) {
        let data = file.getAsBinary();
        console.log("---------",data,"---------",this.file);
        /* if (accept.binary.indexOf(file.type) > -1) {
          // file is a binary, which we accept
         
        } else if (accept.text.indexOf(file.type) > -1) {
          // file is of type text, which we accept
          let data = file.getAsText();
          // modify data with string methods
        } */
      }
    }
    /*let fileReader = new FileReader();
    let output: any;
    // fileReader.readAsBinaryString(this.file);
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      output = fileReader.result;
      console.log("---" + fileReader.result);
    }

      var binary = atob(this.file.split(',')[1]);
     var array = [];
     for (var i = 0; i < binary.length; i++) {
       array.push(binary.charCodeAt(i));
     }
     console.log("--------"+array); */
  }

  uploadFileMethod(evt, data) {
    let uploadedFile = evt.target.files;
    let formData = this.localStore.store.get("dataEntry");
    let fd = new FormData();

    if (uploadedFile.length > 1) {
      for (let i = 0; i < uploadedFile.length; i++) {
        let item = uploadedFile[i];
        fd.append("file" + i, item);
      }
    } else {
      fd.append('file', uploadedFile[0]);
    }

    // const dummy = {test: "testing", id: 1, name: "test name"};
    fd.append("dataEntry", JSON.stringify(formData));

    console.log("Uploaded file", evt, data, fd);
    this.api.postFileUpload(fd).subscribe(resp => {
      console.log("----postFileUpload----", resp);
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

  siteDatePrev() {
    this.route.navigate(["mwqDataEntry", "microbiology"]);
  }
}
