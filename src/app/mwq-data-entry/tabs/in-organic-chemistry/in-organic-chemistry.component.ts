import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "ms-in-organic-chemistry",
  templateUrl: "./in-organic-chemistry.component.html",
  styleUrls: ["./in-organic-chemistry.component.scss"]
})
export class InOrganicChemistryComponent implements OnInit {
  iow_cadmium:any=  { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  iow_chromium:any= { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  iow_cobalt:any=   { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  iow_copper:any=   { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  iow_lead:any=   { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  iow_manganese:any=   { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  iow_nickel:any=   { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  iow_zinc:any=   { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  iow_iron:any=   { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  iow_mercury:any=   { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  
  ios_cadmium:any=  { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  ios_chromium:any= { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  ios_cobalt:any=   { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  ios_copper:any=   { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  ios_lead:any=   { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  ios_manganese:any=   { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  ios_nickel:any=   { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  ios_zinc:any=   { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  ios_iron:any=   { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };
  ios_mercury:any=   { val1: 65,val2: 34, val3: 45, val4: 15, val5: 85 };

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
