import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppStorageService } from "app/appConfiguration/app-config.service";
import { MwqDataEntryService } from "app/mwq-data-entry/mwq-data-entry.service";
import { Config } from "app/appConfiguration/config";

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

  constructor(public route: Router, public localStore: AppStorageService, private mwqDataEntryService: MwqDataEntryService, public config: Config) {
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
    //this.route.navigate(["mwqDataEntry", "in-organic-chemistry"]);
  }
  organicChemistrySiteDetailsSave(oc_totalPhosp, oc_tph) {
    this.dataEntry[this.oc_totalPhospComponentKey] = oc_totalPhosp;
    this.dataEntry[this.oc_tphComponentKey] = oc_tph;

    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
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
  ngOnInit() {
    let mod = this.config.getModuleName();
    this.module = mod.module;
    console.log("----module name----" + this.module);
    // get DAta
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

}
