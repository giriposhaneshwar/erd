import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppStorageService } from 'app/appConfiguration/app-config.service';
import { MwqDataEntryService } from 'app/mwq-data-entry/mwq-data-entry.service';

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

  totalPhosp: any = {    surfaceValue: "",    mql: "",    testMethod: "" };
  totalNitrogen: any = {    surfaceValue: "",    mql: "",    testMethod: ""  };
  nitriteN: any = {    surfaceValue: "",    mql: "",    testMethod: ""  };
  nitrateN: any = {    surfaceValue: "",    mql: "",    testMethod: ""  };
  silicateSl: any = {    surfaceValue: "",    mql: "",    testMethod: ""};
  ammoniaN: any = {    surfaceValue: "",    mql: "",    testMethod: ""  };
  phosphateP: any = {    surfaceValue: "",    mql: "",    testMethod: ""  };
  bod: any = {    surfaceValue: "",    mql: "",    testMethod: ""  };
  tss: any = {    surfaceValue: "",    mql: "",    testMethod: ""  };

  constructor(public route: Router, public localStore: AppStorageService, private mwqDataEntryService: MwqDataEntryService) {
    this.loadMQLData();
    this.loadTestMethodData();
  }

  inputOrderClass(data, key) {
    console.log("INput Data", data, key);
  }
  siteDatePrev() {
    this.route.navigate(["mwqDataEntry", "in-situ-parameters"]);
    console.log("At Edit Screen");
  }
  generalChemistryDetailsSave(totalPhosp, totalNitrogen, nitriteN, nitrateN, silicateSl, ammoniaN, phosphateP, bod, tss) {

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
    console.log("At Save Screen");
  }
  siteDateNext() {
    this.route.navigate(["mwqDataEntry", "in-organic-chemistry"]);
    console.log("At Next Screen");
  }

  ngOnInit() {

    // get DAta
    let localData = this.localStore.store.get(this.dataEntryKey);
    let graphData = this.localStore.store.get("graphData");
    this.graphData = graphData.data.historicalGraphOutput[this.graphDataKey];
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

  /*loaadExtractionMethodData() {
    this.mwqDataEntryService.fetchExtractionMethodData().subscribe((resp) => {
      this.extractionMethodResp = resp;
      this.extractionMethodDetails = this.extractionMethodResp.getExtractionResult.MQLList;
      console.log("----extractionMethodDetails----", this.extractionMethodDetails);
    });
  }
*/

}
