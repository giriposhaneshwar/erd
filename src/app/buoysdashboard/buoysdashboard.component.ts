import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import { fadeInAnimation } from '../core/route-animation/route.animation';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BuoysDashboardService } from './buoysdashboard.service';
import * as moment from 'moment';
import { LoadingBarService } from '@ngx-loading-bar/core';

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
  todayDate: any;
  date: Date;
  res: any;
  restItems: any = [];
  getTestMethodResult = {};
  radioGroup: any = null;
  fromDateFilter: any;
  toDateFilter: any;
  resultStatus: any;

  height = 2;
  color = "#4092F1";
  runInterval = 300;

  handleFormChange(data) {
    if (data == "lastModified") {
      console.log(" Last Modified ", moment().startOf('hour').fromNow());
    }
    else if (data == "currentDay") {
      console.log(" Current Day ", moment().format('L'));
      console.log("Data Submit", data);
    }
    else if (data == "lastoneweek") {
      console.log(" Last 1 Week " + moment().subtract(7, 'days').calendar());
      console.log("Data Submit", data);
    }
    else if (data == "lasttwoweeks") {
      console.log(" Last 2 Weeks " + moment().subtract(14, 'days').calendar());
      console.log("Data Submit", data);
    }
    else if (data == "lastOneMonth") {
      console.log(" Last OneMonth " + moment().subtract(30, 'days').calendar());
      console.log("Data Submit", data);
    }
    else if (data == "lastTwoMonths") {
      console.log(" Last  Two Months " + moment().subtract(60, 'days').calendar());
      console.log("Data Submit", data);
    }
    else if (data == "lastThreeMonths") {
      console.log(" Last  Three Months " + moment().subtract(60, 'days').calendar());
      console.log("Data Submit", data);
    }
    else if (data == "choosePeriod") {
      console.log("Data Submit", data);
      // this.chooseDatesPeriod(fromDateFilter,toDateFilter);
    }
  }

  chooseDatesPeriod(fromDateFilter, toDateFilter) {
    console.log("Selected From Date", fromDateFilter, "Selected To Date", toDateFilter);
    this.showBuoysDashboardData(fromDateFilter, toDateFilter);
  }

  constructor(private pageTitleService: PageTitleService, private http: HttpClient,
    private buoysDashboardService: BuoysDashboardService, private loadingBar: LoadingBarService) {
    var fromDate = moment().subtract(695, "days").format("YYYY-MM-DD");
    let toDate = moment().subtract(690, "days").format("YYYY-MM-DD");

    console.log(" Current Day " + toDate);
    console.log(" Last 700 Days " + fromDate);
    this.showBuoysDashboardData(fromDate, toDate);
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
    this.todayDate = setInterval(() => {
    }, 900000);
  }

  mondalWindowOpen(selector: String) {
    this.mondalOpen = true;
  }
  mondalWindowDestroy(selector: String) {
    this.mondalOpen = false;
  }

  showBuoysDashboardData(fromDate, toDate): void {
    this.emitStart();
    this.buoysDashboardService.buoysDashboardData(fromDate, toDate).subscribe((resp) => {
      //this.restItems = resp;
      this.res = resp;
      this.resultStatus = this.res.getAveragevalueResult.status;
      console.log(this.resultStatus);
      this.restItems = this.res.getAveragevalueResult.AvgList;
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
    });
    this.emitStop();
  }

  emitStart() {
    console.log("-emitStart----");
    this.loadingBar.start();
  }

  emitStop() {
    this.loadingBar.stop();
  }

  emitComplete() {
    this.loadingBar.complete();
  }
}
