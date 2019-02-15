import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { AppStorageService } from 'app/appConfiguration/app-config.service';
import { MwqDataEntryService } from 'app/mwq-data-entry/mwq-data-entry.service';
import { Config } from 'app/appConfiguration/config';
import { ToastsManager } from "ng6-toastr/ng2-toastr";

@Component({
  selector: 'ms-general-chemistry',
  templateUrl: './general-chemistry.component.html',
  styleUrls: ['./general-chemistry.component.scss']
})
export class GeneralChemistryComponent implements OnInit {

  dataEntry: any;
  dataEntryKey: string = "dataEntry";
  totalPhospComponentKey: string = "TotalPhosp";
  totalNitrogenComponentKey: string = "Total_Nitrogen";
  nitriteNComponentKey: string = "Nitrite_N";
  nitrateNComponentKey: string = "Nitrate_N";
  silicateSlComponentKey: string = "Silicate_Sl";
  ammoniaNComponentKey: string = "Ammonia_N";
  phosphatePComponentKey: string = "Phosphate_P";
  bodComponentKey: string = "BOD";
  tssComponentKey: string = "TSS";
  graphData: any;
  graphDataKey: string = "generalChemistry";
  fieldColorValidatior: any;

  totalPhosp: any = { surfaceValue: "", mql: "", testMethod: "" };
  totalNitrogen: any = { surfaceValue: "", mql: "", testMethod: "" };
  nitriteN: any = { surfaceValue: "", mql: "", testMethod: "" };
  nitrateN: any = { surfaceValue: "", mql: "", testMethod: "" };
  silicateSl: any = { surfaceValue: "", mql: "", testMethod: "" };
  ammoniaN: any = { surfaceValue: "", mql: "", testMethod: "" };
  phosphateP: any = { surfaceValue: "", mql: "", testMethod: "" };
  bod: any = { surfaceValue: "", mql: "", testMethod: "" };
  tss: any = { surfaceValue: "", mql: "", testMethod: "" };

  module: String;
  rangeMaxValue: number;
  mwqDetails = [];
  mwqResp: any;
  testMethodDetails = [];
  testMethodResp: any;
  extractionMethodDetails = [];
  extractionMethodResp: any;
  isDisabled: boolean = true;

  constructor(
    public route: Router,
    public toastr: ToastsManager,
    public localStore: AppStorageService,
    private mwqDataEntryService: MwqDataEntryService,
    vcr: ViewContainerRef,
    public config: Config) {
    this.toastr.setRootViewContainerRef(vcr);

    let currentUrl = this.route.url;
    let groupInfo = sessionStorage.getItem("groups");
    let username = sessionStorage.getItem("username");

    if (groupInfo === "2" || groupInfo === "20") {
      // this.spinner.show();
      console.log("-----Group Mached-----" + groupInfo, username, currentUrl);
      console.log("Executing Configurations", Config.appConfig.mainNav);
      this.loadMQLData();
      this.loadTestMethodData();
      this.ngOnInit();
    }
    else {
      console.log("-----Group Not Matched-----" + groupInfo, currentUrl);
      //this.spinner.hide();
      this.route.navigate(["error"]);
    }
  }

  inputOrderClass(data, key) {
    console.log("Input Data", data, key);
  }

  totalPhospDetailsSave(totalPhosp, value, maxValueDeviation, meanValue, threshould, standDevition) {
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.totalPhospComponentKey] = totalPhosp;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }
  totalPhospDetailsListSave(totalPhosp) {
    this.dataEntry[this.totalPhospComponentKey] = totalPhosp;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  totalNitrogenDetailsSave(totalNitrogen, value, maxValueDeviation, meanValue, threshould, standDevition) {
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.totalNitrogenComponentKey] = totalNitrogen;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }
  totalNitrogenDetailsListSave(totalNitrogen) {
    this.dataEntry[this.totalNitrogenComponentKey] = totalNitrogen;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  nitriteNDetailsSave(nitriteN, value, maxValueDeviation, meanValue, threshould, standDevition) {
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.nitriteNComponentKey] = nitriteN;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }
  nitriteNDetailsListSave(nitriteN){
     this.dataEntry[this.nitriteNComponentKey] = nitriteN;
     this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  nitrateNDetailsSave(nitrateN, value, maxValueDeviation, meanValue, threshould, standDevition) {
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.nitrateNComponentKey] = nitrateN;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }
  nitrateNDetailsListSave(nitrateN){
    this.dataEntry[this.nitrateNComponentKey] = nitrateN;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  silicateSlDetailsSave(silicateSl, value, maxValueDeviation, meanValue, threshould, standDevition) {
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.silicateSlComponentKey] = silicateSl;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }
  silicateSlDetailsListSave(silicateSl){
    this.dataEntry[this.silicateSlComponentKey] = silicateSl;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  ammoniaNDetailsSave(ammoniaN, value, maxValueDeviation, meanValue, threshould, standDevition) {
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.ammoniaNComponentKey] = ammoniaN;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }
  ammoniaNDetailsListSave(ammoniaN){
    this.dataEntry[this.ammoniaNComponentKey] = ammoniaN;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry); 
  }

  phosphatePDetailsSave(phosphateP, value, maxValueDeviation, meanValue, threshould, standDevition) {
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.phosphatePComponentKey] = phosphateP;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }
  phosphatePDetailsListSave(phosphateP){
    this.dataEntry[this.phosphatePComponentKey] = phosphateP;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  bodDetailsSave(bod, value, maxValueDeviation, meanValue, threshould, standDevition) {
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.bodComponentKey] = bod;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }
  bodDetailsListSave(bod){
    this.dataEntry[this.bodComponentKey] = bod;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  tssDetailsSave(tss, value, maxValueDeviation, meanValue, threshould, standDevition) {
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.tssComponentKey] = tss;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }
  tssDetailsListSave(tss){
    this.dataEntry[this.tssComponentKey] = tss;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  generalChemistryDetailsSave(totalPhosp, totalNitrogen, nitriteN, nitrateN, silicateSl, ammoniaN, phosphateP, bod, tss) {
    this.toastClear();
    this.dataEntry[this.totalPhospComponentKey] = totalPhosp;
    this.dataEntry[this.totalNitrogenComponentKey] = totalNitrogen;
    this.dataEntry[this.nitriteNComponentKey] = nitriteN;
    this.dataEntry[this.nitrateNComponentKey] = nitrateN;
    this.dataEntry[this.silicateSlComponentKey] = silicateSl;
    this.dataEntry[this.ammoniaNComponentKey] = ammoniaN;
    this.dataEntry[this.phosphatePComponentKey] = phosphateP;
    this.dataEntry[this.bodComponentKey] = bod;
    this.dataEntry[this.tssComponentKey] = tss;

    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    this.isDisabled = false;
    console.log("At Save Screen");
  }

  genChemTabNavPrev(module) {
    if (module === "mwqDataEntry") {
      this.route.navigate(["mwqDataEntry", "in-situ-parameters"]);
      console.log("At mwqDataEntry - in-situ-parameters Screen");
    }
    else {
      this.route.navigate(["mwqDataQc", "in-situ-parameters"]);
      console.log("At mwqDataQc - in-situ-parameters Screen");
    }
    // this.route.navigate(["mwqDataEntry", "in-situ-parameters"]);
    // console.log("At Edit Screen");
  }
  genChemTabNavNext(module) {
    if (module === "mwqDataEntry") {
      this.route.navigate(["mwqDataEntry", "in-organic-chemistry"]);
      console.log("At mwqDataEntry - in-organic-chemistry Screen");
    }
    else {
      this.route.navigate(["mwqDataQc", "in-organic-chemistry"]);
      console.log("At mwqDataQc - in-organic-chemistry Screen");
    }
    // this.route.navigate(["mwqDataEntry", "in-organic-chemistry"]);
    // console.log("At Next Screen");
  }

  getColorValidator() {
    let colorVal = this.localStore.store.get('paramValues');
    if (colorVal != undefined && colorVal.data !== undefined) {
      this.fieldColorValidatior = colorVal.data;
    }
    console.log("Color Values", colorVal);
  }


  ngOnInit() {
    let mod = this.config.getModuleName();
    this.module = mod.module;
    console.log("----module name----" + this.module);

    // get DAta
    let localData = this.localStore.store.get(this.dataEntryKey);
    let generalChemistrygraphData = this.localStore.store.get("graphData");
    this.graphData = generalChemistrygraphData.data.generalChemistry;

    /* setTimeout(() => {
      this.graphData.Sechi_Disc_Surface = ["30", "80", "20", "95"];
    }, 5000);
 */
    if (localData.status == "success") {
      this.dataEntry = localData.data;
      if (this.dataEntry.hasOwnProperty(this.totalPhospComponentKey)) {
        this.totalPhosp = this.dataEntry[this.totalPhospComponentKey];
        this.totalNitrogen = this.dataEntry[this.totalNitrogenComponentKey];
        this.nitriteN = this.dataEntry[this.nitriteNComponentKey];
        this.nitrateN = this.dataEntry[this.nitrateNComponentKey];
        this.silicateSl = this.dataEntry[this.silicateSlComponentKey];
        this.ammoniaN = this.dataEntry[this.ammoniaNComponentKey];
        this.phosphateP = this.dataEntry[this.phosphatePComponentKey];
        this.bod = this.dataEntry[this.bodComponentKey];
        this.tss = this.dataEntry[this.tssComponentKey];

      } else {
        // this.dataEntry = {};
        this.dataEntry[this.totalPhospComponentKey] = this.totalPhosp;
        this.dataEntry[this.totalNitrogenComponentKey] = this.totalNitrogen;
        this.dataEntry[this.nitriteNComponentKey] = this.nitriteN;
        this.dataEntry[this.nitrateNComponentKey] = this.nitrateN;
        this.dataEntry[this.silicateSlComponentKey] = this.silicateSl;
        this.dataEntry[this.ammoniaNComponentKey] = this.ammoniaN;
        this.dataEntry[this.phosphatePComponentKey] = this.phosphateP;
        this.dataEntry[this.bodComponentKey] = this.bod;
        this.dataEntry[this.tssComponentKey] = this.tss;


        this.localStore.store.set(this.dataEntryKey, this.dataEntry);
      }
    } else {
      // this.dataEntry = {};
      this.dataEntry[this.totalPhospComponentKey] = this.totalPhosp;
      this.dataEntry[this.totalNitrogenComponentKey] = this.totalNitrogen;
      this.dataEntry[this.nitriteNComponentKey] = this.nitriteN;
      this.dataEntry[this.nitrateNComponentKey] = this.nitrateN;
      this.dataEntry[this.silicateSlComponentKey] = this.silicateSl;
      this.dataEntry[this.ammoniaNComponentKey] = this.ammoniaN;
      this.dataEntry[this.phosphatePComponentKey] = this.phosphateP;
      this.dataEntry[this.bodComponentKey] = this.bod;
      this.dataEntry[this.tssComponentKey] = this.tss;
    }

    this.getColorValidator();
    console.log("Data Entry", this.dataEntryKey, this.dataEntry);
  }

  loadMQLData() {
    this.mwqDataEntryService.fetchMQLData().subscribe((resp) => {
      this.mwqResp = resp;
      this.mwqDetails = this.mwqResp.getMQLResult.MQLList;
      // console.log("----mwqDetails----", this.mwqDetails);
    });
  }

  loadTestMethodData() {
    this.mwqDataEntryService.fetchTestMethodData().subscribe((resp) => {
      this.testMethodResp = resp;
      this.testMethodDetails = this.testMethodResp.getTestMethodResult.TestList;
      //console.log("----testMethodDetails----", this.testMethodDetails);
    });
  }
  checkValueThreshold(value, threshould, standDevition, maxValue) {
    if (value > threshould) {
      this.toastr.error("Input Value " + value + " More than Threshold " + threshould + " Value ");
    }

    if (value > standDevition) {
      this.toastr.error("Input Value " + value + " More than Parameter Standard Deviation " + standDevition + " Value ");
    }

    if (value > maxValue) {
      this.toastr.error("Input Value " + value + " More than Parameter Max " + maxValue + " Value ");
    }
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
      this.toastr.warning(
        "Input Value " +
        value +
        " Less than Parameter Mean " +
        meanValue +
        " Value "
      );
    }

  }

  toastClear() {
    this.toastr.clearAllToasts();
    //$('#toast-container').find('.toast').remove();
  }

}
