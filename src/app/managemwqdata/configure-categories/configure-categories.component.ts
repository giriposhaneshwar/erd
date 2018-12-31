import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ManageMwqDataService } from '../managemwqdata.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastsManager } from 'ng6-toastr';
@Component({
  selector: 'ms-configure-categories',
  templateUrl: './configure-categories.component.html',
  styleUrls: ['./configure-categories.component.scss']
})
export class ConfigureCategoriesComponent implements OnInit {

  editing = {};
  mondalOpen: any;
  categoryListDetails = [];
  categoryListResp: any;
  categoryListResultStatus: any;
  categoryListResultStatusMessage: any;
  categoryUpadateResultStatus: any;
  categoryCreateResultStatus: any;
  categoryInfo: any = {
    categoryName: "", createdBy: "AdminUser", status: ""
  };
  @ViewChild(NgForm) f: NgForm;

  modalShowWindow: Boolean = false;
  constructor(private pageTitleService: PageTitleService,
    private http: HttpClient, private spinner: NgxSpinnerService,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private manageMwqDataService: ManageMwqDataService) {
    this.loadCategoryList();
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
    this.spinner.show();
  }

  loadCategoryList() {
    this.manageMwqDataService.fetchCategoryList().subscribe((resp) => {
      this.categoryListResp = resp;
      this.categoryListDetails = this.categoryListResp.GetCategoryListResult.CategoryLists;
      this.categoryListResultStatus = this.categoryListResp.GetCategoryListResult.Status
      console.log(this.categoryListResultStatus, this.categoryListResp.GetCategoryListResult.CategoryLists.length,
        this.categoryListResp.GetCategoryListResult.Message);

      if (this.categoryListResultStatus === 'Success') {
        this.categoryListResultStatusMessage = "Category information not available";
        if (this.categoryListDetails.length > 0) {
          this.categoryListDetails = this.categoryListResp.GetCategoryListResult.CategoryLists;
          this.spinner.hide();
        } else {
          this.categoryListDetails = [];
          this.spinner.hide();
        }
      }
      else if (this.categoryListResultStatus === 'Failed') {
        console.log("Error occured");
        this.categoryListResultStatusMessage = this.categoryListResp.GetCategoryListResult.Message;
        this.spinner.hide();
      }
    });
  }

  updateValue(event, cell, rowIndex, row) {
    console.log('inline editing rowIndex', rowIndex, row.categoryId)
    this.editing[rowIndex + '-' + cell] = false;
    this.categoryListDetails[rowIndex][cell] = event.target.value;
    this.categoryListDetails = [...this.categoryListDetails];
    let updatedStatus = this.categoryListDetails[rowIndex][cell];
    let updatedCategoryId = row.categoryId;
    let updatedBy = "Admin";
    this.manageMwqDataService.updateCategoryStatus(updatedCategoryId, updatedBy, updatedStatus).subscribe((resp) => {
      console.log("----CategoryStatusUpdateResult----", resp);
      this.categoryUpadateResultStatus = resp;
      if (this.categoryUpadateResultStatus.CategoryStatusUpdateResult === 'success') {
        console.log('UPDATED!', updatedStatus, updatedCategoryId, updatedBy, this.categoryUpadateResultStatus.CategoryStatusUpdateResult);
        this.toastr.success("Category Id "+updatedCategoryId+"-"+"Category Information Updated Successfully")
      }
      else {
        this.toastr.error(this.categoryUpadateResultStatus.CategoryStatusUpdateResult, "Category Information Updation Failed");
        console.log('UPDATE Failed!', updatedStatus, updatedCategoryId, updatedBy, this.categoryUpadateResultStatus.CategoryStatusUpdateResult);
      }
    });
    console.log('UPDATED!', this.categoryListDetails[rowIndex][cell]);
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

  createCategory(categoryInfo) {
    console.log(JSON.stringify(categoryInfo));
    this.manageMwqDataService.addCategoryInfo(categoryInfo).subscribe((resp) => {
      this.categoryCreateResultStatus = resp;
      console.log("----categoryCreateResultStatus----", this.categoryCreateResultStatus);
      if (this.categoryCreateResultStatus.CategoryInsertResult === 'sucess') {
        this.toastr.success("Category Information Created Successfully");
        this.f.resetForm();
        this.closeModal();
        this.loadCategoryList();
      }
      else {
        this.toastr.error(this.categoryCreateResultStatus.CategoryInsertResult, "Category Information Updation Failed");
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
