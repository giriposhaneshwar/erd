import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { ManageMwqDataService } from '../managemwqdata.service';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
  parametersListResultStatus: any;
  parametersListResultStatusMessage: any;
  parameterUpadateResultStatus: any;

  configureParam: any = {
    parameterId: "", parameterName: "", units: "", groupId: "",
    minValue: "", maxValue: "", thresholdValue: "", meanValue: "",
    stdDevValue: "", createdBy: "AdminUser", Status: ""
  };

  constructor(private pageTitleService: PageTitleService,
    private http: HttpClient,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private manageMwqDataService: ManageMwqDataService,
    private spinner: NgxSpinnerService) {
    this.loadParametersList();
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
    this.spinner.show();
  }
  loadParametersList() {
    this.manageMwqDataService.fetchParametersList().subscribe((resp) => {
      this.parametersListResp = resp;
      this.parametersListDetails = this.parametersListResp.GetParametersListResult.ParamatersList;
      this.parametersListResultStatus = this.parametersListResp.GetParametersListResult.Status;
      console.log("----parametersListDetails----", this.parametersListDetails.length);
      console.log(this.parametersListResultStatus, this.parametersListResp.GetParametersListResult.ParamatersList.length,
        this.parametersListResp.GetParametersListResult.Message);

      if (this.parametersListResultStatus === 'Success') {
        this.parametersListResultStatusMessage = "Parameters information not available";
        if (this.parametersListDetails.length > 0) {
          this.parametersListDetails = this.parametersListResp.GetParametersListResult.ParamatersList;
          this.spinner.hide();
        } else {
          this.parametersListDetails = [];
          this.spinner.hide();
        }
      }
      else if (this.parametersListResultStatus === 'Failed') {
        console.log("Error occured");
        this.parametersListResultStatusMessage = this.parametersListResp.GetParametersListResult.Message;
        this.spinner.hide();
      }
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
      this.parameterUpadateResultStatus = resp;
      if (this.parameterUpadateResultStatus.ParameterStatusUpdateResult === 'success') {
        console.log('UPDATED!', updatedStatus, updatedParamId, updatedBy, this.parameterUpadateResultStatus.ParameterStatusUpdateResult);
        this.toastr.success("Parameter Id "+updatedParamId+"-"+" Information Updated Successfully")
      }
      else {
        this.toastr.error(this.parameterUpadateResultStatus.ParameterStatusUpdateResult, "Parameter Id "+updatedParamId+"-"+" Param Information Updation Failed");
        console.log('UPDATE Failed!', updatedStatus, updatedParamId, updatedBy, this.parameterUpadateResultStatus.ParameterStatusUpdateResult);
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

  addConfigureParam(configureParam) {
    console.log(JSON.stringify(configureParam));
    this.manageMwqDataService.addParameterInfo(configureParam).subscribe((resp) => {
      this.addParameterInfo = resp;
      console.log("----addParameterInfo----", this.addParameterInfo);
      if (this.addParameterInfo.ParametersCreateResult === 'sucess') {
        this.toastr.success(this.addParameterInfo.ParametersCreateResult, "Param Info Created Successfully");
        this.f.resetForm();
        this.closeModal();
        this.loadParametersList();
      }
      else {
        this.toastr.error(this.addParameterInfo.ParametersCreateResult, "Param Info creation failed");
      }
    });
  }

/*   numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  } */

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
