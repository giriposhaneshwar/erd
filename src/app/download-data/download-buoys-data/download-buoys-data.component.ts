import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { DownloadBuoysDataService } from './download-buoys-data.service';
import { DownloadDataService } from '../download-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastsManager } from 'ng6-toastr';

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
  fromDateFilter: any;
  toDateFilter: any;
  startMinDate: any;
  startMaxDate: any;
  endMinDate: any;
  endMaxDate: any;
  mouseWheelDir: string = '';
  event: any;
  selectedBuoysDataDetails = [];
  rows = [];  
  isDisabled: boolean = true;
  columns = [];


  constructor(private pageTitleService: PageTitleService,
    private http: HttpClient,
    private excelService: DownloadBuoysDataService,
    private downloadDataService: DownloadDataService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private spinner: NgxSpinnerService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.dateForamt();
    this.fromDate = moment().subtract(90, "days").format("YYYY-MM");
    this.toDate = moment().format("YYYY-MM");
    console.log("-------this.fromDate, this.toDate---------", this.fromDate, this.toDate);
    this.downloadBUOYSDataList(this.fromDate, this.toDate);

    this.columns = [
      {
        prop: 'selected',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        headerCheckboxable: true,
        checkboxable: true,
        width: 30
      },
      { prop: 'siteName', name: 'Site Name', width: '150' },
      { prop: 'temparature', name: 'Temparature', width: '150' },
      { prop: 'blueGreenAlgae', name: 'Blue Green Algae', width: '200' },
      { prop: 'conductivity', name: 'Conductivity', width: '150' },
      { prop: 'battary', name: 'Battery', width: '150' },
      { prop: 'cholorophyllA', name: 'CholorophyllA', width: '150' },
      { prop: 'salinity', name: 'Salinity', width: '100' },
      { prop: 'dosat', name: 'Dosat', width: '100' },
      { prop: 'doxy', name: 'Doxy', width: '100' },
      { prop: 'ph', name: 'ph', width: '100' },
      { prop: 'createddate', name: 'Createddate', width: '200' }
    ];
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
    console.log("-----fromDateFilter, toDateFilter----" + fromDateFilter, toDateFilter);
    if (fromDateFilter !== undefined && toDateFilter !== undefined) {
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
          this.downloadBUOYSDataDetails = [];
          this.spinner.hide();
        }
      });
    }
    else {
      console.log("Dates are empty");
      this.toastr.error("From Date & Todate is mandatory");
      this.downloadBUOYSDataResultStatusMessage = "From Date & Todate is mandatory, Please provide the valid input for From Date & To Date";
      this.downloadBUOYSDataDetails = [];
      this.spinner.hide();
    }
  }

  //Adde below event function 
  /*   onSelect(row) {
      this.selectedBuoysDataDetails = row.selected;
    }
  
    exportAsXLSX(): void {
      this.excelService.exportAsExcelFile(this.selectedBuoysDataDetails, 'BUOYS_Data');
    } */


  //Adde below event function 
  onSelect(row) {
    this.selectedBuoysDataDetails = row.selected;
    if (this.selectedBuoysDataDetails.length > 0) {
      this.isDisabled = false;
    }
    else {
      this.isDisabled = true;
    }
  }

  exportAsXLSX(): void {
    console.log(this.selectedBuoysDataDetails.length);
    if (this.selectedBuoysDataDetails.length > 0) {
      this.excelService.exportAsExcelFile(this.selectedBuoysDataDetails, 'BUOYS_Data');
    }
    else {
      this.toastr.error("To Export the data, Please check any of the record");
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


  mouseWheelUpFunc(evt) {
    this.mouseWheelDir = 'upward direction';
  }

  mouseWheelDownFunc(evt) {
    this.mouseWheelDir = 'downward direction';
  }
}
