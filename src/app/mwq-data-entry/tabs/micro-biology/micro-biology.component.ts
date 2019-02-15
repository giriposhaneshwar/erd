import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { AppStorageService } from 'app/appConfiguration/app-config.service';
import { MwqDataEntryService } from 'app/mwq-data-entry/mwq-data-entry.service';
import { Config } from '../../../appConfiguration/config';
import { ToastsManager, ToastOptions } from "ng6-toastr/ng2-toastr";

@Component({
  selector: 'ms-micro-biology',
  templateUrl: './micro-biology.component.html',
  styleUrls: ['./micro-biology.component.scss']
})
export class MicroBiologyComponent implements OnInit {

  dataEntry: any;
  dataEntryKey: string = "dataEntry";
  totalColiformComponentKey: string = "Total_Coliform";
  enterococciComponentKey: string = "Enterococci";
  fecalColiformComponentKey: string = "Fecal_Coliform";

  totalColiform: any = { surfaceValue: "", mql: "", extractionMethod: "", testMethod: "" };
  enterococci: any = { surfaceValue: "", mql: "", extractionMethod: "", testMethod: "" };
  fecalColiform: any = { surfaceValue: "", mql: "", extractionMethod: "", testMethod: "" };

  //jsonMwqDataEntryInfo :any;
  graphData: any;
  graphDataKey: string = "microBiology";

  mwqDetails = [];
  mwqResp: any;

  testMethodDetails = [];
  testMethodResp: any;

  extractionMethodDetails = [];
  extractionMethodResp: any;
  saveMwqDataEntryResp: any;
  fieldColorValidatior: any;
  module: String;
  isDisabled: boolean = true;

  constructor(public route: Router,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public config: Config,
    public localStore: AppStorageService,
    private mwqDataEntryService: MwqDataEntryService) {
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
      this.loaadExtractionMethodData();

      let mod = this.config.getModuleName();
      this.module = mod.module;
      console.log("----module name----" + this.module);
      this.getColorValidator();
    }
    else {
      console.log("-----Group Not Matched-----" + groupInfo, currentUrl);
      //this.spinner.hide();
      this.route.navigate(["error"]);
    }
  }

  getColorValidator() {
    let colorVal = this.localStore.store.get('paramValues');
    if (colorVal != undefined && colorVal.data !== undefined) {
      this.fieldColorValidatior = colorVal.data;
    }
    console.log("Color Values", colorVal);
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

  inputOrderClass(data, key) {
    console.log("INput Data", data, key);
  }
  microBiologyTabNavPrev(module) {
    if (module === "mwqDataEntry") {
      this.route.navigate(["mwqDataEntry", "organic-chemistry"]);
      console.log("At mwqDataEntry - organic-chemistry Screen");
    }
    else {
      this.route.navigate(["mwqDataQc", "organic-chemistry"]);
      console.log("At mwqDataQc - organic-chemistry Screen");
    }
  }

  totalColiformDetailsSave(totalColiform, value, maxValueDeviation, meanValue, threshould, standDevition) {
    console.log(value, maxValueDeviation, meanValue, threshould, standDevition);
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.totalColiformComponentKey] = totalColiform;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }
  totalColiformDetailsListSave(totalColiform) {
    this.dataEntry[this.totalColiformComponentKey] = totalColiform;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  enterococciDetailsSave(enterococci, value, maxValueDeviation, meanValue, threshould, standDevition) {
    console.log(value, maxValueDeviation, meanValue, threshould, standDevition);
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.enterococciComponentKey] = enterococci;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }
  enterococciDetailsListSave(enterococci) {
    this.dataEntry[this.enterococciComponentKey] = enterococci;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  fecalColiformDetailsSave(fecalColiform, value, maxValueDeviation, meanValue, threshould, standDevition) {
    console.log(value, maxValueDeviation, meanValue, threshould, standDevition);
    this.checkValueThresholdNew(value, meanValue, threshould, standDevition, maxValueDeviation);
    this.dataEntry[this.fecalColiformComponentKey] = fecalColiform;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }
  fecalColiformDetailsListSave(fecalColiform) {
    this.dataEntry[this.fecalColiformComponentKey] = fecalColiform;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
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

  microBiologySiteDateSave(totalColiform, enterococci, fecalColiform) {
    this.toastClear();
    this.dataEntry[this.totalColiformComponentKey] = totalColiform;
    this.dataEntry[this.enterococciComponentKey] = enterococci;
    this.dataEntry[this.fecalColiformComponentKey] = fecalColiform;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    this.isDisabled = false;
  }

  microBiologyTabNavNext(module) {
    if (module === "mwqDataEntry") {
      this.route.navigate(["mwqDataEntry", "upload-files"]);
      console.log("At mwqDataEntry - upload-files Screen");
    }
    else {
      this.route.navigate(["mwqDataQc", "upload-files"]);
      console.log("At mwqDataQc - upload-files Screen");
    }
  }

  ngOnInit() {
    // get DAta
    let localData = this.localStore.store.get(this.dataEntryKey);
    let microBiologyGraphData = this.localStore.store.get("graphData");
    this.graphData = microBiologyGraphData.data.microBiology;

    if (localData.status == "success") {
      this.dataEntry = localData.data;
      if (this.dataEntry.hasOwnProperty(this.totalColiformComponentKey)) {
        this.totalColiform = this.dataEntry[this.totalColiformComponentKey];
        this.enterococci = this.dataEntry[this.enterococciComponentKey];
        this.fecalColiform = this.dataEntry[this.fecalColiformComponentKey];

      } else {
        // this.dataEntry = {};
        this.dataEntry[this.totalColiformComponentKey] = this.totalColiform;
        this.dataEntry[this.enterococciComponentKey] = this.enterococci;
        this.dataEntry[this.fecalColiformComponentKey] = this.fecalColiform;
        /* this.js["jsonInput"] = this.dataEntry; */
        this.localStore.store.set(this.dataEntryKey, this.dataEntry);
      }
    } else {
      // this.dataEntry = {};
      this.dataEntry[this.totalColiformComponentKey] = this.totalColiform;
      this.dataEntry[this.enterococciComponentKey] = this.enterococci;
      this.dataEntry[this.fecalColiformComponentKey] = this.fecalColiform;
    }
    //console.log(this.js);
    //console.log("Data Entry", this.dataEntryKey, this.js);
  }

  loadMQLData() {
    this.mwqDataEntryService.fetchMQLData().subscribe((resp) => {
      this.mwqResp = resp;
      this.mwqDetails = this.mwqResp.getMQLResult.MQLList;
      //   console.log("----mwqDetails----", this.mwqDetails);
    });
  }

  loadTestMethodData() {
    this.mwqDataEntryService.fetchTestMethodData().subscribe((resp) => {
      this.testMethodResp = resp;
      this.testMethodDetails = this.testMethodResp.getTestMethodResult.TestList;
      //  console.log("----testMethodDetails----", this.testMethodDetails);
    });
  }

  loaadExtractionMethodData() {
    this.mwqDataEntryService.fetchExtractionMethodData().subscribe((resp) => {
      this.extractionMethodResp = resp;
      this.extractionMethodDetails = this.extractionMethodResp.getExtractionResult.MQLList;
      //  console.log("----extractionMethodDetails----", this.extractionMethodDetails);
    });
  }

  toastClear() {
    this.toastr.clearAllToasts();
    //$('#toast-container').find('.toast').remove();
  }
}
