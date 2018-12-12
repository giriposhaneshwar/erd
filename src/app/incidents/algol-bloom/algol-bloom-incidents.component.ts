import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';

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

  constructor(private pageTitleService: PageTitleService) {
    this.fetch((data) => {
      this.selectedValue = [data[2]];
      this.buoysIncidentRows = data;
    });
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
