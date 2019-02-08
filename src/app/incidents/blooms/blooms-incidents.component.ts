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
import { NgxSpinnerService } from 'ngx-spinner';
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
  bloomsIncidentResultStatus: any;
  bloomsIncidentResultStatusMessage: any;
  value: any;
  newBloomIncidentResp: any;
  apiUrl: String;
  domain: String;
  fromDate: any;
  toDate: any;
  bloomUploadFiles: any[] = [];
  js = {};
  glbalTxtFileUpload : HTMLInputElement;
  blommIncidentInfo: any = {
    incidentName: "", stationId: "", lattitude: "", longitude: "", incidentLocation: "", areaCovered: "", bloomType: "",
    affectedSpecies: "", createdBy: "Admin", status: "Open", remarks: "", upload: [], txtFileUpload:""
  };
  dateval = '';
  fromDateFilter: any;
  toDateFilter: any;
  columns: any[] = [
    { prop: 'bloomIncidentId' },
    { name: 'Incident Description' },
    { name: 'Incident Reported DateTime' },
    { name: 'Incident Severity' }
  ];
  startMinDate: any;
  startMaxDate: any;
  endMinDate: any;
  endMaxDate: any;
  event: any;
  @ViewChild(NgForm) f: NgForm;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public api: MwqDataEntryService,
    private pageTitleService: PageTitleService,
    private incidentsService: IncidentsService,
    public config: Config,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private spinner: NgxSpinnerService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.domain = this.config.UPLOAD_URL;
    this.apiUrl = this.config.API_URL;

    this.fromDate = moment().subtract(60, "days").format("YYYY-MM-DD");
    this.toDate = moment().format("YYYY-MM-DD");

    console.log(" Last  Three Months " + this.fromDate + " Current Day ", this.toDate);
    this.loadBloomIncidentsData(this.fromDate, this.toDate);
    this.dateForamt();
  }

  createBloomIncident(blommIncidentInfo) {
    console.log('SUCCESS!! :-)\n\n' + JSON.stringify(blommIncidentInfo))
    this.createAlgolBloomIncident(blommIncidentInfo);
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
    this.spinner.show();
  }

  /* get f() { return this.blomIncidentForm.controls; } */

  loadBloomIncidentsData(fromDate, toDate): void {
    console.log(fromDate, toDate);
    if (fromDate !== undefined && toDate !== undefined) {

      if (this.isValidDate(fromDate) && this.isValidDate(toDate)) {
        this.incidentsService.getBloomsIncidentData(fromDate, toDate).subscribe((resp) => {
          this.bloomsIncidentResp = resp;
          this.bloomsIncidentDetails = this.bloomsIncidentResp.getAlgalbloomIncidentsResult.AlgalBloomList;
          this.bloomsIncidentResultStatus = this.bloomsIncidentResp.getAlgalbloomIncidentsResult.Status;
          console.log(this.bloomsIncidentResultStatus, this.bloomsIncidentResp.getAlgalbloomIncidentsResult.AlgalBloomList.length,
            this.bloomsIncidentResp.getAlgalbloomIncidentsResult.Message);

          if (this.bloomsIncidentResultStatus === 'Success') {
            if (this.bloomsIncidentDetails.length > 0) {
              this.bloomsIncidentDetails = this.bloomsIncidentResp.getAlgalbloomIncidentsResult.AlgalBloomList;
              this.selectedRow = [this.bloomsIncidentDetails[0]];
              this.temp = [...this.bloomsIncidentDetails];
              console.log("----bloomsIncidentDetails----", this.bloomsIncidentDetails);
              this.spinner.hide();
            } else {
              this.bloomsIncidentResultStatusMessage = "The selected dates " + fromDate + " to " + toDate + " Incidents information not available";
              this.bloomsIncidentDetails = [];
              this.spinner.hide();
            }
          }
          else if (this.bloomsIncidentResultStatus === 'Failed') {
            console.log("Error occured");
            this.bloomsIncidentResultStatusMessage = this.bloomsIncidentResp.getAlertResult.Message;
            this.bloomsIncidentDetails = [];
            this.spinner.hide();
          }
        });
      } else {
        console.log("In Valid Dates");
       // this.toastr.error("Please provide the valid input for From Date & To Date");
        this.bloomsIncidentResultStatusMessage = "Please provide the valid input for From Date & To Date";
        this.bloomsIncidentDetails = [];
        this.spinner.hide();
      }
    }
    else {
      console.log("Dates are empty");
      this.toastr.error("From Date & Todate is mandatory");
      this.bloomsIncidentResultStatusMessage = "From Date & Todate is mandatory, Please provide the valid input for From Date & To Date";
      this.bloomsIncidentDetails = [];
      this.spinner.hide();
    }
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


  fileChanged(e, txtFileUpload : HTMLInputElement) {
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
            console.log("Duplicate file---" + JSON.stringify(that.bloomUploadFiles), item.fileName);
            if (that.bloomUploadFiles.length === 0) {
              item['downloadLink'] = that.domain;
              that.bloomUploadFiles.push(item);
              that.blommIncidentInfo.upload.push(item);
            }
            else {
              if(that.bloomUploadFiles[i].fileName===item.fileName){
                console.log("MACHED");
                alert("Duplicate file not allowed "+item.fileName );
              }
              else{
                console.log("NOT MACHED");
                item['downloadLink'] = that.domain;
                that.bloomUploadFiles.push(item);
                that.blommIncidentInfo.upload.push(item);
    
              }
            }
          }
          console.log("Uploaded fileds", that.blommIncidentInfo.upload);
         
        } else {
          // if no files in response throw error message
        }
      
        // that.uploadFileList.push()
        // alert(data);
      }
    });
    if(txtFileUpload.value != 'undefined'){
      txtFileUpload.value=null;
    }
  }

  dateForamt() {
    this.dateval = moment().format('YYYY-MM-DD'); // Gets today's date
  }

  dateRangeValidate(dt, field) {
    //  console.log("Getting Min Dat", field, dt);
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

  createAlgolBloomIncident(blommIncidentInfo) {
    this.js["clsMWQAlgalbloomIncident"] = blommIncidentInfo;
    console.log("---------" + JSON.stringify(this.js));
    this.incidentsService.addBloomsIncidentInfo(this.js).subscribe((resp) => {
      this.newBloomIncidentResp = resp;

      if (this.newBloomIncidentResp.CreateAlgalBloomIncidentsResult === 'sucess') {
        this.newBloomIncidentResp = "Incident Created Successfully"
        this.toastr.success(this.newBloomIncidentResp.CreateAlgalBloomIncidentsResult, "Incident Created Successfully");
      }
      else {
        this.newBloomIncidentResp = "Incident Created failed"
        this.toastr.error(this.newBloomIncidentResp.CreateAlgalBloomIncidentsResult, "Incident Created failed");
      }
    });
    this.f.resetForm();
    this.closeModal(this.glbalTxtFileUpload);
    var fromDate = moment().subtract(90, "days").format("YYYY-MM-DD");
    let toDate = moment().format("YYYY-MM-DD");
    this.loadBloomIncidentsData(fromDate, toDate);
  }

  lattitudeKeyPress(event: any) {
    const pattern = '/^[0-9]+([,.][0-9]+)?$/g';
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.match(inputChar)) {
      event.preventDefault();
    }
  }

  longitudeKeyPress(event: any) {
    const pattern = '/^[0-9]+([,.][0-9]+)?$/g';
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

  isNumberKey(evt) {
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46 && evt.srcElement.value.split('.').length > 1) {
      return false;
    }
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  /* Validating the user input dates Start*/
  isValidDate(objDate) {
    let inputDate = moment(objDate, 'YYYY/MM/DD');
    let month = inputDate.format('M');
    let day = inputDate.format('D');
    let year = inputDate.format('YYYY');
    let retValue = false;
    if (this.isValid(day, month, year)) {
      return retValue = true;
    }
    else {
      return retValue = false;
    }
  }

  daysInMonth(m, y) { // m is 0 indexed: 0-11
    switch (m) {
      case 1:
        return (y % 4 === 0 && y % 100) || y % 400 === 0 ? 29 : 28;
      case 8: case 3: case 5: case 10:
        return 30;
      default:
        return 31
    }
  }

  isValid(d, m, y) {
    if (y >= 1900) {
      return m > 0 && m <= 12 && d > 0 && d <= this.daysInMonth(m, y);
    }
    else {
      this.toastr.error("Invalid Year");
      return false;
    }
  }
  /* Validating the user input dates End*/

  addTableRow() {
    this.openModal();
  }
  openModal() {
    this.modalShowWindow = true;    
    this.blommIncidentInfo.txtFileUpload === '';
  }
  closeModal(txtFileUpload : HTMLInputElement) {
    this.glbalTxtFileUpload = txtFileUpload;
    this.modalShowWindow = false;
    this.f.resetForm();
    this.blommIncidentInfo.upload=[];
    if(txtFileUpload.value != 'undefined'){
      txtFileUpload.value=null;
    }
  }

  mouseWheelDir: string = '';

  mouseWheelUpFunc(evt) {
    this.mouseWheelDir = 'upward direction';
  }

  mouseWheelDownFunc(evt) {
    this.mouseWheelDir = 'downward direction';
  }
} 