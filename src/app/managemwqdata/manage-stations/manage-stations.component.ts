import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ManageMwqDataService } from '../managemwqdata.service';

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

  stationInfo: any = {
    stationId: "", x: "", y: "", name: "", createdBy: "Admin", status: ""
  };

  constructor(private pageTitleService: PageTitleService, private http: HttpClient,
    private manageMwqDataService: ManageMwqDataService) {
    this.loaStationsList();
  }
  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }
  loaStationsList() {
    this.manageMwqDataService.fetchStationsList().subscribe((resp) => {
      this.stationsListResp = resp;
      this.stationsListDetails = this.stationsListResp.GetStationsListResult.StationLists;
      console.log("----stationsListDetails----", this.stationsListDetails);
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
      console.log("----CategoryStatusUpdateResult----", resp);
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
  }
  createStation(stationInfo) {
    console.log(JSON.stringify(stationInfo));
    this.manageMwqDataService.addStationInfo(stationInfo).subscribe((resp) => {
      let stationInfoResp = resp;
      console.log("----stationInfoResp----", stationInfoResp);
    });
  }
}
