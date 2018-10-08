import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "ms-organic-chemistry",
  templateUrl: "./organic-chemistry.component.html",
  styleUrls: ["./organic-chemistry.component.scss"]
})
export class OrganicChemistryComponent implements OnInit {
  constructor(public route: Router) {}
  siteDatePrev() {
    this.route.navigate(["mwqDataEntry", "in-organic-chemistry"]);
  }
  siteDateSave() {}
  siteDateNext() {
    this.route.navigate(["mwqDataEntry", "microbiology"]);
  }
  ngOnInit() {}
}
