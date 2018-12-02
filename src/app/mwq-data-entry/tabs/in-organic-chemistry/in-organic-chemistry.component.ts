import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { AppStorageService } from "app/appConfiguration/app-config.service";
import { MwqDataEntryService } from "app/mwq-data-entry/mwq-data-entry.service";
import { Config } from "app/appConfiguration/config";
import { ToastsManager } from "ng6-toastr";

@Component({
  selector: "ms-in-organic-chemistry",
  templateUrl: "./in-organic-chemistry.component.html",
  styleUrls: ["./in-organic-chemistry.component.scss"]
})
export class InOrganicChemistryComponent implements OnInit {

  dataEntry: any;
  dataEntryKey: string = "dataEntry";
  iocw_cadmiumComponentKey: string = "Cadmium_Water";
  iocw_chromiumComponentKey: string = "Chromium_Water";
  iocw_cobaltComponentKey: string = "Cobalt_Water";
  iocw_copperComponentKey: string = "Copper_Water";
  iocw_leadComponentKey: string = "Lead_Water";
  iocw_manganeseComponentKey: string = "Manganese_Water";
  iocw_nickelComponentKey: string = "Nickel_Water";
  iocw_zincComponentKey: string = "Zinc_Water";
  iocw_ironComponentKey: string = "Iron_Water";
  iocw_mercuryComponentKey: string = "Mercury_Water";

  iocs_cadmiumComponentKey: string = "Cadmium_Sediment";
  iocs_chromiumComponentKey: string = "Chromium_Sediment";
  iocs_cobaltComponentKey: string = "Cobalt_Sediment";
  iocs_copperComponentKey: string = "Copper_Sediment";
  iocs_leadComponentKey: string = "Lead_Sediment";
  iocs_manganeseComponentKey: string = "Manganese_Sediment";
  iocs_nickelComponentKey: string = "Nickel_Sediment";
  iocs_zincComponentKey: string = "Zinc_Sediment";
  iocs_ironComponentKey: string = "Iron_Sediment";
  iocs_mercuryComponentKey: string = "Mercury_Sediment";

  iocw_cadmium: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocw_chromium: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocw_cobalt: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocw_copper: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocw_lead: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocw_manganese: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocw_nickel: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocw_zinc: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocw_iron: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocw_mercury: any = { surfaceValue: "", mql: "", testMethod: "" };

  iocs_cadmium: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocs_chromium: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocs_cobalt: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocs_copper: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocs_lead: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocs_manganese: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocs_nickel: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocs_zinc: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocs_iron: any = { surfaceValue: "", mql: "", testMethod: "" };
  iocs_mercury: any = { surfaceValue: "", mql: "", testMethod: "" };

  module: String;
  graphData: any;
  graphDataKey: string = "inOrganicChemistry";
  fieldColorValidatior: any;

  constructor(public route: Router, public localStore: AppStorageService,
    private mwqDataEntryService: MwqDataEntryService, public config: Config, public toastr: ToastsManager,vcr: ViewContainerRef ) {
      this.toastr.setRootViewContainerRef(vcr);
    this.loadMQLData();
    this.loadTestMethodData();
    
  }

  checkValueThreshold(value, threshould, standDevition, maxValue) {
    if (value > threshould) {
      this.toastr.error("Input Value " + value + " Morethan Threshould " + threshould + " Value ");
    }

    if (value > standDevition) {
      this.toastr.error("Input Value " + value + " Morethan Prarmater StandDevition " + standDevition + " Value ");
    }

    if (value > maxValue) {
      this.toastr.error("Input Value " + value + " Morethan Pararmater Max " + maxValue + " Value ");
    }
  }


  inOrgChemTabNavPrev(module) {
    if (module === "mwqDataEntry") {
      this.route.navigate(["mwqDataEntry", "general-chemistry"]);
      console.log("At mwqDataEntry - general-chemistry Screen");
    }
    else {
      this.route.navigate(["mwqDataQc", "general-chemistry"]);
      console.log("At mwqDataQc - general-chemistry Screen");
    }
    // this.route.navigate(["mwqDataEntry", "general-chemistry"]);
  }
  inOrganicChemistryDetailsSave(iocw_cadmium, iocw_chromium, iocw_cobalt, iocw_copper, iocw_lead, iocw_manganese,
    iocw_nickel, iocw_zinc, iocw_iron, iocw_mercury, iocs_cadmium, iocs_chromium, iocs_cobalt, iocs_copper, iocs_lead,
    iocs_manganese, iocs_nickel, iocs_zinc, iocs_iron, iocs_mercury) {

    this.dataEntry[this.iocw_cadmiumComponentKey] = iocw_cadmium;
    this.dataEntry[this.iocw_chromiumComponentKey] = iocw_chromium;
    this.dataEntry[this.iocw_cobaltComponentKey] = iocw_cobalt;
    this.dataEntry[this.iocw_copperComponentKey] = iocw_copper;
    this.dataEntry[this.iocw_leadComponentKey] = iocw_lead;
    this.dataEntry[this.iocw_manganeseComponentKey] = iocw_manganese;
    this.dataEntry[this.iocw_nickelComponentKey] = iocw_nickel;
    this.dataEntry[this.iocw_zincComponentKey] = iocw_zinc;
    this.dataEntry[this.iocw_ironComponentKey] = iocw_iron;
    this.dataEntry[this.iocw_mercuryComponentKey] = iocw_mercury;

    this.dataEntry[this.iocs_cadmiumComponentKey] = iocs_cadmium;
    this.dataEntry[this.iocs_chromiumComponentKey] = iocs_chromium;
    this.dataEntry[this.iocs_cobaltComponentKey] = iocs_cobalt;
    this.dataEntry[this.iocs_copperComponentKey] = iocs_copper;
    this.dataEntry[this.iocs_leadComponentKey] = iocs_lead;
    this.dataEntry[this.iocs_manganeseComponentKey] = iocs_manganese;
    this.dataEntry[this.iocs_nickelComponentKey] = iocs_nickel;
    this.dataEntry[this.iocs_zincComponentKey] = iocs_zinc;
    this.dataEntry[this.iocs_ironComponentKey] = iocs_iron;
    this.dataEntry[this.iocs_mercuryComponentKey] = iocs_mercury;

    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    console.log("At inOrganicChemistryDetails Save Screen");
  }
  inOrgChemTabNavNext(module) {
    if (module === "mwqDataEntry") {
      this.route.navigate(["mwqDataEntry", "organic-chemistry"]);
      console.log("At mwqDataEntry - organic-chemistry Screen");
    }
    else {
      this.route.navigate(["mwqDataQc", "organic-chemistry"]);
      console.log("At mwqDataQc - organic-chemistry Screen");
    }
    //this.route.navigate(["mwqDataEntry", "organic-chemistry"]);
  }
  getColorValidator() {
    let colorVal = this.localStore.store.get('paramValues');
    if (colorVal != undefined && colorVal.data !== undefined) {
      this.fieldColorValidatior = colorVal.data;
    }
    console.log("Color Values", colorVal);
  }

  ngOnInit() {
    this.getColorValidator();
    let mod = this.config.getModuleName();
    this.module = mod.module;
    console.log("----module name----" + this.module);

    // get DAta
    let localData = this.localStore.store.get(this.dataEntryKey);
    let inOrganicChemistrygraphData = this.localStore.store.get("graphData");
    this.graphData = inOrganicChemistrygraphData.data.inOrganicChemistry;

    if (localData.status == "success") {
      this.dataEntry = localData.data;
      if (this.dataEntry.hasOwnProperty(this.iocw_cadmiumComponentKey)) {
        this.iocw_cadmium = this.dataEntry[this.iocw_cadmiumComponentKey];
        this.iocw_chromium = this.dataEntry[this.iocw_chromiumComponentKey];
        this.iocw_cobalt = this.dataEntry[this.iocw_cobaltComponentKey];
        this.iocw_copper = this.dataEntry[this.iocw_copperComponentKey];
        this.iocw_lead = this.dataEntry[this.iocw_leadComponentKey];
        this.iocw_manganese = this.dataEntry[this.iocw_manganeseComponentKey];
        this.iocw_nickel = this.dataEntry[this.iocw_nickelComponentKey];
        this.iocw_zinc = this.dataEntry[this.iocw_zincComponentKey];
        this.iocw_iron = this.dataEntry[this.iocw_ironComponentKey];
        this.iocw_mercury = this.dataEntry[this.iocw_mercuryComponentKey];

        this.iocs_cadmium = this.dataEntry[this.iocs_cadmiumComponentKey];
        this.iocs_chromium = this.dataEntry[this.iocs_chromiumComponentKey];
        this.iocs_cobalt = this.dataEntry[this.iocs_cobaltComponentKey];
        this.iocs_copper = this.dataEntry[this.iocs_copperComponentKey];
        this.iocs_lead = this.dataEntry[this.iocs_leadComponentKey];
        this.iocs_manganese = this.dataEntry[this.iocs_manganeseComponentKey];
        this.iocs_nickel = this.dataEntry[this.iocs_nickelComponentKey];
        this.iocs_zinc = this.dataEntry[this.iocs_zincComponentKey];
        this.iocs_iron = this.dataEntry[this.iocs_ironComponentKey];
        this.iocs_mercury = this.dataEntry[this.iocs_mercuryComponentKey];


      } else {
        // this.dataEntry = {};
        this.dataEntry[this.iocw_cadmiumComponentKey] = this.iocw_cadmium;
        this.dataEntry[this.iocw_chromiumComponentKey] = this.iocw_chromium;
        this.dataEntry[this.iocw_cobaltComponentKey] = this.iocw_cobalt;
        this.dataEntry[this.iocw_copperComponentKey] = this.iocw_copper;
        this.dataEntry[this.iocw_leadComponentKey] = this.iocw_lead;
        this.dataEntry[this.iocw_manganeseComponentKey] = this.iocw_manganese;
        this.dataEntry[this.iocw_nickelComponentKey] = this.iocw_nickel;
        this.dataEntry[this.iocw_zincComponentKey] = this.iocw_zinc;
        this.dataEntry[this.iocw_ironComponentKey] = this.iocw_iron;
        this.dataEntry[this.iocw_mercuryComponentKey] = this.iocw_mercury;

        this.dataEntry[this.iocs_cadmiumComponentKey] = this.iocs_cadmium;
        this.dataEntry[this.iocs_chromiumComponentKey] = this.iocs_chromium;
        this.dataEntry[this.iocs_cobaltComponentKey] = this.iocs_cobalt;
        this.dataEntry[this.iocs_copperComponentKey] = this.iocs_copper;
        this.dataEntry[this.iocs_leadComponentKey] = this.iocs_lead;
        this.dataEntry[this.iocs_manganeseComponentKey] = this.iocs_manganese;
        this.dataEntry[this.iocs_nickelComponentKey] = this.iocs_nickel;
        this.dataEntry[this.iocs_zincComponentKey] = this.iocs_zinc;
        this.dataEntry[this.iocs_ironComponentKey] = this.iocs_iron;
        this.dataEntry[this.iocs_mercuryComponentKey] = this.iocs_mercury;

        this.localStore.store.set(this.dataEntryKey, this.dataEntry);
      }
    } else {
      // this.dataEntry = {};
      this.dataEntry[this.iocw_cadmiumComponentKey] = this.iocw_cadmium;
      this.dataEntry[this.iocw_chromiumComponentKey] = this.iocw_chromium;
      this.dataEntry[this.iocw_cobaltComponentKey] = this.iocw_cobalt;
      this.dataEntry[this.iocw_copperComponentKey] = this.iocw_copper;
      this.dataEntry[this.iocw_leadComponentKey] = this.iocw_lead;
      this.dataEntry[this.iocw_manganeseComponentKey] = this.iocw_manganese;
      this.dataEntry[this.iocw_nickelComponentKey] = this.iocw_nickel;
      this.dataEntry[this.iocw_zincComponentKey] = this.iocw_zinc;
      this.dataEntry[this.iocw_ironComponentKey] = this.iocw_iron;
      this.dataEntry[this.iocw_mercuryComponentKey] = this.iocw_mercury;

      this.dataEntry[this.iocs_cadmiumComponentKey] = this.iocs_cadmium;
      this.dataEntry[this.iocs_chromiumComponentKey] = this.iocs_chromium;
      this.dataEntry[this.iocs_cobaltComponentKey] = this.iocs_cobalt;
      this.dataEntry[this.iocs_copperComponentKey] = this.iocs_copper;
      this.dataEntry[this.iocs_leadComponentKey] = this.iocs_lead;
      this.dataEntry[this.iocs_manganeseComponentKey] = this.iocs_manganese;
      this.dataEntry[this.iocs_nickelComponentKey] = this.iocs_nickel;
      this.dataEntry[this.iocs_zincComponentKey] = this.iocs_zinc;
      this.dataEntry[this.iocs_ironComponentKey] = this.iocs_iron;
      this.dataEntry[this.iocs_mercuryComponentKey] = this.iocs_mercury;
    }
    console.log("Data Entry", this.dataEntryKey, this.dataEntry);
  }

  mwqDetails = [];
  mwqResp: any;

  testMethodDetails = [];
  testMethodResp: any;

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
      // console.log("----testMethodDetails----", this.testMethodDetails);
    });
  }

  /*
  extractionMethodDetails = [];
  extractionMethodResp: any;
  loaadExtractionMethodData() {
    this.mwqDataEntryService.fetchExtractionMethodData().subscribe((resp) => {
      this.extractionMethodResp = resp;
      this.extractionMethodDetails = this.extractionMethodResp.getExtractionResult.MQLList;
      console.log("----extractionMethodDetails----", this.extractionMethodDetails);
    });
  }
*/
}
