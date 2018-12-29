import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { ManageMwqDataService } from '../managemwqdata.service';
import { MwqDataEntryService } from 'app/mwq-data-entry/mwq-data-entry.service';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-manage-sites',
  templateUrl: './manage-sites.component.html',
  styleUrls: ['./manage-sites.component.scss']
})
export class ManageSitesComponent implements OnInit {

  editing = {};
  sitesListDetails = [];
  sitesListResp: any;
  mondalOpen: any;
  modalShowWindow: Boolean = false;

  siteInfo: any = {
    siteId: "", siteCode: "", siteName: "", categoryId: "", categoryName: "",
    description: "", x: "", y: "", waterqualityRegionId: "", comment: "", projectid: "", createdBy: "Admin",
    status: "", defaultSiteValue: ""
  };

  siteCategory = [];
  siteCategoryResp: any;
  sitesListResultStatus: any;
  sitesListResultStatusMessage: any;
  projectNamesDetails = [];
  projectNamesResp: any;
  msg: any;
  siteInfoResp: any;
  siteInfoUpdateResp: any;
  @ViewChild(NgForm) f: NgForm;

  constructor(private pageTitleService: PageTitleService,
    private http: HttpClient, private spinner: NgxSpinnerService,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private manageMwqDataService: ManageMwqDataService,
    private mwqDataEntryService: MwqDataEntryService) {
    this.loadSitesList();
    this.toastr.setRootViewContainerRef(vcr);
    this.loadSiteCategoryData();
    this.loadProjectNames();
  }
  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Mana,gement System");
    this.spinner.show();
  }

  loadSitesList() {
    this.manageMwqDataService.fetchSitesList().subscribe((resp) => {
      this.sitesListResp = resp;
      this.sitesListResultStatus = this.sitesListResp.GetSitesListResult.Status;
      this.sitesListDetails = this.sitesListResp.GetSitesListResult.SiteLists;
      console.log(this.sitesListResultStatus, this.sitesListResp.GetSitesListResult.SiteLists.length,
        this.sitesListResp.GetSitesListResult.Message);
      if (this.sitesListResultStatus === 'Success') {
        if (this.sitesListDetails.length > 0) {
          this.sitesListDetails = this.sitesListResp.GetSitesListResult.SiteLists;
          this.spinner.hide();
        } else {
          this.sitesListDetails = [];
          this.sitesListResultStatusMessage = "Site information not available";
          this.spinner.hide();
        }
      }
      else if (this.sitesListResultStatus === 'Failed') {
        console.log("Error occured");
        this.sitesListResultStatusMessage = this.sitesListResp.GetsitesListResult.Message;
        this.spinner.hide();
      }
    });
  }

  updateValue(event, cell, rowIndex, row) {
    console.log('inline editing rowIndex', rowIndex, row.siteId)
    this.editing[rowIndex + '-' + cell] = false;
    this.sitesListDetails[rowIndex][cell] = event.target.value;
    this.sitesListDetails = [...this.sitesListDetails];
    let updatedStatus = this.sitesListDetails[rowIndex][cell];
    let updatedSiteId = row.siteId;
    let updatedBy = "Admin";
    this.manageMwqDataService.updateSitesStatus(updatedSiteId, updatedBy, updatedStatus).subscribe((resp) => {
      this.siteInfoUpdateResp = resp;
      console.log("----siteInfoUpdateResp----", this.siteInfoUpdateResp);
      if (this.siteInfoUpdateResp.SitesStatusUpdateResult === 'success') {
        console.log('UPDATED!', updatedSiteId, updatedBy, updatedStatus, this.siteInfoUpdateResp.SitesStatusUpdateResult);
        this.toastr.success("Site Information Updated Successfully");
      }
      else {
        this.toastr.error(this.siteInfoUpdateResp.SitesStatusUpdateResult, "Site Information Updation Failed");
        console.log('UPDATE Failed!', updatedSiteId, updatedBy, updatedStatus, this.siteInfoUpdateResp.SitesStatusUpdateResult);
      }
    });
    console.log('UPDATED!', this.sitesListDetails[rowIndex][cell]);
  }

  loadSiteCategoryData() {
    this.mwqDataEntryService.fetchSiteCategoryData().subscribe((resp) => {
      this.siteCategoryResp = resp;
      this.siteCategory = this.siteCategoryResp.getCategoryResult.CategoryList;
      // console.log("----siteCategory----", this.siteCategory);
    });
  }

  loadProjectNames(): void {
    this.mwqDataEntryService.fetchProjectNamesData().subscribe((restItems) => {
      this.projectNamesResp = restItems;
      this.projectNamesDetails = this.projectNamesResp.GetProjectsResult.ProjectList;
      // console.log("----projectNamesDetails----", this.projectNamesDetails);
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

  createSite(siteInfo) {
    console.log(JSON.stringify(siteInfo));
    this.manageMwqDataService.addSiteInfo(siteInfo).subscribe((resp) => {
      this.siteInfoResp = resp;
      console.log("----siteInfoResp----", this.siteInfoResp.SitesCreateResult);
      if (this.siteInfoResp.SitesCreateResult === 'sucess') {
        //this.newBloomIncidentResp ="Incident Created Successfully"
        this.toastr.success(this.siteInfoResp.SitesCreateResult, "Site Created Successfully");
        this.f.resetForm();
        this.closeModal();
        this.loadSitesList();
      }
      else {
        // this.newBloomIncidentResp ="Incident Created failed"
        this.toastr.error(this.siteInfoResp.SitesCreateResult, "Site Created failed");
      }
    });
  }

  numberOnly(evt) {
    //debugger;
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46 && evt.srcElement.value.split('.').length > 1) {
      return false;
    }
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }
}
