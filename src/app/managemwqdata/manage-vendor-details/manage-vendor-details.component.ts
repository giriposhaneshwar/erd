import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ManageMwqDataService } from '../managemwqdata.service';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr';

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
  modalShowWindow: Boolean = false;
  vendorInfo: any = {
    vendorName: "", emailId: "", phNum: "", adress: "", status: ""
  };
  vendorInfoResp: any;
  @ViewChild(NgForm) f: NgForm;

  constructor(private pageTitleService: PageTitleService, private http: HttpClient,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private manageMwqDataService: ManageMwqDataService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.loadVendorsList();
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }

  loadVendorsList() {
    this.manageMwqDataService.fetchVendorsList().subscribe((resp) => {
      this.venodrsListResp = resp;
      this.vendorsListDetails = this.venodrsListResp.GetVendorsListResult.VendorsList;
      console.log("----vendorsListDetails----", this.vendorsListDetails);
    });
  }

  createVendor(vendorInfo) {
    console.log(JSON.stringify(vendorInfo));
    this.manageMwqDataService.addVendorInfo(vendorInfo).subscribe((resp) => {
      this.vendorInfoResp = resp;
      console.log("----vendorInfoResp----", this.vendorInfoResp);
      if (this.vendorInfoResp.VendorCreateResult === 'sucess') {
        //this.newBloomIncidentResp ="Incident Created Successfully"
        this.toastr.success(this.vendorInfoResp.VendorCreateResult, "Vendor Created Successfully");
        this.f.resetForm();
        this.closeModal();
        this.loadVendorsList();
      }
      else {
        // this.newBloomIncidentResp ="Incident Created failed"
        this.toastr.error(this.vendorInfoResp.VendorCreateResult, "Vendor Created failed");
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
    });
    console.log('UPDATED!', this.vendorsListDetails[rowIndex][cell]);
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
