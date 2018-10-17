import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-qc-general-chemistry',
  templateUrl: './qc-general-chemistry.component.html',
  styleUrls: ['./qc-general-chemistry.component.scss']
})
export class QcGeneralChemistryComponent implements OnInit {

  totalPhosp:any={
    val1: 65
  };

  totalNitrogen:any={
    val1: 25
  };

  nitriteN:any={
    val1: 67
  };

  nitrateN:any={
    val1: 59
  };

  silicateSl:any={
    val1: 86
  };

  ammoniaN:any={
    val1: 25
  };

  phosphateP:any={
    val1: 34
  };

  bod:any={
    val1: 55
  };

  tss:any={
    val1: 45
  };

  constructor(public route: Router) { }

  inputOrderClass(data, key) {
    console.log("QC Data", data, key);
  }
  siteDatePrev() {
    this.route.navigate(["mwqDataQc", "qc-in-situ-parameters"]);
    console.log("At Prev(qc-in-situ-parameters) Screen");
  }
  siteDateSave() {
    console.log("At Save(qc-general-chemistry) Screen");
  }
  siteDateNext() {
    this.route.navigate(["mwqDataQc", "qc-in-organic-chemistry"]);
    console.log("At Next (qc-in-organic-chemistry) Screen");
  }

  ngOnInit() {
  }
}
