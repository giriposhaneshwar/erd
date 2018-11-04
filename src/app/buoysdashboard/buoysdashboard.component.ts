import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import { fadeInAnimation } from '../core/route-animation/route.animation';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BuoysDashboardService } from './buoysdashboard.service';
import * as moment from 'moment';

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
  }

  constructor(private pageTitleService: PageTitleService, private http: HttpClient,
    private buoysDashboardService: BuoysDashboardService) {
    //this.getRestItems();
    this.getPostItems();
  }



  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
    this.todayDate = setInterval(() => {
    }, 900000);


  }


  res: any;
  restItems: any = [];
  getTestMethodResult = {};
  //restItemsUrl = "assets/data/buoys.json";

  mondalWindowOpen(selector: String) {
    this.mondalOpen = true;
  }
  mondalWindowDestroy(selector: String) {
    this.mondalOpen = false;
  }



  getPostItems(): void {
    this.buoysDashboardService.buoysDashboardData().subscribe((resp) => {
      //this.restItems = resp;
      console.log("----resp----", resp);
      this.res = resp;
      console.log(this.res.getAveragevalueResult.AvgList);
      this.restItems = this.res.getAveragevalueResult.AvgList;
    });
  }
}
