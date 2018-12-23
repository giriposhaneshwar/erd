import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { DownloadBuoysDataService } from './download-buoys-data.service';
import { DownloadDataService } from '../download-data.service';

@Component({
  selector: 'ms-download-buoys-data',
  templateUrl: './download-buoys-data.component.html',
  styleUrls: ['./download-buoys-data.component.scss']
})
export class DownloadBuoysDataComponent implements OnInit {
  mondalOpen : any;
  downloadBUOYSDataDetails = [];
  downloadBUOYSDataResp: any;
  selected = [];
  dateval ='';

  constructor(private pageTitleService: PageTitleService,private http: HttpClient, 
    private excelService: DownloadBuoysDataService,
    private downloadDataService: DownloadDataService) {
      this.dateForamt();
      this.downloadBUOYSData();
  }
  

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }
  dateForamt() {
    this.dateval = moment().format('YYYY-MM-DD'); // Gets today's date
    console.log("-------todayDate---------",this.dateval)
  }


  downloadBUOYSData() {
    this.downloadDataService.downloadBuoysData().subscribe((resp) => {
      this.downloadBUOYSDataResp = resp;
      this.downloadBUOYSDataDetails = this.downloadBUOYSDataResp.getBuoysdataResult.BuoysList;
      console.log("----downloadBUOYSDataDetails----", this.downloadBUOYSDataDetails);
    });
  }
  

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.downloadBUOYSDataDetails, 'BUOYS_Data');
  }
}
