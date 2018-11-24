import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ms-configure-parameters',
  templateUrl: './configure-parameters.component.html',
  styleUrls: ['./configure-parameters.component.scss']
})
export class ConfigureParametersComponent implements OnInit {

  editing = {};
  //rows = [];
  mondalOpen:any;
  getRestItemsResponse: any = {
    BuoysList: [],
    Status: null,
    Message: ""
  };

  constructor(
    private pageTitleService: PageTitleService,
    private http: HttpClient) {
    this.getRestItems();

  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }


  restItems: any = [];
  //restItemsUrl = 'http://10.56.84.178/mwqwebservice/MWQSitesRestServices.svc/CalculateOEE/20181009/20181009';
  restItemsUrl = "assets/data/configureParameters.json";

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

}
