import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import { fadeInAnimation } from '../core/route-animation/route.animation';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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


  handleFormChange(data) {

    if (data == "lastModified") {
      console.log("Data Submit", data);
    }
    else if (data == "currentDay") {
      console.log("Data Submit", data);
    }
    else if (data == "lastoneweek") {
      console.log("Data Submit", data);
    }
    else if (data == "lasttwoweeks") {
      console.log("Data Submit", data);
    }
    else if (data == "lastOneMonth") {
      console.log("Data Submit", data);
    }
    else if (data == "lastTwoMonths") {
      console.log("Data Submit", data);
    }
    else if (data == "lastThreeMonths") {
      console.log("Data Submit", data);
    }
    else if (data == "choosePeriod") {
      console.log("Data Submit", data);
    }
  }

  constructor(private pageTitleService: PageTitleService, private http: HttpClient) {
    this.getRestItems();
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }

  getRestItemsResponse: any = {
    BuoysList: [],
    Status: null,
    Message: ""
  };
  restItems: any = [];
  //restItemsUrl = 'http://10.56.84.178/mwqwebservice/MWQSitesRestServices.svc/CalculateOEE/20181009/20181009';
  restItemsUrl = "assets/data/buoys.json";

  getRestItems(): void {
    this.restItemsServiceGetRestItems().subscribe(restItems => {
      this.getRestItemsResponse = restItems;
      if (
        this.getRestItemsResponse != undefined &&
        this.getRestItemsResponse.hasOwnProperty("Status")
      ) {
        if (
          this.getRestItemsResponse.Status === "Success" &&
          this.getRestItemsResponse.hasOwnProperty("BuoysList")
        ) {
          if (
            this.getRestItemsResponse.BuoysList != undefined &&
            this.getRestItemsResponse.BuoysList.length > 0
          ) {
            this.restItems = this.getRestItemsResponse.BuoysList;
          }
        }
      }
      // console.log("----restItems----", this.restItems);
    });
  }

  mondalWindowOpen(selector: String) {
    this.mondalOpen = true;
  }
  mondalWindowDestroy(selector: String) {
    this.mondalOpen = false;
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems() {
    return this.http.get<any[]>(this.restItemsUrl).pipe(map(data => data));
  }
}
