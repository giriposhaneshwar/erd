import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HistoricalGraphComponent } from '../../../partials/historical-graph/historical-graph.component';

@Component({
  selector: "ms-in-organic-chemistry",
  templateUrl: "./in-organic-chemistry.component.html",
  styleUrls: ["./in-organic-chemistry.component.scss"]
})
export class InOrganicChemistryComponent implements OnInit {
  constructor(public route: Router) {}

  siteDatePrev() {
    this.route.navigate(["mwqDataEntry", "general-chemistry"]);
  }
  siteDateSave() {}
  siteDateNext() {
    this.route.navigate(["mwqDataEntry", "organic-chemistry"]);
  }
  ngOnInit() {}
}
