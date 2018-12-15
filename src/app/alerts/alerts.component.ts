import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { fadeInAnimation } from '../core/route-animation/route.animation';
import { AlertService } from './alerts.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import { ToastsManager } from 'ng6-toastr';

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

  newBuoysIncidentDetails = [];
  newBuoysIncidentResp: any;

  temp = [];
  mondalOpen: any;
  columns: any[] = [
    { prop: 'alertId' },
    { name: 'Description' },
    { name: 'Reported DateTime' },
    { name: 'Severity' }
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private pageTitleService: PageTitleService, 
    private alertService: AlertService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {

      this.toastr.setRootViewContainerRef(vcr);
      var fromDate = moment().subtract(60, "days").format("YYYY-MM-DD");
      let toDate = moment().format("YYYY-MM-DD");

      console.log(" Current Day ", "----" + toDate);
      console.log(" Last  Three Months " + fromDate);
      this.loadAlertsData(fromDate, toDate);
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }

  loadAlertsData(fromDate, toDate): void {
    this.alertService.getAlertsData(fromDate, toDate).subscribe((resp) => {
      this.alertsResp = resp;
      this.alertsDetails = this.alertsResp.getAlertResult.AlertList;
      this.selected = [this.alertsDetails[0]];
      this.temp = [...this.alertsDetails];

      console.log("----alertsDetails----", this.alertsDetails);
    });
  }

  createIncident(selected) {
    let selectedAlertId = selected[0].alertid;
    let createdBy = "Admin";
    console.log("selected AlertId---" + selectedAlertId + "CreatedBy----" + createdBy);
    this.alertService.createIncidentForAlertsData(selectedAlertId, createdBy).subscribe((resp) => {
      this.newBuoysIncidentResp = resp;
      console.log("----Created Incident----", resp);
      //this.newBuoysIncidentDetails = this.newBuoysIncidentResp.IncidentCreateResult;
      if(this.newBuoysIncidentResp.IncidentCreateResult === 'sucess'){
        this.toastr.success(this.newBuoysIncidentResp.IncidentCreateResult, "Incident Created Successfully");
      }
      else{
        this.toastr.error(this.newBuoysIncidentResp.IncidentCreateResult, "Incident Created failed");
      }
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