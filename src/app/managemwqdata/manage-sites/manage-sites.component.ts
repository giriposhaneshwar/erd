import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { ManageMwqDataService } from '../managemwqdata.service';
import { MwqDataEntryService } from 'app/mwq-data-entry/mwq-data-entry.service';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr';

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

  projectNamesDetails = [];
  projectNamesResp: any;
  msg: any;
  siteInfoResp: any;
  siteInfoUpdateResp: any;
  @ViewChild(NgForm) f: NgForm;

  constructor(private pageTitleService: PageTitleService, private http: HttpClient, public toastr: ToastsManager, vcr: ViewContainerRef,
    private manageMwqDataService: ManageMwqDataService, private mwqDataEntryService: MwqDataEntryService) {
    this.loadSitesList();
    this.toastr.setRootViewContainerRef(vcr);
    this.loadSiteCategoryData();
    this.loadProjectNames();
  }
  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Mana,gement System");
  }

  loadSitesList() {
    this.manageMwqDataService.fetchSitesList().subscribe((resp) => {
      this.sitesListResp = resp;
      //console.log("----this.sitesListResp.GetSitesListResult.Status----", this.sitesListResp.GetSitesListResult.Status);
      if (this.sitesListResp.GetSitesListResult.Status != 'Failed') {
        this.sitesListDetails = this.sitesListResp.GetSitesListResult.SiteLists;
        console.log("----sitesListDetails----", this.sitesListDetails);
      }
      else {
        this.msg = this.sitesListResp.GetSitesListResult.Message;
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
      console.log("----siteInfoUpdateResp----", this.siteInfoUpdateResp.SitesStatusUpdateResult);
      if (this.siteInfoUpdateResp.SitesStatusUpdateResult === 'success') {
        this.msg = this.siteInfoUpdateResp.SitesStatusUpdateResult;
        this.loadSitesList();
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
}
