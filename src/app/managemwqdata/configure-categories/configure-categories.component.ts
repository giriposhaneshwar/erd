import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ManageMwqDataService } from '../managemwqdata.service';

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

  constructor(private pageTitleService: PageTitleService,private http: HttpClient, 
    private manageMwqDataService: ManageMwqDataService) 
  {
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

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
     this.categoryListDetails[rowIndex][cell] = event.target.value;
    this.categoryListDetails = [...this.categoryListDetails];
    console.log('UPDATED!', this.categoryListDetails[rowIndex][cell]);
  }

}
