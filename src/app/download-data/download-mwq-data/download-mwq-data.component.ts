import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { fadeInAnimation } from 'app/core/route-animation/route.animation';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { DownloadMwqDataService } from './download-mwq-data.service';
import { DownloadDataService } from '../download-data.service';

@Component({
  selector: 'ms-download-mwq-data',
  templateUrl: './download-mwq-data.component.html',
  styleUrls: ['./download-mwq-data.component.scss'],
 
})
export class DownloadMwqDataComponent implements OnInit {
  mondalOpen : any;
  dateval ='';
  downloadMwqDataDetails = [];
  downloadMwqDataResp: any;
  constructor(
    private pageTitleService: PageTitleService,
    private http: HttpClient,
    private excelService: DownloadMwqDataService,
    private downloadDataService: DownloadDataService) {
      this.dateForamt();
    this.downloadMwqData();
   }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }
  dateForamt() {
    this.dateval = moment().format('YYYY-MM-DD'); // Gets today's date
    console.log("-------todayDate---------",this.dateval)
  }
 

  downloadMwqData() {
    this.downloadDataService.downloadMwqData().subscribe((resp) => {
      this.downloadMwqDataResp = resp;
      this.downloadMwqDataDetails = this.downloadMwqDataResp.GetMWQDownloadDataResult.MWQList;
      console.log("----downloadMwqDataDetails----", this.downloadMwqDataDetails);
    });
  }



  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.downloadMwqDataDetails, 'MWQ_Data');
  }
}
