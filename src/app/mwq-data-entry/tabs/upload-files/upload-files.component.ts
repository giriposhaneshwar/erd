import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../../../appConfiguration/config';

import { AppStorageService } from "../../../appConfiguration/app-config.service";
import { ToastsManager, ToastOptions } from "ng6-toastr/ng2-toastr";

@Component({
  selector: 'ms-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  module: String;
  constructor(public route: Router, public config: Config,
    public toastr: ToastsManager,
    public localStore: AppStorageService,
    vcr: ViewContainerRef) { 
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    let mod = this.config.getModuleName();
    this.module = mod.module;
  }

  siteDateSave() {
    if(this.module == "mwqDataEntry"){
      // Save form and finish here
      this.toastr.success('Data Entry Form Submitted Successfully', 'Success!', { toastLife: 10000});
    }else{
      // got to requlst on qc and finsih the form 
    }
    console.log("At Save Screen");
  }

  siteDatePrev() {
    this.route.navigate(["mwqDataEntry", "microbiology"]);
  }
}
