import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { fadeInAnimation } from '../core/route-animation/route.animation';
import { AlertService } from './alerts.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import { ToastsManager } from 'ng6-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
  dateval = '';
  selected = [];
  alertsDetails = [];
  alertsResp: any;
  fromDateFilter: any;
  toDateFilter: any;
  newBuoysIncidentDetails = [];
  newBuoysIncidentResp: any;
  fromDate: any;
  toDate: any;
  temp = [];
  mondalOpen: any;
  columns: any[] = [
    { prop: 'alertId' },
    { name: 'Description' },
    { name: 'Reported DateTime' },
    { name: 'Severity' }
  ];
  alertResultStatus: any;
  alertResultStatusMessage: any;
  startMinDate: any;
  startMaxDate: any;
  endMinDate: any;
  endMaxDate: any;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private pageTitleService: PageTitleService,
    private alertService: AlertService,
    public toastr: ToastsManager, vcr: ViewContainerRef, private spinner: NgxSpinnerService) {
    this.dateForamt();
    this.toastr.setRootViewContainerRef(vcr);

    this.fromDate = moment().subtract(60, "days").format("YYYY-MM-DD");
    this.toDate = moment().format("YYYY-MM-DD");
    /* console.log(" Current Day ", "----" + this.toDate);
    console.log(" Last  Three Months " + this.fromDate); */
    this.loadAlertsData(this.fromDate, this.toDate);
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
    this.spinner.show();
  }

  dateForamt() {
    this.dateval = moment().format('YYYY-MM-DD'); // Gets today's date
    console.log("-------todayDate---------", this.dateval)
  }
  dateRangeValidate(dt, field) {
    console.log("Getting Min Dat", field, dt);
    let stDate = this.fromDateFilter;
    let edDate = this.toDateFilter;

    if (stDate !== undefined) {
      this.endMinDate = stDate;
      this.startMaxDate = this.dateval;
    } else {
      this.startMaxDate = this.dateval;
    }

    if (edDate !== undefined) {
      this.startMaxDate = edDate;
    } else {
      this.endMaxDate = this.dateval;
    }
  }

  loadAlertsData(fromDate, toDate): void {
    console.log("----loadAlertsData----", fromDate + "------" + toDate);
    this.alertService.getAlertsData(fromDate, toDate).subscribe((resp) => {
      this.alertsResp = resp;
      this.alertsDetails = this.alertsResp.getAlertResult.AlertList;
      this.alertResultStatus = this.alertsResp.getAlertResult.Status;
      console.log("----alertsDetails----", this.alertsDetails.length);
      if (this.alertResultStatus === 'Success') {
        console.log(this.alertResultStatus, this.alertsResp.getAlertResult.AlertList.length, this.alertsResp.getAlertResult.Message);
        this.alertResultStatusMessage = "The given dates " + fromDate + " to " + toDate + " alerts information not available";
        if (this.alertsDetails.length > 0) {
          this.alertsDetails = this.alertsResp.getAlertResult.AlertList;
          this.selected = [this.alertsDetails[0]];
          this.temp = [...this.alertsDetails];
          this.spinner.hide();
        } else {
          this.alertsDetails = [];
          this.spinner.hide();
        }
      }
      else if (this.alertResultStatus === 'Failed') {
        console.log("Error occured");
        this.alertResultStatusMessage = this.alertsResp.getAlertResult.Message;
        this.spinner.hide();
      }
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
      if (this.newBuoysIncidentResp.IncidentCreateResult === 'sucess') {
        this.toastr.success(this.newBuoysIncidentResp.IncidentCreateResult, "Incident Created Successfully");
        this.loadAlertsData(this.fromDate, this.toDate);
      }
      else {
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