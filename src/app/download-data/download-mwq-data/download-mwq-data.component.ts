import { Component, OnInit, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { DownloadMwqDataService } from './download-mwq-data.service';
import { DownloadDataService } from '../download-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastsManager } from 'ng6-toastr';

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
  fromDateFilter: any;
  toDateFilter: any;
  startMinDate: any;
  startMaxDate: any;
  endMinDate: any;
  endMaxDate: any;
  event: any;
  constructor(
    private pageTitleService: PageTitleService,
    private http: HttpClient,
    private excelService: DownloadMwqDataService,
    private downloadDataService: DownloadDataService,
    private spinner: NgxSpinnerService, public toastr: ToastsManager,
    vcr: ViewContainerRef) {
    this.dateForamt();
    this.toastr.setRootViewContainerRef(vcr);
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
    if (fromDate !== undefined && toDate !== undefined) {
      if (this.isValidDate(fromDate) && this.isValidDate(toDate)) {
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
      } else {
        console.log("In Valid Dates");
        this.toastr.error("From Date & To Date is mandatory fields, Please provide the valid input.");
        this.downloadMwqDataResultStatusMessage = "From Date & To Date is mandatory fields. Please provide the valid input.";
        this.downloadMwqDataDetails = [];
        this.spinner.hide();
      }
    }
    else {
      console.log("Dates are empty");
      this.toastr.error("From Date & Todate is mandatory");
      this.downloadMwqDataResultStatusMessage = "From Date & Todate is mandatory, Please provide the valid input for From Date & To Date";
      this.downloadMwqDataDetails = [];
      this.spinner.hide();
    }
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

  /* Validating the user input dates Start*/
  isValidDate(objDate) {
    let inputDate = moment(objDate, 'YYYY/MM/DD');
    let month = inputDate.format('M');
    let day = inputDate.format('D');
    let year = inputDate.format('YYYY');
    let retValue = false;
    if (this.isValid(day, month, year)) {
      return retValue = true;
    }
    else {
      return retValue = false;
    }
  }

  daysInMonth(m, y) { // m is 0 indexed: 0-11
    switch (m) {
      case 1:
        return (y % 4 === 0 && y % 100) || y % 400 === 0 ? 29 : 28;
      case 8: case 3: case 5: case 10:
        return 30;
      default:
        return 31
    }
  }
  
  isValid(d, m, y) {
    if (y >= 1900) {
      return m > 0 && m <= 12 && d > 0 && d <= this.daysInMonth(m, y);
    }
    else {
      this.toastr.error("Invalid Year");
      return false;
    }
  }
  /* Validating the user input dates End*/

  mouseWheelDir: string = '';

  mouseWheelUpFunc(evt) {
    this.mouseWheelDir = 'upward direction';
  }

  mouseWheelDownFunc(evt) {
    this.mouseWheelDir = 'downward direction';
  }
}
