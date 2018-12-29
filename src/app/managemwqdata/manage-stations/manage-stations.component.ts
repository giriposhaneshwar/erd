import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ManageMwqDataService } from '../managemwqdata.service';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-manage-stations',
  templateUrl: './manage-stations.component.html',
  styleUrls: ['./manage-stations.component.scss']
})
export class ManageStationsComponent implements OnInit {

  editing = {};
  mondalOpen: any;
  stationsListDetails = [];
  stationsListResp: any;
  modalShowWindow: Boolean = false;
  msg: any = "";
  stationInfoResp: any;
  stationsListResultStatus: any;
  stationsListResultStatusMessage: any;
  stationInfo: any = {
    stationId: "", x: "", y: "", name: "", createdBy: "Admin", status: ""
  };

  @ViewChild(NgForm) f: NgForm;

  constructor(private pageTitleService: PageTitleService,
    private http: HttpClient, private spinner: NgxSpinnerService,
    private manageMwqDataService: ManageMwqDataService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.loaStationsList();
  }
  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
    this.spinner.show();
  }
  loaStationsList() {
    this.manageMwqDataService.fetchStationsList().subscribe((resp) => {
      this.stationsListResp = resp;
      this.stationsListDetails = this.stationsListResp.GetStationsListResult.StationLists;
      this.stationsListResultStatus = this.stationsListResp.GetStationsListResult.Status;
      // console.log("----stationsListDetails----", this.stationsListDetails);
      console.log(this.stationsListResultStatus, this.stationsListResp.GetStationsListResult.StationLists.length,
        this.stationsListResp.GetStationsListResult.Message);
      if (this.stationsListResultStatus === 'Success') {
        if (this.stationsListDetails.length > 0) {
          this.stationsListDetails = this.stationsListResp.GetStationsListResult.StationLists;
          this.spinner.hide();
        } else {
          this.stationsListDetails = [];
          this.stationsListResultStatusMessage = "Station information not available";
          this.spinner.hide();
        }
      }
      else if (this.stationsListResultStatus === 'Failed') {
        console.log("Error occured");
        this.stationsListResultStatusMessage = this.stationsListResp.GetStationsListResult.Message;
        this.spinner.hide();
      }
    });
  }
  updateValue(event, cell, rowIndex, row) {
    console.log('inline editing rowIndex', rowIndex, row.stationId)
    this.editing[rowIndex + '-' + cell] = false;
    this.stationsListDetails[rowIndex][cell] = event.target.value;
    this.stationsListDetails = [...this.stationsListDetails];
    let updatedStatus = this.stationsListDetails[rowIndex][cell];
    let updatedStationId = row.stationId;
    let updatedBy = "Admin";
    this.manageMwqDataService.updateStationStatus(updatedStationId, updatedBy, updatedStatus).subscribe((resp) => {
      this.stationsListResp = resp;
      console.log("----CategoryStatusUpdateResult----", this.stationsListResp);
      if (this.stationsListResp.StationsStatusUpdateResult === 'success') {
        console.log('UPDATED!', updatedStationId, updatedBy, updatedStatus, updatedStationId+" - "+this.stationsListResp.StationsStatusUpdateResult);
        this.toastr.success("Station Id " +updatedStationId+" - "+"Information Updated Successfully");
      }
      else {
        this.toastr.error(this.stationsListResp.StationsStatusUpdateResult, updatedStationId+" - "+"Station Information Updation Failed");
        console.log('UPDATE Failed!', updatedStationId, updatedBy, updatedStatus, this.stationsListResp.StationsStatusUpdateResult);
      }
    });
    console.log('UPDATED!', this.stationsListDetails[rowIndex][cell]);
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
    this.msg = "";
    this.stationInfo.status = "";
  }
  createStation(stationInfo) {
    console.log(JSON.stringify(stationInfo));
    this.manageMwqDataService.addStationInfo(stationInfo).subscribe((resp) => {
      this.stationInfoResp = resp;
      console.log("----stationInfoResp----", this.stationInfoResp);
      if (this.stationInfoResp.StationsCreateResult === 'sucess') {
        this.toastr.success("Station Created Successfully");
        this.f.resetForm();
        this.closeModal();
        this.loaStationsList();
      }
      else {
        this.toastr.error(this.stationInfoResp.StationsCreateResult, "Station Created failed");
      }
    });
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

  numberOnly(evt) {
    //debugger;
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46 && evt.srcElement.value.split('.').length > 1) {
      return false;
    }
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

}
