import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { fadeInAnimation } from 'app/core/route-animation/route.animation';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DownloadMwqDataService } from './download-mwq-data.service';
import { DownloadDataService } from '../download-data.service';

@Component({
  selector: 'ms-download-mwq-data',
  templateUrl: './download-mwq-data.component.html',
  styleUrls: ['./download-mwq-data.component.scss'],
 
})
export class DownloadMwqDataComponent implements OnInit {

  constructor(
    private pageTitleService: PageTitleService,
    private http: HttpClient,
    private excelService: DownloadMwqDataService,
    private downloadDataService: DownloadDataService) {
    //this.getRestItems();
    this.downloadMwqData();
 
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
  restItemsUrl = "assets/data/downloadMwqData.json";

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

  downloadMwqDataDetails = [];
  downloadMwqDataResp: any;

  downloadMwqData() {
    this.downloadDataService.downloadMwqData().subscribe((resp) => {
      this.downloadMwqDataResp = resp;
      this.downloadMwqDataDetails = this.downloadMwqDataResp.GetIndicesResult.IndicesListData;
      console.log("----downloadMwqDataDetails----", this.downloadMwqDataResp.GetIndicesResult.Message);
    });
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems() {
    return this.http.get<any[]>(this.restItemsUrl).pipe(map(data => data));
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.restItems, 'MWQ_Data');
  }
}
