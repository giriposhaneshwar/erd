import { Component, OnInit,ViewChild } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { fadeInAnimation } from '../../core/route-animation/route.animation';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { IncidentsService } from '../incidents.service';

@Component({
  selector: 'ms-buoys-incidents',
  templateUrl: './buoys-incidents.component.html',
  styleUrls: ['./buoys-incidents.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class BuoysIncidentsComponent implements OnInit {

  //buoysIncidentRows = [];
  selectedValue = [];
  temp = [];
  buoysIncidentDetails = [];
  buoysIncidentResp: any;
  mondalOpen:any;
  value:any;
  
  columns: any[] = [
    { prop: 'buoysIncidentId' },
    { name: 'Incident Description' },
    { name: 'Incident Reported DateTime' },
    { name: 'Incident Severity' }
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  
  constructor(private pageTitleService: PageTitleService, private incidentsService:IncidentsService) {
   this.loadBuoysIncidentsData();
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }
/* 
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/buoys_incidents.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  } */

  loadBuoysIncidentsData(): void {
    this.incidentsService.getBuoysIncidentData().subscribe((resp) => {
      this.buoysIncidentResp = resp;
      this.buoysIncidentDetails = this.buoysIncidentResp.getIncidentsResult.IncidentsList;
      this.selectedValue = [this.buoysIncidentDetails[1]];
      this.temp = [...this.buoysIncidentDetails];

      console.log("----buoysIncidentDetails----", this.buoysIncidentDetails);
    });
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selectedValue);
  }

  onActivate(event) {
   // console.log('Activate Event', event);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
      const temp = this.temp.filter(function(d) {
      return d.incidentname.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.buoysIncidentDetails = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}
