import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-qc-organic-chemistry',
  templateUrl: './qc-organic-chemistry.component.html',
  styleUrls: ['./qc-organic-chemistry.component.scss']
})
export class QcOrganicChemistryComponent implements OnInit {

  constructor(public route: Router) {}
  siteDatePrev() {
    this.route.navigate(["mwqDataQc", "qc-in-organic-chemistry"]);
  }
  siteDateSave() {}
  siteDateNext() {
    this.route.navigate(["mwqDataQc", "qc-microbiology"]);
  }

  ngOnInit() {
  }

}
