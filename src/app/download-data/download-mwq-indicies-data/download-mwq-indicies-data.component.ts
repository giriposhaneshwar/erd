import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'ms-download-mwq-indicies-data',
  templateUrl: './download-mwq-indicies-data.component.html',
  styleUrls: ['./download-mwq-indicies-data.component.scss']
})
export class DownloadMwqIndiciesDataComponent implements OnInit {

  constructor(
    private pageTitleService: PageTitleService,
    private http: HttpClient) {
    this.getRestItems();
 
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }
  

  getRestItemsResponse: any = {
    BuoysList: [],
    Status: null,
    Message: ""
  };
  restItems: any = [];
  //restItemsUrl = 'http://10.56.84.178/mwqwebservice/MWQSitesRestServices.svc/CalculateOEE/20181009/20181009';
  restItemsUrl = "assets/data/mwqIndicesData.json";

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
}
