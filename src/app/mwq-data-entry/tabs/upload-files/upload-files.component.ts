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
  module: String;
  uploadFile: any;

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

  uploadFileMethod(evt, data) {
    let uploadedFile = evt.target.files;
    let formData = this.localStore.store.get("dataEntry");
    let fd  = new FormData();

    if(uploadedFile.length > 1){
      for (let i = 0; i < uploadedFile.length; i++) {
        let item = uploadedFile[i];
        fd.append("file" + i, item);
      }
    }else{
      fd.append('file', uploadedFile[0]);
    }
    

    
    // const dummy = {test: "testing", id: 1, name: "test name"};
    fd.append("dataEntry", JSON.stringify(formData));

    console.log("Uploaded file", evt, data, fd);

    this.api.postFileUpload(fd).subscribe(resp => {
      console.log("----postFileUpload----", resp);
    });

  }

  siteDateSave() {
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
