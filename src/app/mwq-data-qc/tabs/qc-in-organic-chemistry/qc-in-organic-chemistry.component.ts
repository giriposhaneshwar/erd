import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-qc-in-organic-chemistry',
  templateUrl: './qc-in-organic-chemistry.component.html',
  styleUrls: ['./qc-in-organic-chemistry.component.scss']
})
export class QcInOrganicChemistryComponent implements OnInit {

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
