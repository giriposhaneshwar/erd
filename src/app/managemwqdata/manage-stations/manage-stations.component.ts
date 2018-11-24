import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ManageMwqDataService } from '../managemwqdata.service';

@Component({
  selector: 'ms-manage-stations',
  templateUrl: './manage-stations.component.html',
  styleUrls: ['./manage-stations.component.scss']
})
export class ManageStationsComponent implements OnInit {

  editing = {};
  //rows = [];
  mondalOpen:any;
  stationsListDetails = [];
  stationsListResp: any;

  constructor(private pageTitleService: PageTitleService,private http: HttpClient, 
    private manageMwqDataService: ManageMwqDataService) 
  {
     this.loaStationsList();
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }

  loaStationsList() {
    this.manageMwqDataService.fetchStationsList().subscribe((resp) => {
      this.stationsListResp = resp;
      this.stationsListDetails = this.stationsListResp.GetStationsListResult.StationLists;
      console.log("----stationsListDetails----", this.stationsListDetails);
    });
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
     this.stationsListDetails[rowIndex][cell] = event.target.value;
    this.stationsListDetails = [...this.stationsListDetails];
    console.log('UPDATED!', this.stationsListDetails[rowIndex][cell]);
  }
}
