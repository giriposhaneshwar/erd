import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PageTitleService } from "app/core/page-title/page-title.service";
import { Config } from "../appConfiguration/config";
import { AppStorageService } from "../appConfiguration/app-config.service";


@Component({
  selector: "ms-mwq-data-entry",
  templateUrl: "./mwq-data-entry.component.html",
  styleUrls: ["./mwq-data-entry.component.scss"]
})
export class MwqDataEntryComponent implements OnInit {
  mobileTabNav: any = "data-entry";
  mondalOpen: Boolean = false;
  constructor(
    private pageTitleService: PageTitleService,
    public route: Router,
    public localStore: AppStorageService
  ) {}

  tabRouteinMobile(evt, data) {
    this.route.navigate(["mwqDataEntry", data]);
  }
  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
    console.log("Executing Configurations", Config.appConfig.mainNav);
  }
}
