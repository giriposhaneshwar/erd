import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-qc-in-organic-chemistry',
  templateUrl: './qc-in-organic-chemistry.component.html',
  styleUrls: ['./qc-in-organic-chemistry.component.scss']
})
export class QcInOrganicChemistryComponent implements OnInit {
  iow_cadmium:any=  { val1: 65 };
  iow_chromium:any= { val1: 65 };
  iow_cobalt:any=   { val1: 65 };
  iow_copper:any=   { val1: 65 };
  iow_lead:any=     { val1: 65 };
  iow_manganese:any={ val1: 65 };
  iow_nickel:any=   { val1: 65 };
  iow_zinc:any=     { val1: 65 };
  iow_iron:any=     { val1: 65 };
  iow_mercury:any=  { val1: 65 };
  
  ios_cadmium:any=  { val1: 65 };
  ios_chromium:any= { val1: 65 };
  ios_cobalt:any=   { val1: 65 };
  ios_copper:any=   { val1: 65 };
  ios_lead:any=     { val1: 65 };
  ios_manganese:any={ val1: 65 };
  ios_nickel:any=   { val1: 65 };
  ios_zinc:any=     { val1: 65 };
  ios_iron:any=     { val1: 65 };
  ios_mercury:any=  { val1: 65 };

  constructor(public route: Router) {}

  siteDatePrev() {
    this.route.navigate(["mwqDataQc", "qc-general-chemistry"]);
  }
  siteDateSave() {
    console.log("At Save(qc-in-organic-chemistry) Screen");
  }
  siteDateNext() {
    this.route.navigate(["mwqDataQc", "qc-organic-chemistry"]);
  }
  ngOnInit() {}

}
