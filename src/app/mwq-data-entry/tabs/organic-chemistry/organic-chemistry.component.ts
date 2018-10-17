import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "ms-organic-chemistry",
  templateUrl: "./organic-chemistry.component.html",
  styleUrls: ["./organic-chemistry.component.scss"]
})
export class OrganicChemistryComponent implements OnInit {

  oc_totalPhosp:any=  { val1: 65 };
  oc_tph:any= { val1: 34};

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
