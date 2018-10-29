import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DownloadMwqIndicesDataService } from './download-mwq-indices-data.service';
import { DownloadDataService } from '../download-data.service';
@Component({
  selector: 'ms-download-mwq-indicies-data',
  templateUrl: './download-mwq-indicies-data.component.html',
  styleUrls: ['./download-mwq-indicies-data.component.scss']
})
export class DownloadMwqIndiciesDataComponent implements OnInit {

  getRestItemsResponse: any = {
    BuoysList: [],
    Status: null,
    Message: ""
  };

  downloadMwqIndicesdDetails = [];
  downloadMwqIndicesResp: any;


  constructor(private pageTitleService: PageTitleService,
    private http: HttpClient,
    private excelService: DownloadMwqIndicesDataService,
    private downloadDataService: DownloadDataService) {

    this.downloadMwqIndicesData();
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }


  downloadMwqIndicesData() {
    this.downloadDataService.downloadIndicesData().subscribe((resp) => {
      this.downloadMwqIndicesResp = resp;
      this.downloadMwqIndicesdDetails = this.downloadMwqIndicesResp.getIndices_dataResult.IndicesDataList;
      console.log("----mwqDetaidownloadMwqIndicesdDetailsls----", this.downloadMwqIndicesResp.getIndices_dataResult.Message);
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.downloadMwqIndicesdDetails, 'MWQ_Indices_Data');
  }
}
