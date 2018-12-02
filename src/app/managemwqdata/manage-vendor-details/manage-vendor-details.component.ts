import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ManageMwqDataService } from '../managemwqdata.service';

@Component({
  selector: 'ms-manage-vendor-details',
  templateUrl: './manage-vendor-details.component.html',
  styleUrls: ['./manage-vendor-details.component.scss']
})
export class ManageVendorDetailsComponent implements OnInit {

  editing = {};
  mondalOpen:any;
  vendorsListDetails = [];
  venodrsListResp: any;

  constructor(private pageTitleService: PageTitleService,private http: HttpClient, 
    private manageMwqDataService: ManageMwqDataService) 
  {
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
/* 
  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
     this.vendorsListDetails[rowIndex][cell] = event.target.value;
    this.vendorsListDetails = [...this.vendorsListDetails];
    console.log('UPDATED!', this.vendorsListDetails[rowIndex][cell]);
  } */

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
}
