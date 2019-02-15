import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-algol-bloom',
  templateUrl: './algol-bloom-incidents.component.html',
  styleUrls: ['./algol-bloom-incidents.component.scss']
})
export class AlgolBloomIncidentsComponent implements OnInit {

  buoysIncidentRows = [];
  selectedValue = [];

  columns: any[] = [
    { prop: 'buoysIncidentId' },
    { name: 'Incident Description' },
    { name: 'Incident Reported DateTime' },
    { name: 'Incident Severity' }
  ];

  constructor(private pageTitleService: PageTitleService,private route: Router,
    private spinner: NgxSpinnerService) {

    let currentUrl = this.route.url;
    let groupInfo = sessionStorage.getItem("groups");
    let username = sessionStorage.getItem("username");

    if (groupInfo === "2" || groupInfo === "20") {
      this.spinner.show();
      console.log("-----Group Mached-----" + groupInfo, username, currentUrl);
      this.fetch((data) => {
        this.selectedValue = [data[2]];
        this.buoysIncidentRows = data;
      });
    }
    else {
      console.log("-----Group Not Matched-----" + groupInfo, currentUrl);
      this.spinner.hide();
      this.route.navigate(["error"]);
    }
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/buoys_incidents.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selectedValue);
  }

  onActivate(event) {
   // console.log('Activate Event', event);
  }

}
