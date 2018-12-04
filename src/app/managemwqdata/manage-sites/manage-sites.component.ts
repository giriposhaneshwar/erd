import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { ManageMwqDataService } from '../managemwqdata.service';
import { MwqDataEntryService } from 'app/mwq-data-entry/mwq-data-entry.service';

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
    siteId: "", siteCode: "", siteName: "", categoryId:"", categoryName: "", 
    description: "",x:"",y:"",waterqualityRegionId:"",comment:"",projectid:"", createdBy: "Admin",
    status: ""
  };

  siteCategory = [];
  siteCategoryResp: any;

  projectNamesDetails = [];
  projectNamesResp: any;

  constructor(private pageTitleService: PageTitleService, private http: HttpClient,
    private manageMwqDataService: ManageMwqDataService, private mwqDataEntryService: MwqDataEntryService) {
    this.loadSitesList();
   
    this.loadSiteCategoryData();
    this.loadProjectNames();
  }
  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Mana,gement System");
  }
  loadSitesList() {
    this.manageMwqDataService.fetchSitesList().subscribe((resp) => {
      this.sitesListResp = resp;
      this.sitesListDetails = this.sitesListResp.GetSitesListResult.SiteLists;
      console.log("----sitesListDetails----", this.sitesListDetails);
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
      console.log("----SitesStatusUpdateResult----", resp);
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
  }
  createSite(siteInfo) {
    console.log(JSON.stringify(siteInfo));
   /*  this.manageMwqDataService.addSiteInfo(siteInfo).subscribe((resp) => {
      let siteInfoResp = resp;
      console.log("----siteInfoResp----", siteInfoResp);
    }); */
  }
}
