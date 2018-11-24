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

  module: String;

  constructor(public route: Router,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public config: Config,
    public localStore: AppStorageService,
    private mwqDataEntryService: MwqDataEntryService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.loadMQLData();
    this.loadTestMethodData();
    this.loaadExtractionMethodData();
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
    //this.route.navigate(["mwqDataEntry", "organic-chemistry"]);
    //console.log("At organic-chemistry Screen");
  }
  microBiologySiteDateSave(totalColiform, enterococci, fecalColiform) {

    this.dataEntry[this.totalColiformComponentKey] = totalColiform;
    this.dataEntry[this.enterococciComponentKey] = enterococci;
    this.dataEntry[this.fecalColiformComponentKey] = fecalColiform;
    // this.js["jsonInput"] = this.dataEntry;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);

    /* let jsonMwqDataEntryInfo = this.localStore.store.get(this.dataEntryKey);
    console.log("At microBiologySiteDateSave Screen ----------" + JSON.stringify(this.js));
    console.log("jsonMwqDataEntryInfo ------" + JSON.stringify(jsonMwqDataEntryInfo)); */
    //this.saveMwqData(this.js);
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
    // this.route.navigate(["mwqDataEntry", "upload-files"]);
    // console.log("At upload-files Screen");
  }

  ngOnInit() {
    let mod = this.config.getModuleName();
    this.module = mod.module;
    console.log("----module name----" + this.module);
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
}
