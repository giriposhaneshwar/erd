import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { fadeInAnimation } from 'app/core/route-animation/route.animation';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { DownloadMwqDataService } from './download-mwq-data.service';
import { DownloadDataService } from '../download-data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-download-mwq-data',
  templateUrl: './download-mwq-data.component.html',
  styleUrls: ['./download-mwq-data.component.scss'],

})
export class DownloadMwqDataComponent implements OnInit {
  mondalOpen: any;
  dateval = '';
  downloadMwqDataDetails = [];
  downloadMwqDataResp: any;
  downloadMwqDataResultStatus: any;
  downloadMwqDataResultStatusMessage: any;
  fromDate: any;
  toDate: any;
  fromDateFilter:any;
  toDateFilter:any;
  startMinDate: any;
  startMaxDate: any;
  endMinDate: any;
  endMaxDate: any;
  
  constructor(
    private pageTitleService: PageTitleService,
    private http: HttpClient,
    private excelService: DownloadMwqDataService,
    private downloadDataService: DownloadDataService, private spinner: NgxSpinnerService) {
    this.dateForamt();
    this.fromDate = moment().subtract(60, "days").format("YYYY-MM-DD");
    this.toDate = moment().format("YYYY-MM-DD");
    this.downloadMwqData(this.fromDate, this.toDate);
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
    this.spinner.show();
  }


  downloadMwqData(fromDate, toDate) {
    console.log(fromDate, toDate);
    this.downloadDataService.downloadMwqData(fromDate, toDate).subscribe((resp) => {
      this.downloadMwqDataResp = resp;
      this.downloadMwqDataDetails = this.downloadMwqDataResp.GetMWQDownloadDataResult.MWQList;
      this.downloadMwqDataResultStatus = this.downloadMwqDataResp.GetMWQDownloadDataResult.Status;
      console.log(this.downloadMwqDataResultStatus,
        this.downloadMwqDataResp.GetMWQDownloadDataResult.MWQList.length,
        this.downloadMwqDataResp.GetMWQDownloadDataResult.Message);

      if (this.downloadMwqDataResultStatus === 'Success') {
        this.downloadMwqDataResultStatusMessage = "The given dates " + fromDate + " to " + toDate + " MWQ Data not available";
        if (this.downloadMwqDataDetails.length > 0) {
          this.downloadMwqDataDetails = this.downloadMwqDataResp.GetMWQDownloadDataResult.MWQList;
          this.spinner.hide();
        } else {
          this.downloadMwqDataDetails = [];
          this.spinner.hide();
        }
      }
      else if (this.downloadMwqDataResultStatus === 'Failed') {
        console.log("Error occured");
        this.downloadMwqDataResultStatusMessage = this.downloadMwqDataResp.GetMWQDownloadDataResult.Message;
        this.spinner.hide();
      }
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.downloadMwqDataDetails, 'MWQ_Data');
  }

  dateForamt() {
    this.dateval = moment().format('YYYY-MM-DD'); // Gets today's date
    console.log("-------todayDate---------", this.dateval)
  }

  dateRangeValidate(dt, field) {
    console.log("Getting Min Dat", field, dt);
    let stDate = this.fromDateFilter;
    let edDate = this.toDateFilter;
    if (stDate !== undefined) {
      this.endMinDate = stDate;
      this.startMaxDate = this.dateval;
    } else {
      this.startMaxDate = this.dateval;
    }
    if (edDate !== undefined) {
      this.startMaxDate = edDate;
    } else {
      this.endMaxDate = this.dateval;
    }
  }
}
