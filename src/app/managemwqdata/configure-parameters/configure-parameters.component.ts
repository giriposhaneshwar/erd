import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ManageMwqDataService } from '../managemwqdata.service';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr';

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
  addParameterInfo: any;

  configureParam: any = {
    parameterId: "", parameterName: "", units: "", groupId: "",
    minValue: "", maxValue: "", thresholdValue: "", meanValue: "",
    stdDevValue: "", createdBy: "AdminUser", Status: ""
  };

  constructor(private pageTitleService: PageTitleService, private http: HttpClient,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private manageMwqDataService: ManageMwqDataService) {
    this.loadParametersList();
    this.toastr.setRootViewContainerRef(vcr);
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
      this.addParameterInfo = resp;
      console.log("----addParameterInfo----", this.addParameterInfo);
      if (this.addParameterInfo.CreateAlgalBloomIncidentsResult === 'sucess') {
        this.toastr.success(this.addParameterInfo.ParametersCreateResult, "Param Info Created Successfully");
        this.f.resetForm();
        this.closeModal();
        this.loadParametersList();
      }
      else {
        this.toastr.error(this.addParameterInfo.ParametersCreateResult, "Param Info Created failed");
      }
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
