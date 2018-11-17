import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppStorageService } from "app/appConfiguration/app-config.service";
import { MwqDataEntryService } from "app/mwq-data-entry/mwq-data-entry.service";

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
  
  oc_totalPhosp:any=  { surfaceValue: "",  mql: "",  extractionMethod:"" , testMethod: "" };
  oc_tph:any= { surfaceValue: "",  mql: "",  extractionMethod:"" , testMethod: "" };

  constructor(public route: Router, public localStore: AppStorageService, private mwqDataEntryService: MwqDataEntryService) {
    this.loadMQLData();
    this.loadTestMethodData();
    this.loaadExtractionMethodData();
  }
  siteDatePrev() {
    this.route.navigate(["mwqDataEntry", "in-organic-chemistry"]);
  }
  organicChemistrySiteDetailsSave(oc_totalPhosp,oc_tph) {
    this.dataEntry[this.oc_totalPhospComponentKey] = oc_totalPhosp;
    this.dataEntry[this.oc_tphComponentKey] = oc_tph;

    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    console.log("At organicChemistrySiteDetails Screen");
  }
  siteDateNext() {
    this.route.navigate(["mwqDataEntry", "microbiology"]);
  }
  ngOnInit() {
    // get DAta
    let localData = this.localStore.store.get(this.dataEntryKey);
    let graphData = this.localStore.store.get("graphData");
    this.graphData = graphData.data.historicalGraphOutput[this.graphDataKey];

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

  mwqDetails = [];
  mwqResp: any;

  testMethodDetails = [];
  testMethodResp: any;

  extractionMethodDetails = [];
  extractionMethodResp: any;

  loadMQLData() {
    this.mwqDataEntryService.fetchMQLData().subscribe((resp) => {
      this.mwqResp = resp;
      this.mwqDetails = this.mwqResp.getMQLResult.MQLList;
      console.log("----mwqDetails----", this.mwqDetails);
    });
  }

  loadTestMethodData() {
    this.mwqDataEntryService.fetchTestMethodData().subscribe((resp) => {
      this.testMethodResp = resp;
      this.testMethodDetails = this.testMethodResp.getTestMethodResult.TestList;
      console.log("----testMethodDetails----", this.testMethodDetails);
    });
  }

  loaadExtractionMethodData() {
    this.mwqDataEntryService.fetchExtractionMethodData().subscribe((resp) => {
      this.extractionMethodResp = resp;
      this.extractionMethodDetails = this.extractionMethodResp.getExtractionResult.MQLList;
      console.log("----extractionMethodDetails----", this.extractionMethodDetails);
    });
  }

}
