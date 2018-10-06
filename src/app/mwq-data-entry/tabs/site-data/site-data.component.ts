import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "ms-site-data",
  templateUrl: "./site-data.component.html",
  styleUrls: ["./site-data.component.scss"]
})
export class SiteDataComponent implements OnInit {
  constructor(public route: Router) {}

  siteDateEdit() {
    console.log("At Edit Screen");
  }
  siteDateSave() {
    console.log("At Save Screen");
  }
  siteDateNext() {
    this.route.navigate(["mwqDataEntry", "in-situ-parameters"]);
    console.log("At Next Screen");
  }
  ngOnInit() {}
}
