import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from '../../core/route-animation/route.animation';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { IncidentsService } from '../incidents.service';
import { MwqDataEntryService } from 'app/mwq-data-entry/mwq-data-entry.service';
import { FormGroup, NgForm } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr';
import * as moment from 'moment';

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

  blommIncidentInfo: any = {
    Name: "", statId: "", x: "", y: "", location: "", areacovered: "", bloomtype: "",
    AffectedSpecies: "", CreatedBy: "Admin", Status: "Open", Remarks: "",
  };

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
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    var fromDate = moment().subtract(60, "days").format("YYYY-MM-DD");
    let toDate = moment().format("YYYY-MM-DD");

    console.log(" Current Day ", "----" + toDate);
    console.log(" Last  Three Months " + fromDate);
    this.loadBloomIncidentsData(fromDate, toDate);
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
      for (let i = 0; i < this.bloomsIncidentDetails.length; i++) {
        let item = this.bloomsIncidentDetails[i];
        item.createdDate = moment(item.createdDate, "MM/DD/YYYY h:mm:ss a").fromNow();
      }
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
      return d.incidentid.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.bloomsIncidentDetails = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  createAlgolBloomIncident(blommIncidentInfo) {
    console.log("---------" + JSON.stringify(blommIncidentInfo));
    this.incidentsService.addBloomsIncidentInfo(blommIncidentInfo).subscribe((resp) => {
      console.log(resp);
      if (this.newBloomIncidentResp.CreateAlgalBloomIncidentsResult === 'sucess') {
        this.toastr.success(this.newBloomIncidentResp.CreateAlgalBloomIncidentsResult, "Incident Created Successfully");
      }
      else {
        this.toastr.error(this.newBloomIncidentResp.CreateAlgalBloomIncidentsResult, "Incident Created failed");
      }
    });
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

  myFiles = [];
  getFileDetails(e) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles() {
    const frmData = new FormData();
    for (var j = 0; j < this.myFiles.length; j++) {
      frmData.append("file", this.myFiles[j]);
      frmData.append("name", this.myFiles[j].name);
    }
    console.log(frmData)
    this.api.postFileUpload(frmData).subscribe((resp) => {
      console.log("----resp----", resp);
    });
    // console.log(frmData)
  }
  /*
    selectedFiles: FileList;
    currentFileUpload: File;
    selectFile(event) {
      this.selectedFiles = event.target.files;
      // console.log(this.selectedFiles)
    }
  
    upload() {
      this.currentFileUpload = this.selectedFiles.item(0);
      const formdata: FormData = new FormData();
      formdata.append('file',this.selectedFiles.item(0));
      console.log(formdata)
      this.api.postFileUpload(formdata).subscribe((resp) => {
        console.log("----resp----", resp);
      });
      // this.selectedFiles = undefined;
    }*/
  //    fileUpload() {

  //     let fileCatcher = document.getElementById('file-catcher');
  //     let fileInput = document.getElementById('file-input');
  //     let fileListDisplay = document.getElementById('file-list-display');

  // console.log(fileInput)
  //     let fileList = [];
  //     let renderFileList, sendFile;

  //     fileCatcher.addEventListener('submit', function (evnt) {

  //       evnt.preventDefault();
  //       fileList.forEach(function (file) {

  //         sendFile(file);
  //       });
  //     });

  //     fileInput.addEventListener('change', function (evnt) {
  //       alert()
  //       fileList = [];
  //       // for (let i = 0; i < fileInput.files.length; i++) {
  //       //   fileList.push(fileInput.files[i]);
  //       // }
  //       renderFileList();
  //     });

  //     renderFileList = function () {

  //       fileListDisplay.innerHTML = '';
  //       fileList.forEach(function (file, index) {
  //         let fileDisplayEl = document.createElement('p');
  //         fileDisplayEl.innerHTML = (index + 1) + ': ' + file.name;
  //         fileListDisplay.appendChild(fileDisplayEl);
  //       });
  //     };

  sendFile = function (file) {
    alert()
    let formData = new FormData();
    let request = new XMLHttpRequest();

    formData.set('file', file);
    request.open("POST", 'http://localhost/MWQWebservice/MWQSitesRestServices.svc/SaveFile');
    request.send(formData);
  };
} 