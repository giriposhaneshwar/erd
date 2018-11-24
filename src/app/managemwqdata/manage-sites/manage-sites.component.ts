import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { ManageMwqDataService } from '../managemwqdata.service';

@Component({
  selector: 'ms-manage-sites',
  templateUrl: './manage-sites.component.html',
  styleUrls: ['./manage-sites.component.scss']
})
export class ManageSitesComponent implements OnInit {

  editing = {};
  sitesListDetails = [];
  sitesListResp: any;

  constructor(private pageTitleService: PageTitleService,private http: HttpClient, 
    private manageMwqDataService: ManageMwqDataService) 
  {
     this.loadSitesList();
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }

  loadSitesList() {
    this.manageMwqDataService.fetchSitesList().subscribe((resp) => {
      this.sitesListResp = resp;
      this.sitesListDetails = this.sitesListResp.GetSitesListResult.SiteLists;
      console.log("----sitesListDetails----", this.sitesListDetails);
    });
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
     this.sitesListDetails[rowIndex][cell] = event.target.value;
    this.sitesListDetails = [...this.sitesListDetails];
    console.log('UPDATED!', this.sitesListDetails[rowIndex][cell]);
  }

}
