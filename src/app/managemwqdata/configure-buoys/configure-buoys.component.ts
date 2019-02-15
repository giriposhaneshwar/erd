import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-configure-buoys',
  templateUrl: './configure-buoys.component.html',
  styleUrls: ['./configure-buoys.component.scss']
})
export class ConfigureBuoysComponent implements OnInit {
  editing = {};
  modalShowWindow: Boolean = false;
  //rows = [];
  mondalOpen:any;
  
  getRestItemsResponse: any = {
    BuoysList: [],
    Status: null,
    Message: ""
  };

  constructor(
    private pageTitleService: PageTitleService,
    private route: Router,private spinner: NgxSpinnerService,
    private http: HttpClient) {

    let currentUrl = this.route.url;
    let groupInfo = sessionStorage.getItem("groups");
    let username = sessionStorage.getItem("username");

    if (groupInfo === "2" || groupInfo === "20") {
      this.spinner.show();
      console.log("-----Group Mached-----" + groupInfo, username, currentUrl);
      this.getRestItems();
    }
    else {
      console.log("-----Group Not Matched-----" + groupInfo, currentUrl);
      this.spinner.hide();
      this.route.navigate(["error"]);
    }
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }


  restItems: any = [];
  //restItemsUrl = 'http://10.56.84.178/mwqwebservice/MWQSitesRestServices.svc/CalculateOEE/20181009/20181009';
  restItemsUrl = "assets/data/configureBuoys.json";

  getRestItems(): void {
    this.restItemsServiceGetRestItems().subscribe(restItems => {

      this.getRestItemsResponse = restItems;
      if (this.getRestItemsResponse != undefined && this.getRestItemsResponse.hasOwnProperty("Status")) {
        if (this.getRestItemsResponse.Status === "Success" && this.getRestItemsResponse.hasOwnProperty("BuoysList")) {
          if (
            this.getRestItemsResponse.BuoysList != undefined &&
            this.getRestItemsResponse.BuoysList.length > 0
          ) {
            this.restItems = this.getRestItemsResponse.BuoysList;
          }
        }
      }
      console.log("----restItems----", this.restItems);
    });
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems() {
    return this.http.get<any[]>(this.restItemsUrl).pipe(map(data => data));
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.restItems[rowIndex][cell] = event.target.value;
    this.restItems = [...this.restItems];
    console.log('UPDATED!', this.restItems[rowIndex][cell]);
  }
  addTableRow() {
    this.openModal();
  }
  siteDatePrev(){}
  openModal() {
    this.modalShowWindow = true;
  }
  closeModal() {
    this.modalShowWindow = false;
  }
}
