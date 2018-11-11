import { Component, OnInit, ViewChild } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { fadeInAnimation } from '../core/route-animation/route.animation';
import { AlertService } from './alerts.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

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

  selected = [];
  alertsDetails = [];
  alertsResp: any;
  temp = [];
  columns: any[] = [
    { prop: 'alertId' },
    { name: 'Description' },
    { name: 'Reported DateTime' },
    { name: 'Severity' }

  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private pageTitleService: PageTitleService, private alertService: AlertService) {
    this.loadAlertsData();
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }

  loadAlertsData(): void {
    this.alertService.getAlertsData().subscribe((resp) => {
      this.alertsResp = resp;
      this.alertsDetails = this.alertsResp.getAlertResult.AlertList;
      this.selected = [this.alertsDetails[0]];
      this.temp = [...this.alertsDetails];

      console.log("----alertsDetails----", this.alertsDetails);
    });
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
  }

  onActivate(event) {
    //console.log('Activate Event', event);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.description.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    //this.buoysIncidentRows = temp;
    this.alertsDetails = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}