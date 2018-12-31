import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { fadeInAnimation } from '../../core/route-animation/route.animation';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { IncidentsService } from '../incidents.service';
import * as moment from 'moment';
import { ToastsManager } from 'ng6-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';

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
  selectedValue: any;
  selectedValueForm: any;
  buyosStatus: String;
  buyosSelectedId: Number;
  temp = [];
  buoysIncidentDetails = [];
  buoysIncidentResp: any;
  mondalOpen: any;
  value: any;
  fromDateFilter: any;
  toDateFilter: any;
  buoysIncidentHistoryDetails = [];
  buoysIncidentHistoryResp: any;
  dateval = '';
  buoysIncidentUpdateDetails = [];
  buoysIncidentUpdateResp: any;
  fromDate: any;
  toDate: any;
  buoysIncidentResultStatus: any;
  buoysIncidentResultStatusMessage: any;
  columns: any[] = [
    { prop: 'buoysIncidentId' },
    { name: 'Incident Description' },
    { name: 'Incident Reported DateTime' },
    { name: 'Incident Severity' }
  ];
  startMinDate: any;
  startMaxDate: any;
  endMinDate: any;
  endMaxDate: any;

  @ViewChild(DatatableComponent) table: DatatableComponent;


  constructor(private pageTitleService: PageTitleService,
    private incidentsService: IncidentsService,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private spinner: NgxSpinnerService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.dateForamt();
  }

  ngOnInit() {
    this.fromDate = moment().subtract(90, "days").format("YYYY-MM-DD");
    this.toDate = moment().format("YYYY-MM-DD");
    console.log(" Last  Three Months " + this.fromDate + " Current Day ", "----" + this.toDate);

    this.loadBuoysIncidentsData(this.fromDate, this.toDate);
    this.pageTitleService.setTitle("Marine Water Quality Management System");
    this.spinner.show();
    this.dateRangeValidate(undefined, undefined);
  }
  incidentListSizeReset() {
    // debugger;
    let form = $('.buoysIncidentForm');
    if (form.length > 0) {
      return form.height() + 20;
    } else {
      return 20;
    }
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

  loadBuoysIncidentsData(fromDate, toDate): void {
    console.log(fromDate, toDate);
    this.incidentsService.getBuoysIncidentData(fromDate, toDate).subscribe((resp) => {
      this.buoysIncidentResp = resp;
      this.buoysIncidentDetails = this.buoysIncidentResp.getIncidentsResult.IncidentsList;
      this.buoysIncidentResultStatus = this.buoysIncidentResp.getIncidentsResult.Status;
      console.log(this.buoysIncidentResultStatus,
        this.buoysIncidentResp.getIncidentsResult.IncidentsList.length,
        this.buoysIncidentResp.getIncidentsResult.Message);

      if (this.buoysIncidentResultStatus === 'Success') {
        if (this.buoysIncidentDetails.length > 0) {
          // debugger;
          this.buoysIncidentDetails = this.buoysIncidentResp.getIncidentsResult.IncidentsList;
          if (this.buyosSelectedId !== undefined) {
            for (let i = 0; i < this.buoysIncidentDetails.length; i++) {
              let item = this.buoysIncidentDetails[i];
              if (item.incidentId === this.buyosSelectedId) {
                let formValue = [this.buoysIncidentDetails[i]];
                this.selectedValue = formValue;
                this.selectedValueForm = formValue[0];
                this.buyosStatus = formValue[0].status;
                this.buyosSelectedId = formValue[0].incidentId;
                this.fetchIncidentHistoryDetails(this.buyosSelectedId);
                break;
              }
            }
          } else {
            let formValue = [this.buoysIncidentDetails[0]]
            this.selectedValue = formValue;
            this.selectedValueForm = formValue[0];
            this.buyosStatus = formValue[0].status;
            this.buyosSelectedId = formValue[0].incidentId;
            this.fetchIncidentHistoryDetails(this.buyosSelectedId);
          }
          this.temp = [...this.buoysIncidentDetails];
          //console.log("----buoysIncidentDetails----", this.buoysIncidentDetails);
          this.spinner.hide();
        } else {
          this.buoysIncidentResultStatusMessage = "The selected dates " + fromDate + " to " + toDate + " BUOYS Incidents information not available";
          this.buoysIncidentDetails = [];
          this.spinner.hide();
        }
      }
      else if (this.buoysIncidentResultStatus === 'Failed') {
        console.log("Error occured");
        this.buoysIncidentResultStatusMessage = this.buoysIncidentResp.getAlertResult.Message;
        this.spinner.hide();
      }
      /* this.selectedValue = [this.buoysIncidentDetails[0]];
      this.temp = [...this.buoysIncidentDetails]; */
      this.spinner.hide();
    });
  }

  onSelect({ selected }) {
    // debugger;
    let selectedIncidentId = selected[0].incidentId;
    this.buyosStatus = selected[0].status;
    this.buyosSelectedId = selectedIncidentId;
    console.log('Select Event', selectedIncidentId);
    this.fetchIncidentHistoryDetails(selectedIncidentId);
  }

  fetchIncidentHistoryDetails(selectedIncidentId) {
    this.incidentsService.getBuoysIncidentHistoryInfo(selectedIncidentId).subscribe((resp) => {
      this.buoysIncidentHistoryResp = resp;
      this.buoysIncidentHistoryDetails = this.buoysIncidentHistoryResp.GetIncidentHistoryResult.incidentHistory;
      console.log("----buoysIncidentHistoryDetails----", this.buoysIncidentHistoryDetails);
    });
  }
  onActivate(event) {
    // console.log('Activate Event', event);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.incidentName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.buoysIncidentDetails = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  updateIncident(selIncident) {
    console.log("--updateIncident--" + (JSON.stringify(selIncident)));
    let selectedIncidentId = selIncident.incidentId;
    let incUpdatedBy = "Admin";
    let incStatus = selIncident.status;
    let incComments = selIncident.remarks;
    //debugger;
    this.buyosStatus = selIncident.status;
    this.buyosSelectedId = selIncident.incidentId;

    console.log(selectedIncidentId, incUpdatedBy, incStatus, incComments);
    this.incidentsService.updateBuoysIncidentInfo(selectedIncidentId, incUpdatedBy, incStatus, incComments).subscribe((resp) => {
      // this.buyosSelectedId = resp.IncidentStatusUpdateResult.;
      this.fromDate = moment().subtract(90, "days").format("YYYY-MM-DD");
      this.toDate = moment().format("YYYY-MM-DD");
      console.log(" Last  Three Months " + this.fromDate + " Current Day ", "----" + this.toDate);

      this.loadBuoysIncidentsData(this.fromDate, this.toDate);

      this.buoysIncidentUpdateResp = resp;
      this.buoysIncidentUpdateDetails = this.buoysIncidentUpdateResp.IncidentStatusUpdateResult;
      console.log("----buoysIncidentUpdateDetails----", this.buoysIncidentUpdateDetails);

      this.toastr.success(this.buoysIncidentUpdateResp.IncidentStatusUpdateResult, "Record Updated Successfully");

      /*  this.fromDate = moment().subtract(90, "days").format("YYYY-MM-DD");
       this.toDate = moment().format("YYYY-MM-DD");
       console.log(" Last  Three Months " + this.fromDate+" Current Day ", "----" + this.toDate);
       this.loadBuoysIncidentsData(this.fromDate, this.toDate); */
    });
  }
}
