import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ManageMwqDataService } from '../managemwqdata.service';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-manage-vendor-details',
  templateUrl: './manage-vendor-details.component.html',
  styleUrls: ['./manage-vendor-details.component.scss']
})
export class ManageVendorDetailsComponent implements OnInit {

  editing = {};
  mondalOpen: any;
  vendorsListDetails = [];
  venodrsListResp: any;
  vendorsListResultStatus:any;
  vendorsListResultStatusMessage:any;
  modalShowWindow: Boolean = false;
  vendorInfo: any = {
    vendorName: "", emailId: "", phNum: "", adress: "", status: ""
  };
  vendorInfoResp: any;
  @ViewChild(NgForm) f: NgForm;

  constructor(private pageTitleService: PageTitleService, private http: HttpClient,
    public toastr: ToastsManager, vcr: ViewContainerRef,private spinner: NgxSpinnerService,
    private manageMwqDataService: ManageMwqDataService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.loadVendorsList();
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
    this.spinner.show();
  }

  loadVendorsList() {
    this.manageMwqDataService.fetchVendorsList().subscribe((resp) => {
      this.venodrsListResp = resp;
      this.vendorsListDetails = this.venodrsListResp.GetVendorsListResult.VendorsList;
      this.vendorsListResultStatus = this.venodrsListResp.GetVendorsListResult.Status;

      console.log("----vendorsListDetails----", this.vendorsListDetails);
      console.log(this.vendorsListResultStatus, this.venodrsListResp.GetVendorsListResult.VendorsList.length,
        this.venodrsListResp.GetVendorsListResult.Message);
      if (this.vendorsListResultStatus === 'Success') {
        if (this.vendorsListDetails.length > 0) {
          this.vendorsListDetails = this.venodrsListResp.GetVendorsListResult.VendorsList;
          this.spinner.hide();
        } else {
          this.vendorsListDetails = [];
          this.vendorsListResultStatusMessage = "Vendor information not available";
          this.spinner.hide();
        }
      }
      else if (this.vendorsListResultStatus === 'Failed') {
        console.log("Error occured");
        this.vendorsListResultStatusMessage = this.venodrsListResp.GetVendorsListResult.Message;
        this.spinner.hide();
      }

    });
  }

  createVendor(vendorInfo) {
    console.log(JSON.stringify(vendorInfo));
    this.manageMwqDataService.addVendorInfo(vendorInfo).subscribe((resp) => {
      this.vendorInfoResp = resp;
      console.log("----vendorInfoResp----", this.vendorInfoResp);
      if (this.vendorInfoResp.VendorCreateResult === 'sucess') {
        //this.newBloomIncidentResp ="Incident Created Successfully"
        this.toastr.success("Vendor Inoformation Created Successfully");
        this.f.resetForm();
        this.closeModal();
        this.loadVendorsList();
      }
      else {
        // this.newBloomIncidentResp ="Incident Created failed"
        this.toastr.error(this.vendorInfoResp.VendorCreateResult, "Vendor Information Cration Failed");
      }
    });
  }

  updateValue(event, cell, rowIndex, row) {
    console.log('inline editing rowIndex', rowIndex, row.sNo)
    this.editing[rowIndex + '-' + cell] = false;
    this.vendorsListDetails[rowIndex][cell] = event.target.value;
    this.vendorsListDetails = [...this.vendorsListDetails];
    let updatedStatus = this.vendorsListDetails[rowIndex][cell];
    let updatedId = row.sNo;
    this.manageMwqDataService.updatVendorStatus(updatedId, updatedStatus).subscribe((resp) => {
      console.log("----VendorStatusUpdateResult----", resp);
      this.venodrsListResp = resp;
       if (this.venodrsListResp.VendorStatusUpdateResult === 'success') {
        console.log('UPDATED!', updatedId, updatedStatus, this.venodrsListResp.VendorStatusUpdateResult,this.vendorsListDetails[rowIndex][cell]);
        this.toastr.success("Vendor Information Updated Successfully");
      }
      else {
        this.toastr.error(this.venodrsListResp.VendorStatusUpdateResult, "Vendor Information Updation Failed");
        console.log('UPDATE Failed!', updatedId, updatedStatus, this.venodrsListResp.VendorStatusUpdateResult);
      } 
    });
  }

  addTableRow() {
    this.openModal();
  }
  siteDatePrev() { }
  openModal() {
    this.modalShowWindow = true;
  }
  closeModal() {
    this.modalShowWindow = false;
    this.f.resetForm();
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
