import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import { fadeInAnimation } from '../core/route-animation/route.animation';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BuoysDashboardService } from './buoysdashboard.service';
import * as moment from 'moment';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "ms-buoysdashboard",
  templateUrl: "./buoysdashboard.component.html",
  styleUrls: ["./buoysdashboard.component.scss"],
  host: {
    "[@fadeInAnimation]": "true"
  },
  animations: [fadeInAnimation]
})
export class BuoysdashboardComponent implements OnInit {

  ngDatarows = [];
  mondalOpen: Boolean = false;
  dateval = '';
  date: Date;
  res: any;
  restItems: any = [];
  getTestMethodResult = {};
  radioGroup: any = null;
  fromDateFilter: any;
  toDateFilter: any;
  resultStatus: any;
  resultStatusMessage: any;
  height = 2;
  color = "#4092F1";
  runInterval = 300;
  todayDate: any;
  fromDate: any;
  toDate: any;
  startMinDate: any;
  startMaxDate: any;
  endMinDate: any;
  endMaxDate: any;
  isDisabled: boolean = true;
  mouseWheelDir:any;
  event:any;
  
  handleFormChange(data) {
    if (data == "lastModified") {
      this.spinner.show();
      console.log(" Last Modified ", moment().startOf('hour').fromNow());
      this.showBuoysDashboardData(this.fromDate, this.toDate);
      this.isDisabled = true;
    }
    else if (data == "currentDay") {
      this.spinner.show();
      this.fromDate = moment().format('YYYY-MM-DD');
      this.toDate = moment().format('YYYY-MM-DD');
      console.log(" Current Day " + this.fromDate, this.toDate);
      this.showBuoysDashboardData(this.fromDate, this.toDate);
      this.isDisabled = true;
    }
    else if (data == "lastoneweek") {
      this.spinner.show();
      this.fromDate = moment().subtract(7, "days").format("YYYY-MM-DD");
      this.toDate = moment().format('YYYY-MM-DD');
      console.log(" Last 1 Week" + this.fromDate, this.toDate);
      this.showBuoysDashboardData(this.fromDate, this.toDate);
      this.isDisabled = true;
    }
    else if (data == "lasttwoweeks") {
      this.spinner.show();
      this.fromDate = moment().subtract(14, "days").format("YYYY-MM-DD");
      this.toDate = moment().format('YYYY-MM-DD');
      console.log(" Last 2 Week" + this.fromDate, this.toDate);
      this.showBuoysDashboardData(this.fromDate, this.toDate);
      this.isDisabled = true;
    }
    else if (data == "lastOneMonth") {
      this.spinner.show();
      this.fromDate = moment().subtract(30, "days").format("YYYY-MM-DD");
      this.toDate = moment().format('YYYY-MM-DD');
      console.log(" Last 30 Days" + this.fromDate, this.toDate);
      this.showBuoysDashboardData(this.fromDate, this.toDate);
      this.isDisabled = true;
    }
    else if (data == "lastTwoMonths") {
      this.spinner.show();
      this.fromDate = moment().subtract(60, "days").format("YYYY-MM-DD");
      this.toDate = moment().format('YYYY-MM-DD');
      console.log(" Last 60 Days" + this.fromDate, this.toDate);
      this.showBuoysDashboardData(this.fromDate, this.toDate);
      this.isDisabled = true;
    }
    else if (data == "lastThreeMonths") {
      this.spinner.show();
      this.fromDate = moment().subtract(90, "days").format("YYYY-MM-DD");
      this.toDate = moment().format('YYYY-MM-DD');
      console.log(" Last 90 Days" + this.fromDate, this.toDate);
      this.showBuoysDashboardData(this.fromDate, this.toDate);
      this.isDisabled = true;
    }
    else if (data == "choosePeriod") {
      this.isDisabled = false;
      console.log("Data Submit", data);
      console.log(" Last selected Dates" + this.fromDate, this.toDate);
      this.chooseDatesPeriod(this.fromDate, this.toDate);
    }
  }

  chooseDatesPeriod(fromDateFilter, toDateFilter) {
    console.log("Selected From Date", fromDateFilter, "Selected To Date", toDateFilter);
    this.spinner.show();
    this.showBuoysDashboardData(fromDateFilter, toDateFilter);
  }

  constructor(private pageTitleService: PageTitleService, private http: HttpClient,
    private buoysDashboardService: BuoysDashboardService, private loadingBar: LoadingBarService,
    private spinner: NgxSpinnerService) {
    this.fromDate = moment().subtract(90, "days").format("YYYY-MM-DD");
    this.toDate = moment().subtract(60, "days").format("YYYY-MM-DD");
    this.showBuoysDashboardData(this.fromDate, this.toDate);
  }

  ngOnInit() {
    this.dateForamt();
    this.pageTitleService.setTitle("Marine Water Quality Management System");
    this.todayDate = setInterval(() => {

    }, 900000);
    this.spinner.show();
    /** spinner ends after 5 seconds */

    /*    setTimeout(() => {
         this.spinner.hide();
       }, 5000); */
  }

  mondalWindowOpen(selector: String) {
    this.mondalOpen = true;
  }
  mondalWindowDestroy(selector: String) {
    this.mondalOpen = false;
  }

  showBuoysDashboardData(fromDate, toDate): void {
    this.buoysDashboardService.buoysDashboardData(fromDate, toDate).subscribe((resp) => {
      this.res = resp;
      this.resultStatus = this.res.getAveragevalueResult.status;
      console.log(this.resultStatus, this.res.getAveragevalueResult.AvgList.length);
      if (this.resultStatus === 'Success') {
        this.restItems = this.res.getAveragevalueResult.AvgList;
        this.resultStatusMessage = this.res.getAveragevalueResult.message;
        if (this.restItems.length > 0) {
          let obj = [];
          for (let item in this.restItems) {
            let nItem = {};
            for (let key in this.restItems[item]) {
              let rowItem = this.restItems[item][key];
              if (rowItem == "" || rowItem == null) {
                rowItem = "-";
              }
              nItem[key] = rowItem;
            }
            obj.push(nItem);
          }
          this.restItems = obj;
          this.spinner.hide();
        } else {
          this.restItems = [];
          this.spinner.hide();
        }
      }
      else if (this.resultStatus === 'Failed') {
        console.log("Error occured");
        this.resultStatusMessage = this.res.getAveragevalueResult.message;
        this.spinner.hide();
      }
    });
  }

  dateForamt() {
    this.dateval = moment().format('YYYY-MM-DD'); // Gets today's date
    console.log("-------todayDate---------", this.dateval)
  }

  dateRangeValidate(dt, field) {
   // console.log("Getting Min Dat", field, dt);
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

  mouseWheelUpFunc(evt) {
    this.mouseWheelDir = 'upward direction';
  }

  mouseWheelDownFunc(evt) {
    this.mouseWheelDir = 'downward direction';
  }
}
