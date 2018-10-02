import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import { fadeInAnimation } from '../core/route-animation/route.animation';


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

  constructor(private pageTitleService: PageTitleService) {
    this.fetch((data) => {
      this.ngDatarows = data;
      this.ngDatarows.map((n, i) => {
        n["color"] = "#c00";
      });
      console.log("this.ngDatarows", this.ngDatarows);
    });
  }

  ngOnInit() {
    this.pageTitleService.setTitle("BUOYS Dashboard");
  }
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/buoys.json`);

    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };
    req.send();
  }
}
