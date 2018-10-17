import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'ms-general-chemistry',
  templateUrl: './general-chemistry.component.html',
  styleUrls: ['./general-chemistry.component.scss']
})
export class GeneralChemistryComponent implements OnInit {

  totalPhosp:any={
    val1: 65,
    val2: 34,
    val3: 45,
    val4: 15,
    val5: 85
  };

  totalNitrogen:any={
    val1: 25,
    val2: 65,
    val3: 45,
    val4: 15,
    val5: 85
  };

  nitriteN:any={
    val1: 25,
    val2: 65,
    val3: 45,
    val4: 15,
    val5: 85
  };

  nitrateN:any={
    val1: 25,
    val2: 65,
    val3: 45,
    val4: 15,
    val5: 85
  };

  silicateSl:any={
    val1: 25,
    val2: 65,
    val3: 45,
    val4: 15,
    val5: 85
  };

  ammoniaN:any={
    val1: 25,
    val2: 65,
    val3: 45,
    val4: 15,
    val5: 85
  };

  phosphateP:any={
    val1: 25,
    val2: 65,
    val3: 45,
    val4: 15,
    val5: 85
  };

  bod:any={
    val1: 25,
    val2: 65,
    val3: 45,
    val4: 15,
    val5: 85
  };

  tss:any={
    val1: 25,
    val2: 65,
    val3: 45,
    val4: 15,
    val5: 85
  };



  constructor(public route: Router) { }

  inputOrderClass(data, key) {
    console.log("INput Data", data, key);
  }
  siteDatePrev() {
    this.route.navigate(["mwqDataEntry", "in-situ-parameters"]);
    console.log("At Edit Screen");
  }
  siteDateSave() {
    console.log("At Save Screen");
  }
  siteDateNext() {
    this.route.navigate(["mwqDataEntry", "in-organic-chemistry"]);
    console.log("At Next Screen");
  }

  ngOnInit() {
  }

}
