import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { DownloadMwqIndicesDataService } from './download-mwq-indices-data.service';
import { DownloadDataService } from '../download-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'ms-download-mwq-indicies-data',
  templateUrl: './download-mwq-indicies-data.component.html',
  styleUrls: ['./download-mwq-indicies-data.component.scss']
})
export class DownloadMwqIndiciesDataComponent implements OnInit {
  mondalOpen: any;
  dateval = '';
  downloadMwqIndicesDetails = [];
  downloadMwqIndicesResp: any;
  downloadMwqIndicesResultStatus: any;
  downloadMwqIndicesResultStatusMessage: any;
  fromDate: any;
  toDate: any;
  fromDateFilter:any;
  toDateFilter:any;
  
  startMinDate: any;
  startMaxDate: any;
  endMinDate: any;
  endMaxDate: any;

  constructor(private pageTitleService: PageTitleService,
    private http: HttpClient,
    private excelService: DownloadMwqIndicesDataService,
    private downloadDataService: DownloadDataService,
    private spinner: NgxSpinnerService) {
    this.dateForamt();
    this.fromDate = moment().subtract(120, "days").format("YYYY-MM-DD");
    this.toDate = moment().format("YYYY-MM-DD");
    console.log(this.fromDate, this.toDate);
    this.downloadMwqIndicesData(this.fromDate, this.toDate);
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
    this.spinner.show();
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

  downloadMwqIndicesData(fromDateFilter, toDateFilter) {
    console.log(fromDateFilter, toDateFilter);
    this.spinner.show();
    this.downloadDataService.downloadIndicesData(fromDateFilter, toDateFilter).subscribe((resp) => {
      this.downloadMwqIndicesResp = resp;
      this.downloadMwqIndicesDetails = this.downloadMwqIndicesResp.getIndicesBetweenDatesResult.IndicesbetdatesList;
      this.downloadMwqIndicesResultStatus = this.downloadMwqIndicesResp.getIndicesBetweenDatesResult.Status;
      this.downloadMwqIndicesResultStatusMessage = this.downloadMwqIndicesResp.getIndicesBetweenDatesResult.Message

      console.log(this.downloadMwqIndicesResultStatus,
        this.downloadMwqIndicesResp.getIndicesBetweenDatesResult.IndicesbetdatesList.length,
        this.downloadMwqIndicesResp.getIndicesBetweenDatesResult.Message);

      if (this.downloadMwqIndicesResultStatus === 'Success') {
        this.downloadMwqIndicesResultStatusMessage = "The given dates " + fromDateFilter + " to " + toDateFilter + " MWQ Indices Data not available";
        if (this.downloadMwqIndicesDetails.length > 0) {
          this.downloadMwqIndicesDetails = this.downloadMwqIndicesResp.getIndicesBetweenDatesResult.IndicesbetdatesList;
          this.spinner.hide();
        } else {
          this.downloadMwqIndicesDetails = [];
          this.spinner.hide();
        }
      }
      else if (this.downloadMwqIndicesResultStatus === 'Failed') {
        console.log("Error occured");
        this.downloadMwqIndicesResultStatusMessage = this.downloadMwqIndicesResp.getIndicesBetweenDatesResult.Message;
        this.spinner.hide();
      }
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.downloadMwqIndicesDetails, 'MWQ_Indices_Data');
  }
}
