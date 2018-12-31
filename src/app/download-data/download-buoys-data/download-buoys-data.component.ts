import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { DownloadBuoysDataService } from './download-buoys-data.service';
import { DownloadDataService } from '../download-data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-download-buoys-data',
  templateUrl: './download-buoys-data.component.html',
  styleUrls: ['./download-buoys-data.component.scss']
})
export class DownloadBuoysDataComponent implements OnInit {
  mondalOpen: any;
  downloadBUOYSDataDetails = [];
  downloadBUOYSDataResp: any;
  downloadBUOYSDataResultStatus: any;
  downloadBUOYSDataResultStatusMessage: any;
  selected = [];
  dateval = '';
  fromDate: any;
  toDate: any;
  fromDateFilter:any;
  toDateFilter:any;
  startMinDate: any;
  startMaxDate: any;
  endMinDate: any;
  endMaxDate: any;

  constructor(private pageTitleService: PageTitleService, private http: HttpClient,
    private excelService: DownloadBuoysDataService,
    private downloadDataService: DownloadDataService,
    private spinner: NgxSpinnerService) {
    this.dateForamt();
    this.fromDate = moment().subtract(90, "days").format("YYYY-MM");
    this.toDate = moment().format("YYYY-MM");
    console.log("-------this.fromDate, this.toDate---------", this.fromDate, this.toDate);
    this.downloadBUOYSDataList(this.fromDate, this.toDate);
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
    this.spinner.show();
  }
  dateForamt() {
    this.dateval = moment().format('YYYY-MM-DD'); // Gets today's date
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

  downloadBUOYSDataList(fromDateFilter, toDateFilter): void {
    console.log("-----fromDateFilter, toDateFilter----"+fromDateFilter, toDateFilter);
    this.downloadDataService.downloadBuoysData(fromDateFilter, toDateFilter).subscribe((resp) => {
      this.downloadBUOYSDataResp = resp;
      this.downloadBUOYSDataDetails = this.downloadBUOYSDataResp.getBuoysdataResult.BuoysList;
      this.downloadBUOYSDataResultStatus = this.downloadBUOYSDataResp.getBuoysdataResult.Status;
      console.log(this.downloadBUOYSDataResultStatus,
        this.downloadBUOYSDataResp.getBuoysdataResult.BuoysList.length,
        this.downloadBUOYSDataResp.getBuoysdataResult.Message);
        this.spinner.hide();
      if (this.downloadBUOYSDataResultStatus === 'Success') {
        this.downloadBUOYSDataResultStatusMessage = "The given dates " + fromDateFilter + " to " + toDateFilter + " BUOYS Data not available";
        if (this.downloadBUOYSDataDetails.length > 0) {
          this.downloadBUOYSDataDetails = this.downloadBUOYSDataResp.getBuoysdataResult.BuoysList;
          this.spinner.hide();
        } else {
          this.downloadBUOYSDataDetails = [];
          this.spinner.hide();
        }
      }
      else if (this.downloadBUOYSDataResultStatus === 'Failed') {
        console.log("Error occured");
        this.downloadBUOYSDataResultStatusMessage = this.downloadBUOYSDataResp.getBuoysdataResult.Message;
        this.spinner.hide();
      }
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.downloadBUOYSDataDetails, 'BUOYS_Data');
  }
}
