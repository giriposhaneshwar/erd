import { Component, OnInit, ViewContainerRef, HostListener, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { AppStorageService } from "app/appConfiguration/app-config.service";
import { Config } from "app/appConfiguration/config";
import { ToastsManager, Toast } from "ng6-toastr";
import { $$iterator } from "rxjs/internal/symbol/iterator";
import * as $ from 'jquery';
import * as d3 from "d3";
import { d } from "@angular/core/src/render3";
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

  tempBottomGraphData: any;
  condBottomGraphData: any;
  saliBottomGraphData: any;
  phBottomGraphData: any;
  dissBottomGraphData: any;
  chloBottomGraphData: any;

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

    /* setInterval( () => {
      let newVal = Math.floor(Math.random() * 100) +1;
      this.graphData.Temparature_Bottom[1] = newVal;
      this.graphData.Temparature_Bottom[3] = newVal;
    }, 2000); */

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

  temperatureDetailsSave(temperature, value, maxValueDeviation, meanValue, threshould, standDevition) {
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.temperatureComponentKey] = temperature;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  conductivityDetailsSave(conductivity, value, maxValueDeviation, meanValue, threshould, standDevition) {
    console.log(value, maxValueDeviation, meanValue, threshould, standDevition);
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.conductivityComponentKey] = conductivity;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  salinityDetailsSave(salinity, value, maxValueDeviation, meanValue, threshould, standDevition) {
    console.log(value, maxValueDeviation, meanValue, threshould, standDevition);
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.salinityComponentKey] = salinity;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  pHDetailsSave(pH, value, maxValueDeviation, meanValue, threshould, standDevition) {
    console.log(value, maxValueDeviation, meanValue, threshould, standDevition);
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.pHComponentKey] = pH;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  dissolvedODetailsSave(dissolvedO, value, maxValueDeviation, meanValue, threshould, standDevition) {
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.dissolvedOComponentKey] = dissolvedO;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  Chlorophyll_aDetailsSave(Chlorophyll_a, value, maxValueDeviation, meanValue, threshould, standDevition) {
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.chlorophyll_aComponentKey] = Chlorophyll_a;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  sechiDiscDetailsSave(sechiDisc, value, maxValueDeviation, meanValue, threshould, standDevition) {
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.sechiDiscComponentKey] = sechiDisc;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }


  insituDetailsSave(temperature, conductivity, salinity, pH, dissolvedO, Chlorophyll_a, sechiDisc) {
    this.toastr.clearAllToasts();

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


  insituTemparatureGraphDataGenrate(graphData, thereshold, graphName) {
    if (this.tempBottomGraphData === undefined) {
      this.tempBottomGraphData = this.graphData.Temparature_Bottom;
      console.log("-----tempBottomGraphData-----" + this.tempBottomGraphData);
    }
    if (graphName === 'Temparature_Bottom') {
      this.graphData.Temparature_Bottom = this.tempBottomGraphData
      //console.log("-----IF-----" + graphData, thereshold, graphName, this.tempBottomGraphData);
    }
    else {
      let tempGraphData = this.graphData;
      this.graphData = tempGraphData;
      this.graphData.Temparature_Bottom = graphData;
      //console.log("-----ELSE-----" + graphData, thereshold, graphName, this.tempBottomGraphData);
    }
  }

  insituConductivityGraphDataGenrate(graphData, thereshold,graphName) {

   /*  console.log(graphData, thereshold);
    let tempGraphData = this.graphData;
    this.graphData = tempGraphData;
    this.graphData.Conductivity_Bottom = graphData; */
    if (this.condBottomGraphData === undefined) {
      this.condBottomGraphData = this.graphData.Conductivity_Bottom;
      console.log("-----condBottomGraphData-----" + this.condBottomGraphData);
    }
    if (graphName === 'Conductivity_Bottom') {
      this.graphData.Conductivity_Bottom = this.condBottomGraphData
      //console.log("-----IF-----" + graphData, thereshold, graphName, this.condBottomGraphData);
    }
    else {
      let tempGraphData = this.graphData;
      this.graphData = tempGraphData;
      this.graphData.Conductivity_Bottom = graphData;
      //console.log("-----ELSE-----" + graphData, thereshold, graphName, this.condBottomGraphData);
    }
  }

  insituSalinityGraphDataGenrate(graphData, thereshold,graphName) {
   /*  this.toastr.clearAllToasts();
    //this.graphData.Temparature_Bottom = graphData;
    let tempGraphData = this.graphData;
    this.graphData = tempGraphData;
    this.graphData.Salinity_Bottom = graphData; */

    if (this.saliBottomGraphData === undefined) {
      this.saliBottomGraphData = this.graphData.Salinity_Bottom;
      console.log("-----saliBottomGraphData-----" + this.saliBottomGraphData);
    }
    if (graphName === 'Salinity_Bottom') {
      this.graphData.Salinity_Bottom = this.saliBottomGraphData
      //console.log("-----IF-----" + graphData, thereshold, graphName, this.saliBottomGraphData);
    }
    else {
      let tempGraphData = this.graphData;
      this.graphData = tempGraphData;
      this.graphData.Salinity_Bottom = graphData;
      //console.log("-----ELSE-----" + graphData, thereshold, graphName, this.saliBottomGraphData);
    }
  }

  insituinsitupHGraphDataGenrate(graphData, thereshold,graphName) {
/*     this.toastr.clearAllToasts();
    //this.graphData.Temparature_Bottom = graphData;
    let tempGraphData = this.graphData;
    this.graphData = tempGraphData;
    this.graphData.pH_Bottom = graphData; */

    if (this.phBottomGraphData === undefined) {
      this.phBottomGraphData = this.graphData.pH_Bottom;
      console.log("-----phBottomGraphData-----" + this.phBottomGraphData);
    }
    if (graphName === 'pH_Bottom') {
      this.graphData.pH_Bottom = this.phBottomGraphData
      //console.log("-----IF-----" + graphData, thereshold, graphName, this.phBottomGraphData);
    }
    else {
      let tempGraphData = this.graphData;
      this.graphData = tempGraphData;
      this.graphData.pH_Bottom = graphData;
      //console.log("-----ELSE-----" + graphData, thereshold, graphName, this.phBottomGraphData);
    }
  }

  insituinsituDissolved_O_GraphDataGenrate(graphData, thereshold,graphName) {
/*     this.toastr.clearAllToasts();
    //this.graphData.Temparature_Bottom = graphData;
    let tempGraphData = this.graphData;
    this.graphData = tempGraphData;
    this.graphData.Dissolved_O_Bottom = graphData; */

    if (this.dissBottomGraphData === undefined) {
      this.dissBottomGraphData = this.graphData.Dissolved_O_Bottom;
      console.log("-----dissBottomGraphData-----" + this.dissBottomGraphData);
    }
    if (graphName === 'Dissolved_O_Bottom') {
      this.graphData.Dissolved_O_Bottom = this.dissBottomGraphData
      //console.log("-----IF-----" + graphData, thereshold, graphName, this.dissBottomGraphData);
    }
    else {
      let tempGraphData = this.graphData;
      this.graphData = tempGraphData;
      this.graphData.Dissolved_O_Bottom = graphData;
      //console.log("-----ELSE-----" + graphData, thereshold, graphName, this.dissBottomGraphData);
    }
  }

  insituinsituChlorophyll_aGraphDataGenrate(graphData, thereshold,graphName) {
  /*   this.toastr.clearAllToasts();
    //this.graphData.Temparature_Bottom = graphData;
    let tempGraphData = this.graphData;
    this.graphData = tempGraphData;
    this.graphData.Chlorophyll_a_Bottom = graphData; */

    if (this.chloBottomGraphData === undefined) {
      this.chloBottomGraphData = this.graphData.Chlorophyll_a_Bottom;
      console.log("-----chloBottomGraphData-----" + this.chloBottomGraphData);
    }
    if (graphName === 'Chlorophyll_a_Bottom') {
      this.graphData.Chlorophyll_a_Bottom = this.chloBottomGraphData
      //console.log("-----IF-----" + graphData, thereshold, graphName, this.chloBottomGraphData);
    }
    else {
      let tempGraphData = this.graphData;
      this.graphData = tempGraphData;
      this.graphData.Chlorophyll_a_Bottom = graphData;
      //console.log("-----ELSE-----" + graphData, thereshold, graphName, this.chloBottomGraphData);
    }
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
        " More than Threshold " +
        threshould +
        " Value "
      );
    }

    if (value > standDevition) {
      this.toastr.error(
        "Input Value " +
        value +
        " More than Parameter Standard Deviation " +
        standDevition +
        " Value "
      );
    }

    if (value > maxValue) {
      this.toastr.error(
        "Input Value " +
        value +
        " More than Parameter Max " +
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


  checkValueThresholdNew(value, meanValue, threshould, standDevition, rangeMaxValue) {

    // console.log(value, minValue, maxValue, meanValue, threshould, standDevition);
    if (value > threshould) {
      this.toastr.error(
        "Input Value " +
        value +
        " More than Threshold " +
        threshould +
        " Value "
      );
    }

    if (value > standDevition) {
      this.toastr.error(
        "Input Value " +
        value +
        " More than Parameter Standard Deviation " +
        standDevition +
        " Value "
      );
    }

    if (value > rangeMaxValue) {
      this.toastr.error(
        "Input Value " +
        value +
        " Parameter Out of range " +
        rangeMaxValue +
        " Value "
      );
    }

    if (value < meanValue) {
      
      //this.toastClear();
//debugger;
//console.log(this.toastr.index);
      this.toastr.warning(
        "Input Value " +
        value +
        " Less than Parameter Mean " +
        meanValue +
        " Value "
      );
      
    }

  }
}
