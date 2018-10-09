import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import { fadeInAnimation } from '../core/route-animation/route.animation';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ms-buoysdashboard',
  templateUrl: './buoysdashboard.component.html',
  styleUrls: ['./buoysdashboard.component.scss'],
  // encapsulation: ViewEncapsulation.Native,
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class BuoysdashboardComponent implements OnInit {
  ngDatarows = [];

  /*columns = [
    { name: 'Site Name' },
    { name: 'Temparature' },
    { name: 'Blue Green Algae' },
    { name: 'Conductivity' },
    { name: 'Battery' },
    { name: 'Cholorophyll A' },
    { name: 'Salinity' },
    { name: 'DOmgl' },
    { name: 'pH' },
    { name: 'Efficiency' }
   ];
*/

  constructor(private pageTitleService: PageTitleService, private http: HttpClient) {

    this.getRestItems();
    /*this.fetch((data) => {
      this.ngDatarows = data;
      this.ngDatarows.map((n, i) => {
        n["color"] = "#c00";
      });
      console.log("this.ngDatarows", this.ngDatarows);
    });*/
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }
  /* fetch(cb) {
     const req = new XMLHttpRequest();
     //req.open('GET', `assets/data/buoys.json`);
     req.open('GET', `http://10.56.84.178/mwqwebservice/MWQSitesRestServices.svc/CalculateOEE/20180108/20181010`);
 //debugger;
     req.onload = () => {
       const data = JSON.parse(req.response.BuoysList);
       console.log("---data------", data);
       //cb(data);
     };
     req.send();
   }*/

  restItems: any;
  //restItemsUrl = 'http://10.56.84.178/mwqwebservice/MWQSitesRestServices.svc/CalculateOEE/20180108/20181010';
  restItemsUrl = 'assets/data/buoys.json';

  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          if(restItems != undefined && restItems.Status === "Success"){
            if(restItems.BuoysList != undefined && restItems.BuoysList.length > 0 ){
              this.restItems = restItems.BuoysList;
            }else{
              this.restItems = [];
            }
          }
          console.log("----restItems----", restItems);
        }
      )
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(this.restItemsUrl)
      .pipe(map(data => data));
  }
}
