import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PageTitleService } from "app/core/page-title/page-title.service";
import { Config } from "../appConfiguration/config";
import { AppStorageService } from "../appConfiguration/app-config.service";
import { MwqDataEntryService } from './mwq-data-entry.service';

@Component({
  selector: "ms-mwq-data-entry",
  templateUrl: "./mwq-data-entry.component.html",
  styleUrls: ["./mwq-data-entry.component.scss"]
})
export class MwqDataEntryComponent implements OnInit {
  mobileTabNav: any = "data-entry";
  mondalOpen: Boolean = false;
  currentRoute: any[];
  loadModule: String = "dataEntry";
  role: any;

  historicalGraphDetails = [];
  historicalGraphResp: any;

  paramValidationDetails = [];
  paramValidationResp: any;

  paramValues: any;
  paramValuesKey: string = "paramValues";
  totalPhospComponentKey: string = "TotalPhosp";
  totalNitrogenComponentKey: string = "Total_Nitrogen";
  nitriteNComponentKey: string = "Nitrite_N";
  nitrateNComponentKey: string = "Nitrate_N";
  silicateSlComponentKey: string = "Silicate_Sl";
  ammoniaNComponentKey: string = "Ammonia_N";
  phosphatePComponentKey: string = "Phosphate_P";
  bodComponentKey: string = "BOD";
  tssComponentKey: string = "TSS";

  //totalPhosp: any = { paramID: "", prarmaterMax: "", prarmaterMean: "", prarmaterMin: "", prarmaterName: "", prarmaterStandDevition: "", prarmaterThreshold: "" }
  totalPhosp: any = { }
  totalNitrogen: any = {  };
  nitriteN: any = { };
  nitrateN: any = { };
  silicateSl: any = { };
  ammoniaN: any = { };
  phosphateP: any = { };
  bod: any = { };
  tss: any = { };

  constructor(
    private pageTitleService: PageTitleService,
    public route: Router,
    public localStore: AppStorageService,
    public api: MwqDataEntryService
  ) { }

  tabRouteinMobile(evt, data) {
    this.route.navigate(["mwqDataEntry", data]);
  }

  getHistoricalGraphData() {
    // fetchHistoricalGraph;
    /*     this.api.fetchHistoricalGraph().subscribe(resp => {
          let data = resp[0];
          this.localStore.store.set('graphData', data);
          console.log("----getHistoricalGraphData----", data);
        }); */

    this.api.fetchHistoricalGraph().subscribe((resp) => {
      this.historicalGraphResp = resp;
      this.historicalGraphDetails = this.historicalGraphResp.GetParmsHistrocalDataResult;
      console.log("----historicalGraphDetails----", this.historicalGraphDetails);
      this.localStore.store.set('graphData', this.historicalGraphDetails);
    });
  }


  getParametersValdationValues() {
    this.api.fetchParametersValdationValues().subscribe((resp) => {
      this.paramValidationResp = resp;
      this.paramValidationDetails = this.paramValidationResp.GetparamatersValdationValuesResult.paramatersValdationValuesList;
      console.log("----paramValidationDetails----", this.paramValidationDetails);
      //this.localStore.store.set(this.paramValuesKey, this.paramValidationDetails);
      for (var i = 0; i < this.paramValidationDetails.length; i++) {
        if (this.paramValidationDetails[i].paramID === 1) {
          this.totalPhosp = this.paramValidationDetails[i];
          let localData = this.localStore.store.get(this.paramValuesKey);
          if (localData.status == "success") {
            this.paramValues = localData.data;
            if (this.paramValues.hasOwnProperty(this.totalPhospComponentKey)) {
              this.totalPhosp = this.paramValues[this.totalPhospComponentKey];
            } else {
              this.paramValues = {};
              this.paramValues[this.totalPhospComponentKey] = this.totalPhosp;
            }
          } else {
            this.paramValues = {};
            this.paramValues[this.totalPhospComponentKey] = this.totalPhosp;
          }
          this.localStore.store.set(this.paramValuesKey, this.paramValues);
        }
        
        if (this.paramValidationDetails[i].paramID === 2) {
          this.totalNitrogen = this.paramValidationDetails[i];
          let localData = this.localStore.store.get(this.paramValuesKey);
          if (localData.status == "success") {
            this.paramValues = localData.data;
            if (this.paramValues.hasOwnProperty(this.totalNitrogenComponentKey)) {
              this.totalNitrogen = this.paramValues[this.totalNitrogenComponentKey];
            } else {
              this.paramValues[this.totalNitrogenComponentKey] = this.totalNitrogen;
            }
          } else {
             this.paramValues[this.totalNitrogenComponentKey] = this.totalNitrogen;
          }
          this.localStore.store.set(this.paramValuesKey, this.paramValues);
        }

        if (this.paramValidationDetails[i].paramID === 3) {
          this.nitriteN = this.paramValidationDetails[i];
          let localData = this.localStore.store.get(this.paramValuesKey);
          if (localData.status == "success") {
            this.paramValues = localData.data;
            if (this.paramValues.hasOwnProperty(this.nitriteNComponentKey)) {
              this.nitriteN = this.paramValues[this.nitriteNComponentKey];
            } else {
              this.paramValues[this.nitriteNComponentKey] = this.nitriteN;
            }
          } else {
             this.paramValues[this.nitriteNComponentKey] = this.nitriteN;
          }
          this.localStore.store.set(this.paramValuesKey, this.paramValues);
        }


      }
    });
  }

  ngOnInit() {
    let currentUrl = this.route.url;
    this.currentRoute = currentUrl.split("/");
    if (this.currentRoute[1] == "mwqDataQc") {
      this.loadModule = "dataQc";
      this.route.navigate(["mwqDataQc", "qc-info"]);
    } else if (this.currentRoute[1] == "mwqDataEntry") {
      this.loadModule = "dataEntry";
    }
    // "/mwqDataQc/site-details"
    this.pageTitleService.setTitle("Marine Water Quality Management System");
    console.log("Executing Configurations", Config.appConfig.mainNav);

    /* Getting Local Store Roles */
    let roles = this.localStore.store.get('role');
    this.role = roles.data;

    this.getHistoricalGraphData();
    this.getParametersValdationValues();
  }
}
