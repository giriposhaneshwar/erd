import { Component, OnInit,ViewChild } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { fadeInAnimation } from '../../core/route-animation/route.animation';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { IncidentsService } from '../incidents.service';
import * as moment from 'moment';

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
    var fromDate = moment().subtract(90, "days").format("YYYY-MM-DD");
    let toDate   = moment().format("YYYY-MM-DD") ;
   
    console.log(" Current Day ", "----"+ toDate);
    console.log(" Last  Three Months " + fromDate );

    this.loadBuoysIncidentsData(fromDate,toDate);
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }


  loadBuoysIncidentsData(fromDate,toDate): void {
    this.incidentsService.getBuoysIncidentData(fromDate,toDate).subscribe((resp) => {
      this.buoysIncidentResp = resp;
      this.buoysIncidentDetails = this.buoysIncidentResp.getIncidentsResult.IncidentsList;
      for (let i = 0; i < this.buoysIncidentDetails.length; i++) {
        let item = this.buoysIncidentDetails[i];
        item.createdDate = moment( item.createdDate, "MM/DD/YYYY h:mm:ss a").fromNow();
      }
      this.selectedValue = [this.buoysIncidentDetails[0]];
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
      return d.incidentName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.buoysIncidentDetails = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}
