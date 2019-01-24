import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { AppStorageService } from "app/appConfiguration/app-config.service";
import { MwqDataEntryService } from "app/mwq-data-entry/mwq-data-entry.service";
import { Config } from "app/appConfiguration/config";
import { ToastsManager } from "ng6-toastr";

@Component({
  selector: "ms-organic-chemistry",
  templateUrl: "./organic-chemistry.component.html",
  styleUrls: ["./organic-chemistry.component.scss"]
})
export class OrganicChemistryComponent implements OnInit {

  dataEntry: any;
  dataEntryKey: string = "dataEntry";
  oc_totalPhospComponentKey: string = "Total_Phosp";
  oc_tphComponentKey: string = "TPH";

  graphData: any;
  graphDataKey: string = "organicChemistry";

  oc_totalPhosp: any = { surfaceValue: "", mql: "", extractionMethod: "", testMethod: "" };
  oc_tph: any = { surfaceValue: "", mql: "", extractionMethod: "", testMethod: "" };

  mwqDetails = [];
  mwqResp: any;

  testMethodDetails = [];
  testMethodResp: any;

  extractionMethodDetails = [];
  extractionMethodResp: any;

  module: String;
  fieldColorValidatior: any;
  isDisabled: boolean = true;
  
  constructor(public route: Router, public localStore: AppStorageService,
    private mwqDataEntryService: MwqDataEntryService, vcr: ViewContainerRef,
    public toastr: ToastsManager,
    public config: Config) {
    this.toastr.setRootViewContainerRef(vcr);
    this.loadMQLData();
    this.loadTestMethodData();
    this.loaadExtractionMethodData();
  }

  orgChemTabNavPrev(module) {
    if (module === "mwqDataEntry") {
      this.route.navigate(["mwqDataEntry", "in-organic-chemistry"]);
      console.log("At mwqDataEntry - in-organic-chemistry Screen");
    }
    else {
      this.route.navigate(["mwqDataQc", "in-organic-chemistry"]);
      console.log("At mwqDataQc - in-organic-chemistry Screen");
    }
  }

  
  oc_totalPhospDetailsSave(oc_totalPhosp){
    this.dataEntry[this.oc_totalPhospComponentKey] = oc_totalPhosp;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  oc_tphDetailsSave(oc_tph){
    this.dataEntry[this.oc_tphComponentKey] = oc_tph;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }
  
  organicChemistrySiteDetailsSave(oc_totalPhosp, oc_tph) {
    this.dataEntry[this.oc_totalPhospComponentKey] = oc_totalPhosp;
    this.dataEntry[this.oc_tphComponentKey] = oc_tph;

    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    this.isDisabled = false;
    console.log("At organicChemistrySiteDetails Screen");
  }
  orgChemTabNavNext(module) {
    if (module === "mwqDataEntry") {
      this.route.navigate(["mwqDataEntry", "microbiology"]);
      console.log("At mwqDataEntry - microbiology Screen");
    }
    else {
      this.route.navigate(["mwqDataQc", "microbiology"]);
      console.log("At mwqDataQc - microbiology Screen");
    }
    //this.route.navigate(["mwqDataEntry", "microbiology"]);
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
    this.getColorValidator();
    let localData = this.localStore.store.get(this.dataEntryKey);
    let organicChemistryGraphData = this.localStore.store.get("graphData");
    this.graphData = organicChemistryGraphData.data.organicChemistry;

    if (localData.status == "success") {
      this.dataEntry = localData.data;
      if (this.dataEntry.hasOwnProperty(this.oc_totalPhospComponentKey)) {
        this.oc_totalPhosp = this.dataEntry[this.oc_totalPhospComponentKey];
        this.oc_tph = this.dataEntry[this.oc_tphComponentKey];

      } else {
        // this.dataEntry = {};
        this.dataEntry[this.oc_totalPhospComponentKey] = this.oc_totalPhosp;
        this.dataEntry[this.oc_tphComponentKey] = this.oc_tph;

        this.localStore.store.set(this.dataEntryKey, this.dataEntry);
      }
    } else {
      // this.dataEntry = {};
      this.dataEntry[this.oc_totalPhospComponentKey] = this.oc_totalPhosp;
      this.dataEntry[this.oc_tphComponentKey] = this.oc_tph;
    }
    console.log("Data Entry", this.dataEntryKey, this.dataEntry);
  }

  loadMQLData() {
    this.mwqDataEntryService.fetchMQLData().subscribe((resp) => {
      this.mwqResp = resp;
      this.mwqDetails = this.mwqResp.getMQLResult.MQLList;
      //console.log("----mwqDetails----", this.mwqDetails);
    });
  }

  loadTestMethodData() {
    this.mwqDataEntryService.fetchTestMethodData().subscribe((resp) => {
      this.testMethodResp = resp;
      this.testMethodDetails = this.testMethodResp.getTestMethodResult.TestList;
      //console.log("----testMethodDetails----", this.testMethodDetails);
    });
  }

  loaadExtractionMethodData() {
    this.mwqDataEntryService.fetchExtractionMethodData().subscribe((resp) => {
      this.extractionMethodResp = resp;
      this.extractionMethodDetails = this.extractionMethodResp.getExtractionResult.MQLList;
      //console.log("----extractionMethodDetails----", this.extractionMethodDetails);
    });
  }

  checkValueThreshold(value, threshould, standDevition, maxValue) {
    if (value > threshould) {
      this.toastr.error("Input Value " + value + " More than Threshould " + threshould + " Value ");
    }

    if (value > standDevition) {
      this.toastr.error("Input Value " + value + " More than Prarmater Standard Deviation " + standDevition + " Value ");
    }

    if (value > maxValue) {
      this.toastr.error("Input Value " + value + " More than Pararmater Max " + maxValue + " Value ");
    }
  }

  toastClear() {
    this.toastr.clearAllToasts();
    //$('#toast-container').find('.toast').remove();
  }
  
}
