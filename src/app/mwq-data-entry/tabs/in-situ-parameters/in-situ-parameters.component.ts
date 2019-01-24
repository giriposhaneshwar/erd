import { Component, OnInit, ViewContainerRef, HostListener, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { AppStorageService } from "app/appConfiguration/app-config.service";
import { Config } from "app/appConfiguration/config";
import { ToastsManager, Toast } from "ng6-toastr";
import { $$iterator } from "rxjs/internal/symbol/iterator";
import * as $ from 'jquery';
declare var $;

@Component({
  selector: "ms-in-situ-parameters",
  templateUrl: "./in-situ-parameters.component.html",
  styleUrls: ["./in-situ-parameters.component.scss"]
})
export class InSituParametersComponent implements OnInit {
  dataEntry: any;
  dataEntryKey: string = "dataEntry";
  temperatureComponentKey: string = "Temparature";
  conductivityComponentKey: string = "Conductivity";
  salinityComponentKey: string = "Salinity";
  pHComponentKey: string = "pH";
  dissolvedOComponentKey: string = "Dissolved_O_";
  chlorophyll_aComponentKey: string = "Chlorophyll_a";
  sechiDiscComponentKey: string = "Sechi_Disc";
  graphData: any;
  graphDataKey: any = "insituParams";
  module: String;
  optionsModalShowWindow: boolean = false;
  optionValue: any = {
    "option5m": true,
    "option10m": false,
    "option15m": false,
    "option20m": false,
    "option25m": false,
    "option30m": false,
    "option35m": false,
    "option40m": false
  };
  optionsFormData: any;

  temperature: any = { surfaceValue: "", bottomValue: "", bottom5m: "", bottom10m: "", bottom15m: "", bottom20m: "", bottom25m: "", bottom30m: "", bottom35m: "", bottom40m: "" };
  conductivity: any = { surfaceValue: "", bottomValue: "", bottom5m: "", bottom10m: "", bottom15m: "", bottom20m: "", bottom25m: "", bottom30m: "", bottom35m: "", bottom40m: "" };
  salinity: any = { surfaceValue: "", bottomValue: "", bottom5m: "", bottom10m: "", bottom15m: "", bottom20m: "", bottom25m: "", bottom30m: "", bottom35m: "", bottom40m: "" };
  pH: any = { surfaceValue: "", bottomValue: "", bottom5m: "", bottom10m: "", bottom15m: "", bottom20m: "", bottom25m: "", bottom30m: "", bottom35m: "", bottom40m: "" };
  dissolvedO: any = { surfaceValue: "", bottomValue: "", bottom5m: "", bottom10m: "", bottom15m: "", bottom20m: "", bottom25m: "", bottom30m: "", bottom35m: "", bottom40m: "" };
  Chlorophyll_a: any = { surfaceValue: "", bottomValue: "", bottom5m: "", bottom10m: "", bottom15m: "", bottom20m: "", bottom25m: "", bottom30m: "", bottom35m: "", bottom40m: "" };
  sechiDisc: any = { surfaceValue: "", bottomValue: "", bottom5m: "", bottom10m: "", bottom15m: "", bottom20m: "", bottom25m: "", bottom30m: "", bottom35m: "", bottom40m: "" };

  fieldColorValidatior: any;
  isDisabled: boolean = true;

  @HostListener("focus") onFocus() {
    let ele = this.el.nativeElement.querySelector('input');
    console.log("ele", ele);
  }

  constructor(
    public route: Router,
    public localStore: AppStorageService,
    public config: Config,
    public toastr: ToastsManager,
    private el: ElementRef,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    let mod = this.config.getModuleName();
    this.module = mod.module;
    console.log("----module name----" + this.module);
    this.getColorValidator();
    // get DAta
    let localData = this.localStore.store.get(this.dataEntryKey);
    let insituParamsgraphData = this.localStore.store.get("graphData");
    this.graphData = insituParamsgraphData.data.insituParams;
    console.log("-----insituParams----------" + this.graphData);

    if (localData.status == "success") {
      this.dataEntry = localData.data;
      if (this.dataEntry.hasOwnProperty(this.temperatureComponentKey)) {
        this.temperature = this.dataEntry[this.temperatureComponentKey];
        this.conductivity = this.dataEntry[this.conductivityComponentKey];
        this.salinity = this.dataEntry[this.salinityComponentKey];
        this.pH = this.dataEntry[this.pHComponentKey];
        this.dissolvedO = this.dataEntry[this.dissolvedOComponentKey];
        this.Chlorophyll_a = this.dataEntry[this.chlorophyll_aComponentKey];
        this.sechiDisc = this.dataEntry[this.sechiDiscComponentKey];
      } else {
        // this.dataEntry = {};
        this.dataEntry[this.temperatureComponentKey] = this.temperature;
        this.dataEntry[this.conductivityComponentKey] = this.conductivity;
        this.dataEntry[this.salinityComponentKey] = this.salinity;
        this.dataEntry[this.pHComponentKey] = this.pH;
        this.dataEntry[this.dissolvedOComponentKey] = this.dissolvedO;
        this.dataEntry[this.chlorophyll_aComponentKey] = this.Chlorophyll_a;
        this.dataEntry[this.sechiDiscComponentKey] = this.sechiDisc;

        this.localStore.store.set(this.dataEntryKey, this.dataEntry);
      }
    } else {
      // this.dataEntry = {};
      this.dataEntry[this.temperatureComponentKey] = this.temperature;
      this.dataEntry[this.conductivityComponentKey] = this.conductivity;
      this.dataEntry[this.salinityComponentKey] = this.salinity;
      this.dataEntry[this.pHComponentKey] = this.pH;
      this.dataEntry[this.dissolvedOComponentKey] = this.dissolvedO;
      this.dataEntry[this.chlorophyll_aComponentKey] = this.Chlorophyll_a;
      this.dataEntry[this.sechiDiscComponentKey] = this.sechiDisc;
      this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    }

    this.doCheckOptionValues(this.dataEntry, ["Temperature", "Conductivity", "Salinity", "pH", "Dissolved_O_", "Chlorophyll_a", "Sechi_Disc"]);
    console.log("Data Entry", this.dataEntryKey, this.dataEntry);
    //this.selectedEventType = [this.eventTypeDetails[0]];
  }
  doCheckOptionValues(data, arr) {
    console.log("Options Check ", data, arr);
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      let m5, m10, m15, m20, m25, m30, m35, m40;
      if (data.hasOwnProperty(item)) {
        if (data[item].hasOwnProperty('bottom5m')) {
          m5 = (data[item].bottom5m !== undefined && data[item].bottom5m !== "" && data[item].bottom5m !== "0") ? true : false;
        }
        if (data[item].hasOwnProperty('bottom10m')) {
          m10 = (data[item].bottom10m !== undefined && data[item].bottom10m !== "" && data[item].bottom10m !== "0") ? true : false;
        }
        if (data[item].hasOwnProperty('bottom15m')) {
          m15 = (data[item].bottom15m !== undefined && data[item].bottom15m !== "" && data[item].bottom15m !== "0") ? true : false;
        }
        if (data[item].hasOwnProperty('bottom20m')) {
          m20 = (data[item].bottom20m !== undefined && data[item].bottom20m !== "" && data[item].bottom20m !== "0") ? true : false;
        }
        if (data[item].hasOwnProperty('bottom25m')) {
          m25 = (data[item].bottom25m !== undefined && data[item].bottom25m !== "" && data[item].bottom25m !== "0") ? true : false;
        }
        if (data[item].hasOwnProperty('bottom30m')) {
          m30 = (data[item].bottom30m !== undefined && data[item].bottom30m !== "" && data[item].bottom30m !== "0") ? true : false;
        }
        if (data[item].hasOwnProperty('bottom35m')) {
          m35 = (data[item].bottom35m !== undefined && data[item].bottom35m !== "" && data[item].bottom35m !== "0") ? true : false;
        }
        if (data[item].hasOwnProperty('bottom40m')) {
          m40 = (data[item].bottom40m !== undefined && data[item].bottom40m !== "" && data[item].bottom40m !== "0") ? true : false;
        }
      }
      //console.log("Changed at Options", { m5, m10, m15, m20, m25, m30, m35, m40 })
      if (m5 === true) { this.optionValue.option5m = true; }
      if (m10 === true) { this.optionValue.option10m = true; }
      if (m15 === true) { this.optionValue.option15m = true; }
      if (m20 === true) { this.optionValue.option20m = true; }
      if (m25 === true) { this.optionValue.option25m = true; }
      if (m30 === true) { this.optionValue.option30m = true; }
      if (m35 === true) { this.optionValue.option35m = true; }
      if (m40 === true) { this.optionValue.option40m = true; }
      //console.log("selected at Options", { m5, m10, m15, m20, m25, m30, m35, m40 })
    }
  }

  temperatureDetailsSave(temperature) {
    this.dataEntry[this.temperatureComponentKey] = temperature;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  conductivityDetailsSave(conductivity) {
    this.dataEntry[this.conductivityComponentKey] = conductivity;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  salinityDetailsSave(salinity) {
    this.dataEntry[this.salinityComponentKey] = salinity;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  pHDetailsSave(pH) {
    this.dataEntry[this.pHComponentKey] = pH;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  dissolvedODetailsSave(dissolvedO) {
    this.dataEntry[this.dissolvedOComponentKey] = dissolvedO;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  Chlorophyll_aDetailsSave(Chlorophyll_a) {
    this.dataEntry[this.chlorophyll_aComponentKey] = Chlorophyll_a;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  sechiDiscDetailsSave(sechiDisc) {
    this.dataEntry[this.sechiDiscComponentKey] = sechiDisc;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }


  insituDetailsSave(temperature, conductivity, salinity, pH, dissolvedO, Chlorophyll_a, sechiDisc) {
    this.dataEntry[this.temperatureComponentKey] = temperature;
    this.dataEntry[this.conductivityComponentKey] = conductivity;
    this.dataEntry[this.salinityComponentKey] = salinity;
    this.dataEntry[this.pHComponentKey] = pH;
    this.dataEntry[this.dissolvedOComponentKey] = dissolvedO;
    this.dataEntry[this.chlorophyll_aComponentKey] = Chlorophyll_a;
    this.dataEntry[this.sechiDiscComponentKey] = sechiDisc;

    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    this.isDisabled = false;
    console.log("At Save Screen");
  }

  inSituTabPrev(module) {
    if (module === "mwqDataEntry") {
      this.route.navigate(["mwqDataEntry", "site-details"]);
      console.log("At mwqDataEntry - site-details Screen");
    } else {
      this.route.navigate(["mwqDataQc", "site-details"]);
      console.log("At mwqDataQc - site-details Screen");
    }
  }

  toastClear() {
    this.toastr.clearAllToasts();
    //$('#toast-container').find('.toast').remove();
  }

  inSituTabNext(module) {
    if (module === "mwqDataEntry") {
      this.toastClear();
      this.route.navigate(["mwqDataEntry", "general-chemistry"]);
      console.log("At mwqDataEntry - general-chemistry Screen");
    } else {
      this.route.navigate(["mwqDataQc", "general-chemistry"]);
      console.log("At mwqDataQc - general-chemistry Screen");
    }
  }

  getColorValidator() {
    let colorVal = this.localStore.store.get("paramValues");
    if (colorVal != undefined && colorVal.data !== undefined) {
      this.fieldColorValidatior = colorVal.data;
    }
    console.log("Color Values", colorVal);
  }

checkValueThreshold(value, threshould, standDevition, maxValue) {

  if (value > threshould) {
    this.toastr.error(
      "Input Value " +
      value +
      " More than Threshould " +
      threshould +
      " Value "
    );
  }

  if (value > standDevition) {
    this.toastr.error(
      "Input Value " +
      value +
      " More than Prarmater Standard Deviation " +
      standDevition +
      " Value "
    );
  }

  if (value > maxValue) {
    this.toastr.error(
      "Input Value " +
      value +
      " More than Pararmater Max " +
      maxValue +
      " Value "
    );
  }
}

checkd5mbotoom(bottom5m) {
  console.log("--bottom5m----" + bottom5m);
}
openOptionModal() {
  this.optionsModalShowWindow = true;
}
optionsModalClose() {
  this.optionsModalShowWindow = false;
}
optionValueChange(form) {
  console.log("Changed", form.value);
  // this.toastClear();
}
}
