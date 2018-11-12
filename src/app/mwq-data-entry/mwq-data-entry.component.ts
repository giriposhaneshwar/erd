import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PageTitleService } from "app/core/page-title/page-title.service";
import { Config } from "../appConfiguration/config";
import { AppStorageService } from "../appConfiguration/app-config.service";
import { MwqDataEntryService } from './mwq-data-entry.service';

@Component({
  selector: "ms-mwq-data-entry",
  templateUrl: "./mwq-data-entry.component.html",
  styleUrls: ["./mwq-data-entry.component.scss"]
})
export class MwqDataEntryComponent implements OnInit {
  mobileTabNav: any = "data-entry";
  mondalOpen: Boolean = false;
  currentRoute: any[];
  loadModule: String = "dataEntry";
  role: any;
  constructor(
    private pageTitleService: PageTitleService,
    public route: Router,
    public localStore: AppStorageService,
    public api: MwqDataEntryService
  ) { }

  tabRouteinMobile(evt, data) {
    this.route.navigate(["mwqDataEntry", data]);
  }

  getHistoricalGraphData () {
    // fetchHistoricalGraph;
    this.api.fetchHistoricalGraph().subscribe(resp => {
      let data = resp[0];
      this.localStore.store.set('graphData', data);
      console.log("----getHistoricalGraphData----", data);
    });
  }
  ngOnInit() {
    let currentUrl = this.route.url;
    this.currentRoute = currentUrl.split("/");
    if (this.currentRoute[1] == "mwqDataQc") {
      this.loadModule = "dataQc";
      this.route.navigate(["mwqDataQc", "qc-info"]);
    } else if (this.currentRoute[1] == "mwqDataEntry") {
      this.loadModule = "dataEntry";
    }
    // "/mwqDataQc/site-details"
    this.pageTitleService.setTitle("Marine Water Quality Management System");
    console.log("Executing Configurations", Config.appConfig.mainNav);

    /* Getting Local Store Roles */
    let roles  = this.localStore.store.get('role');
    this.role = roles.data;

    this.getHistoricalGraphData();
  }
}
