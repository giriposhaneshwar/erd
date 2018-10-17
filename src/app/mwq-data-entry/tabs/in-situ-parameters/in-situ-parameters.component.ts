import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "ms-in-situ-parameters",
  templateUrl: "./in-situ-parameters.component.html",
  styleUrls: ["./in-situ-parameters.component.scss"]
})
export class InSituParametersComponent implements OnInit {
  
  temperatureSurface:any={
    val1: 25
  };

  conductivitySurface:any={
    val1: 45
  };

  salinitySurface: any = {
    val1: 34
  };

  pHSurface: any = {
    val1: 65
  };

  dissolvedOSurface: any = {
    val1: 56
  };

  Chlorophyll_aSurface: any = {
    val1: 75
  };

  sechiDiscSurface: any = {
    val1: 46
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

  
  constructor(public route: Router) {}

  inputOrderClass(data, key) {
    console.log("INput Data", data, key);
  }
  siteDatePrev() {
    this.route.navigate(["mwqDataEntry", "site-details"]);
    console.log("At site-details Screen");
  }
  siteDateSave() {
    console.log("At Save Screen");
  }
  siteDateNext() {
    this.route.navigate(["mwqDataEntry", "general-chemistry"]);
    console.log("At Next Screen");
  }
  ngOnInit() {}
}
