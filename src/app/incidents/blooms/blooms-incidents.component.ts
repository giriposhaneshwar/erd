import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from '../../core/route-animation/route.animation';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { IncidentsService } from '../incidents.service';
import { MwqDataEntryService } from 'app/mwq-data-entry/mwq-data-entry.service';
import { FormGroup, NgForm } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr';
import * as moment from 'moment';
import * as $ from 'jquery';
import { Config } from 'app/appConfiguration/config';
declare var $: any;

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
  blomIncidentForm: FormGroup;
  submitted = false;

  mondalOpen: any;
  modalShowWindow: Boolean = false;
  bllomIncidentRows = [];
  selectedRow = [];
  temp = [];
  bloomsIncidentDetails = [];
  bloomsIncidentResp: any;
  value: any;
  newBloomIncidentResp: any;
  apiUrl: String;
  domain: String;

  bloomUploadFiles: any[] = [];
  js = {};
  blommIncidentInfo: any = {
    incidentName: "", stationId: "", lattitude: "", longitude: "", incidentLocation: "", areaCovered: "", bloomType: "",
    affectedSpecies: "", createdBy: "Admin", status: "Open", remarks: "", upload:[]
  };
  dateval ='';

  columns: any[] = [
    { prop: 'bloomIncidentId' },
    { name: 'Incident Description' },
    { name: 'Incident Reported DateTime' },
    { name: 'Incident Severity' }
  ];


  @ViewChild(NgForm) f: NgForm;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public api: MwqDataEntryService,
    private pageTitleService: PageTitleService,
    private incidentsService: IncidentsService,
    public config: Config,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.domain = this.config.UPLOAD_URL;
    this.apiUrl = this.config.API_URL;

    var fromDate = moment().subtract(60, "days").format("YYYY-MM-DD");
    let toDate = moment().format("YYYY-MM-DD");

    console.log(" Current Day ", "----" + toDate);
    console.log(" Last  Three Months " + fromDate);
    this.loadBloomIncidentsData(fromDate, toDate);
    this.dateForamt() ;
  }

  createBloomIncident(blommIncidentInfo) {
    console.log('SUCCESS!! :-)\n\n' + JSON.stringify(blommIncidentInfo))
    this.createAlgolBloomIncident(blommIncidentInfo);
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }

  /* get f() { return this.blomIncidentForm.controls; } */

  loadBloomIncidentsData(fromDate, toDate): void {
    this.incidentsService.getBloomsIncidentData(fromDate, toDate).subscribe((resp) => {
      this.bloomsIncidentResp = resp;
      this.bloomsIncidentDetails = this.bloomsIncidentResp.getAlgalbloomIncidentsResult.AlgalBloomList;
    /*   for (let i = 0; i < this.bloomsIncidentDetails.length; i++) {
        let item = this.bloomsIncidentDetails[i];
        item.createdDate = moment(item.createdDate, "MM/DD/YYYY h:mm:ss a").fromNow();
      } */
      this.selectedRow = [this.bloomsIncidentDetails[1]];
      this.temp = [...this.bloomsIncidentDetails];
    });
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selectedRow);
  }

  onActivate(event) {
    //console.log('Activate Event', event);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.incidentId.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.bloomsIncidentDetails = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }


  addTableRow() {
    this.openModal();
  }
  siteDatePrev() { }
  openModal() {
    this.modalShowWindow = true;
  }
  closeModal() {
    this.modalShowWindow = false;
    this.f.resetForm();
  }

  
  fileChanged(e) {
    let uploadedFile = e.target.files;
    console.log("Body SElection", $('body'));
    let that = this;
    let data = new FormData();
    $.each($('.uploadFile')[0].files, function (i, file) {
      // debugger;
      data.append('file-' + i, file);
    });
    // debugger;
    $.ajax({
      url: that.config.API_URL + "/SaveFile",
      data: data,
      cache: false,
      contentType: 'multipart/form-data',
      processData: false,
      type: 'POST',
      success: function (data) {
        console.log("Response Data", data);
        let files = data.SaveFileResult.clsUploadFilesl;

        // debugger;
        if (files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            let item = files[i];
            item['downloadLink'] = that.domain;
            that.bloomUploadFiles.push(item);
            that.blommIncidentInfo.upload.push(item);
          }
          console.log("Uploaded fileds", that.blommIncidentInfo.upload)
        } else {
          // if no files in response throw error message
        }

        // that.uploadFileList.push()
        // alert(data);
      }
    });
  }
  dateForamt() {
    this.dateval = moment().format('YYYY-MM-DD'); // Gets today's date
    console.log("-------todayDate---------",this.dateval)
  }
  createAlgolBloomIncident(blommIncidentInfo) {
    this.js["clsMWQAlgalbloomIncident"] = blommIncidentInfo;
    console.log("---------" + JSON.stringify(this.js));
    this.incidentsService.addBloomsIncidentInfo(this.js).subscribe((resp) => {
      this.newBloomIncidentResp =resp;
      
      if (this.newBloomIncidentResp.CreateAlgalBloomIncidentsResult === 'sucess') {
        this.newBloomIncidentResp ="Incident Created Successfully"
        this.toastr.success(this.newBloomIncidentResp.CreateAlgalBloomIncidentsResult, "Incident Created Successfully");
      }
      else {
        this.newBloomIncidentResp ="Incident Created failed"
        this.toastr.error(this.newBloomIncidentResp.CreateAlgalBloomIncidentsResult, "Incident Created failed");
      }
    });
    this.f.resetForm();
    this.closeModal();
    var fromDate = moment().subtract(7, "days").format("YYYY-MM-DD");
    let toDate = moment().format("YYYY-MM-DD");
    this.loadBloomIncidentsData(fromDate, toDate);
  }

  lattitudeKeyPress(event: any) {
    const pattern = '^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}';
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.match(inputChar)) {
      event.preventDefault();
    }
  }

  longitudeKeyPress(event: any) {
    const pattern = '^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}';
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.match(inputChar)) {
      event.preventDefault();
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
} 