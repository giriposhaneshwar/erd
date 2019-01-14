import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { DownloadMwqIndicesDataService } from './download-mwq-indices-data.service';
import { DownloadDataService } from '../download-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastsManager } from 'ng6-toastr';
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
  fromDateFilter: any;
  toDateFilter: any;

  startMinDate: any;
  startMaxDate: any;
  endMinDate: any;
  endMaxDate: any;

  mouseWheelDir: string = '';
  event: any;

  selectedMwqIndicesDetails = [];
  //rows = [];
  columns = [];
  selected = [];


  

  

  constructor(private pageTitleService: PageTitleService,
    private http: HttpClient,
    private excelService: DownloadMwqIndicesDataService,
    private downloadDataService: DownloadDataService,
    private spinner: NgxSpinnerService, public toastr: ToastsManager,
    vcr: ViewContainerRef) {
    this.dateForamt();
    this.toastr.setRootViewContainerRef(vcr);
    this.fromDate = moment().subtract(120, "days").format("YYYY-MM-DD");
    this.toDate = moment().format("YYYY-MM-DD");
    console.log(this.fromDate, this.toDate);
    this.downloadMwqIndicesData(this.fromDate, this.toDate);

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
      { prop: 'siteid', name: 'Siteid', width: '200' },
      { prop: 'microbialIndex', name: 'Microbial Index', width: '200' },
      { prop: 'eutrophicationIndex', name: 'Eutrophication Index', width: '200' },
      { prop: 'sedimentIndex', name: 'Sediment Index', width: '200' },
      { prop: 'createdDate', name: 'Month', width: '200' },
    
    ];
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
    if (fromDateFilter !== undefined && toDateFilter !== undefined) {
      if (this.isValidDate(fromDateFilter) && this.isValidDate(toDateFilter)) {
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
      } else {
        console.log("In Valid Dates");
        //this.toastr.error("From Date & To Date is mandatory fields, Please provide the valid input.");
        this.downloadMwqIndicesResultStatusMessage = "From Date & To Date is mandatory fields. Please provide the valid input.";
        this.downloadMwqIndicesDetails = [];
        this.spinner.hide();
      }
    }
    else {
      console.log("Dates are empty");
      this.toastr.error("From Date & Todate is mandatory");
      this.downloadMwqIndicesResultStatusMessage = "From Date & Todate is mandatory, Please provide the valid input for From Date & To Date";
      this.downloadMwqIndicesDetails = [];
      this.spinner.hide();
    }
  }

//Adde below event function 
onSelect(row) {
  this.selectedMwqIndicesDetails = row.selected;
}

//Replace the below function
exportAsXLSX(): void {
  this.excelService.exportAsExcelFile(this.selectedMwqIndicesDetails, 'MWQ_Indices_Data');
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


  mouseWheelUpFunc(evt) {
    this.mouseWheelDir = 'upward direction';
  }

  mouseWheelDownFunc(evt) {
    this.mouseWheelDir = 'downward direction';
  }
}
