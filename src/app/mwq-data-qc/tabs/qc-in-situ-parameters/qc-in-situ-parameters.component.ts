import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-qc-in-situ-parameters',
  templateUrl: './qc-in-situ-parameters.component.html',
  styleUrls: ['./qc-in-situ-parameters.component.scss']
})
export class QcInSituParametersComponent implements OnInit {

  temperatureSurface:any={
    val1: 25,
  };

  conductivitySurface:any={
    val1: 25,
  };

  salinitySurface: any = {
    val1: 25,
  };

  pHSurface: any = {
    val1: 25,
  };

  dissolvedOSurface: any = {
    val1: 25,
  };

  Chlorophyll_aSurface: any = {
    val1: 25,
  };
  sechidisc_surface: any = {
    val1: 25,
  };

  temperature: any = {
    val1: 25,
    val2: 65,
    val3: 45,
    val4: 15,
    val5: 85
  };

  conductivity: any = {
    val1: 25,
    val2: 65,
    val3: 75,
    val4: 75,
    val5: 2
  };

  salinity: any = {
    val1: 25,
    val2: 65,
    val3: 75,
    val4: 75,
    val5: 2
  };

  pH: any = {
    val1: 25,
    val2: 65,
    val3: 75,
    val4: 75,
    val5: 2
  };

  dissolvedO: any = {
    val1: 25,
    val2: 65,
    val3: 75,
    val4: 75,
    val5: 2
  };

  Chlorophyll_a: any = {
    val1: 25,
    val2: 65,
    val3: 75,
    val4: 75,
    val5: 2
  };

  constructor(public route: Router) { }

  inputOrderClass(data, key) {
    console.log("QC Data", data, key);
  }
  siteDatePrev() {
    this.route.navigate(["mwqDataQc", "qc-site-details"]);
    console.log("At qc-site-details Screen");
  }
  siteDateSave() {
    console.log("At Save Screen");
  }
  siteDateNext() {
    this.route.navigate(["mwqDataQc", "qc-general-chemistry"]);
    console.log("At qc-general-chemistry Screen");
  }
  ngOnInit() { }
}
