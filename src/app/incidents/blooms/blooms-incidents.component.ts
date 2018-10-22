import { Component, OnInit,ViewChild } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from '../../core/route-animation/route.animation';
import { DatatableComponent } from '@swimlane/ngx-datatable';

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
  lat: number = 51.678418;
  lng: number = 7.809007;

  bllomIncidentRows = [];
  selectedRow = [];
  temp = [];

  columns: any[] = [
    { prop: 'bloomIncidentId'} , 
    { name: 'Incident Description' }, 
    { name: 'Incident Reported DateTime' },
    { name: 'Incident Severity' }

  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private pageTitleService: PageTitleService) { 
    this.fetch((data) => {
      this.temp = [...data];
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

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
      const temp = this.temp.filter(function(d) {
      return d.incidentDescription.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.bllomIncidentRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
