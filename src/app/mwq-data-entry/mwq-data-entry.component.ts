import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PageTitleService } from "app/core/page-title/page-title.service";
import { Config } from "../appConfiguration/config";

@Component({
  selector: "ms-mwq-data-entry",
  templateUrl: "./mwq-data-entry.component.html",
  styleUrls: ["./mwq-data-entry.component.scss"]
})
export class MwqDataEntryComponent implements OnInit {
  mobileTabNav: any = "data-entry";
  constructor(
    private pageTitleService: PageTitleService,
    public route: Router
  ) {}

  tabRouteinMobile(evt, data) {
    this.route.navigate(["mwqDataEntry", data]);
  }
  ngOnInit() {
    this.pageTitleService.setTitle("MJQ Data Entry");
    console.log("Executing Configurations", Config.appConfig.mainNav);
  }
}
