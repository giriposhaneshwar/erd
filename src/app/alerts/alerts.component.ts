import { Component, OnInit, ViewChild } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { fadeInAnimation } from '../core/route-animation/route.animation';

@Component({
  selector: 'ms-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class AlertsComponent implements OnInit {
  alertRows = [];
  selected = [];

  columns: any[] = [
    { prop: 'alertId'} , 
    { name: 'Description' }, 
    { name: 'Reported DateTime' },
    { name: 'Severity' }

  ];

  constructor(private pageTitleService: PageTitleService) { 
   this.fetch((data) => {
      this.selected = [data[2]];
      this.alertRows = data;
    });
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/alerts.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

}