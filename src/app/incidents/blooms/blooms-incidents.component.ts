import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from '../../core/route-animation/route.animation';

@Component({
  selector: 'ms-blooms',
  templateUrl: './blooms-incidents.component.html',
  styleUrls: ['./blooms-incidents.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})

export class BloomsIncidentComponent implements OnInit {
  bllomIncidentRows = [];
  selectedRow = [];

  columns: any[] = [
    { prop: 'bloomIncidentId'} , 
    { name: 'Incident Description' }, 
    { name: 'Incident Reported DateTime' },
    { name: 'Incident Severity' }

  ];

  constructor(private pageTitleService: PageTitleService) { 
    this.fetch((data) => {
      this.selectedRow = [data[2]];
      this.bllomIncidentRows = data;
    });
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Bloom Incidents");
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/blooms_incidents.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selectedRow);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }
}
