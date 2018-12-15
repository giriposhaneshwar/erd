import { Component, OnInit, ViewChild } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ManageMwqDataService } from '../managemwqdata.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ms-configure-parameters',
  templateUrl: './configure-parameters.component.html',
  styleUrls: ['./configure-parameters.component.scss']
})
export class ConfigureParametersComponent implements OnInit {

  editing = {};
  mondalOpen: any;
  parametersListDetails = [];
  parametersListResp: any;
  modalShowWindow: Boolean = false;
  @ViewChild(NgForm) f: NgForm;
  
  configureParam: any = {
    parameterId: "", parameterName: "", units: "", groupId: "",
    minValue: "", maxValue: "", thresholdValue: "", meanValue: "",
    stdDevValue: "", createdBy: "AdminUser", status: ""
  };

  constructor(private pageTitleService: PageTitleService, private http: HttpClient,
    private manageMwqDataService: ManageMwqDataService) {
    this.loadParametersList();
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }

  loadParametersList() {
    this.manageMwqDataService.fetchParametersList().subscribe((resp) => {
      this.parametersListResp = resp;
      this.parametersListDetails = this.parametersListResp.GetParametersListResult.ParamatersList;
      console.log("----parametersListDetails----", this.parametersListDetails);
    });
  }

  updateValue(event, cell, rowIndex, row) {
    console.log('inline editing rowIndex', rowIndex, row.paramId);
    this.editing[rowIndex + '-' + cell] = false;
    this.parametersListDetails[rowIndex][cell] = event.target.value;
    let updatedStatus = this.parametersListDetails[rowIndex][cell];
    let updatedParamId = row.paramId;
    let updatedBy = "Admin";
    this.parametersListDetails = [...this.parametersListDetails];

    this.manageMwqDataService.updateParameterStatus(updatedStatus, updatedParamId, updatedBy).subscribe((resp) => {
      console.log("----ParameterStatusUpdateResult----", resp);
    });
    console.log('UPDATED!', updatedStatus, updatedParamId, updatedBy);
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

  addConfigureParam(configureParam) {
    console.log(JSON.stringify(configureParam));
    this.manageMwqDataService.addParameterInfo(configureParam).subscribe((resp) => {
      let addParameterInfo = resp;
      console.log("----addParameterInfo----", addParameterInfo);
      //alert("---"+resp)
    });
  }
}
