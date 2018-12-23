import { Component, OnInit, ViewChild } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ManageMwqDataService } from '../managemwqdata.service';
import { NgForm } from '@angular/forms';
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
  categoryInfo: any = {
    categoryName: "", createdBy: "AdminUser", status: ""
  };
  @ViewChild(NgForm) f: NgForm;

  modalShowWindow: Boolean = false;
  constructor(private pageTitleService: PageTitleService, private http: HttpClient,
    private manageMwqDataService: ManageMwqDataService) {
    this.loadCategoryList();
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }

  loadCategoryList() {
    this.manageMwqDataService.fetchCategoryList().subscribe((resp) => {
      this.categoryListResp = resp;
      this.categoryListDetails = this.categoryListResp.GetCategoryListResult.CategoryLists;
      console.log("----categoryListDetails----", this.categoryListDetails);
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
      let categoryInfoResp = resp;
      console.log("----categoryInfoResp----", categoryInfoResp);
    });
    this.f.resetForm();
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
