import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { DownloadMwqIndicesDataService } from './download-mwq-indices-data.service';
import { DownloadDataService } from '../download-data.service';
@Component({
  selector: 'ms-download-mwq-indicies-data',
  templateUrl: './download-mwq-indicies-data.component.html',
  styleUrls: ['./download-mwq-indicies-data.component.scss']
})
export class DownloadMwqIndiciesDataComponent implements OnInit {
  mondalOpen:any;
  getRestItemsResponse: any = {
    BuoysList: [],
    Status: null,
    Message: ""
  };
  dateval ='';
  downloadMwqIndicesdDetails = [];
  downloadMwqIndicesResp: any;


  constructor(private pageTitleService: PageTitleService,
    private http: HttpClient,
    private excelService: DownloadMwqIndicesDataService,
    private downloadDataService: DownloadDataService) {
      this.dateForamt();
    this.downloadMwqIndicesData();
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }
  dateForamt() {
    this.dateval = moment().format('YYYY-MM-DD'); // Gets today's date
    console.log("-------todayDate---------",this.dateval)
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
