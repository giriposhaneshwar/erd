import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PageTitleService } from "app/core/page-title/page-title.service";
import { Config } from "../appConfiguration/config";
import { AppStorageService } from "../appConfiguration/app-config.service";
import { MwqDataEntryService } from './mwq-data-entry.service';
import { NgxSpinnerService } from "ngx-spinner";

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

  oc_pcbsComponentKey: string = "PCB";
  oc_tphComponentKey: string = "TPH";

  totalColiformComponentKey: string = "Total_Coliform";
  enterococciComponentKey: string = "Enterococci";
  fecalColiformComponentKey: string = "Fecal_Coliform";

  temperatureComponentKey: string = "Temparature";
  conductivityComponentKey: string = "Conductivity";
  salinityComponentKey: string = "Salinity";
  pHComponentKey: string = "pH";
  dissolvedOComponentKey: string = "Dissolved_O_";
  chlorophyll_aComponentKey: string = "Chlorophyll_a";
  sechiDiscComponentKey: string = "Sechi_Disc";



  totalPhosp: any = {}
  totalNitrogen: any = {};
  nitriteN: any = {};
  nitrateN: any = {};
  silicateSl: any = {};
  ammoniaN: any = {};
  phosphateP: any = {};
  bod: any = {};
  tss: any = {};

  iocw_cadmium: any = {};
  iocw_chromium: any = {};
  iocw_cobalt: any = {};
  iocw_copper: any = {};
  iocw_lead: any = {};
  iocw_manganese: any = {};
  iocw_nickel: any = {};
  iocw_zinc: any = {};
  iocw_iron: any = {};
  iocw_mercury: any = {};

  iocs_cadmium: any = {};
  iocs_chromium: any = {};
  iocs_cobalt: any = {};
  iocs_copper: any = {};
  iocs_lead: any = {};
  iocs_manganese: any = {};
  iocs_nickel: any = {};
  iocs_zinc: any = {};
  iocs_iron: any = {};
  iocs_mercury: any = {};

  oc_pcbs: any = {};
  oc_tph: any = {};

  totalColiform: any = {};
  enterococci: any = {};
  fecalColiform: any = {};

  temperature: any = {};
  conductivity: any = {};
  salinity: any = {};
  pH: any = {};
  dissolvedO: any = {};
  Chlorophyll_a: any = {};
  sechiDisc: any = {};

  historicalGraphResultStatus: any;
  historicalGraphResultStatusMessage: any;

  constructor(
    private pageTitleService: PageTitleService,
    public route: Router,
    public localStore: AppStorageService,
    public api: MwqDataEntryService, private spinner: NgxSpinnerService
  ) { 

    let currentUrl = this.route.url;
    let groupInfo = sessionStorage.getItem("groups");
    let userId = sessionStorage.getItem("userId");

    if (groupInfo === "2" || groupInfo === "20") {
      // this.spinner.show();
      console.log("-----Group Mached-----" + groupInfo, userId, currentUrl);
      this.ngOnInit();
    }
    else {
      console.log("-----Group Not Matched-----" + groupInfo, currentUrl);
      //this.spinner.hide();
      this.route.navigate(["error"]);
    }
  }

  tabRouteinMobile(evt, data) {
    this.route.navigate(["mwqDataEntry", data], evt);
  }

  getHistoricalGraphData() {
    this.api.fetchHistoricalGraph().subscribe((resp) => {
      this.historicalGraphResp = resp;
      this.historicalGraphDetails = this.historicalGraphResp.GetParmsHistoricalDataResult;
      this.historicalGraphResultStatus = this.historicalGraphResp.GetParmsHistoricalDataResult.Status;
      this.historicalGraphResultStatusMessage = this.historicalGraphResp.GetParmsHistoricalDataResult.Message
      console.log(this.historicalGraphResultStatus, this.historicalGraphResultStatusMessage);
      if (this.historicalGraphResultStatus === 'Success') {
        this.localStore.store.set('graphData', this.historicalGraphDetails);
        this.spinner.hide();
      } else {
        this.historicalGraphDetails = [];
        this.spinner.hide();
      }
    });
  }

  paramValidationResultStatus: any;
  paramValidationResultStatusMessage: any;

  getParametersValdationValues() {
    this.api.fetchParametersValdationValues().subscribe((resp) => {
      this.paramValidationResp = resp;
      this.paramValidationDetails = this.paramValidationResp.GetparamatersValdationValuesResult.paramatersValdationValuesList;
      this.paramValidationResultStatus = this.paramValidationResp.GetparamatersValdationValuesResult.Status;
      this.paramValidationResultStatusMessage = this.paramValidationResp.GetparamatersValdationValuesResult.Message
      console.log(this.paramValidationResultStatus, this.paramValidationResultStatusMessage);

      if (this.paramValidationResultStatus === 'Success') {
        for (let i = 0; i < this.paramValidationDetails.length; i++) {
          let item = this.paramValidationDetails[i];
          item.prarmaterMax = parseFloat(item.prarmaterMax);
          item.prarmaterMean = parseFloat(item.prarmaterMean);
          item.prarmaterMin = parseFloat(item.prarmaterMin);
          item.prarmaterStandDeviation = parseFloat(item.prarmaterStandDeviation);
          item.prarmaterThreshold = parseFloat(item.prarmaterThreshold);
          item.prarmaterMinValueDeviation = parseFloat(item.prarmaterMinValueDeviation);
          item.prarmaterMaxValueDeviation = parseFloat(item.prarmaterMaxValueDeviation);
        }
        // console.log("----paramValidationDetails----", this.paramValidationDetails);
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
                this.paramValues[this.totalPhospComponentKey] = this.totalPhosp;
              }
            } else {
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

          if (this.paramValidationDetails[i].paramID === 4) {
            this.nitrateN = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.nitrateNComponentKey)) {
                this.nitrateN = this.paramValues[this.nitrateNComponentKey];
              } else {
                this.paramValues[this.nitrateNComponentKey] = this.nitrateN;
              }
            } else {
              this.paramValues[this.nitrateNComponentKey] = this.nitrateN;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 5) {
            this.silicateSl = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.silicateSlComponentKey)) {
                this.silicateSl = this.paramValues[this.silicateSlComponentKey];
              } else {
                this.paramValues[this.silicateSlComponentKey] = this.silicateSl;
              }
            } else {
              this.paramValues[this.silicateSlComponentKey] = this.silicateSl;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 6) {
            this.ammoniaN = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.ammoniaNComponentKey)) {
                this.ammoniaN = this.paramValues[this.ammoniaNComponentKey];
              } else {
                this.paramValues[this.ammoniaNComponentKey] = this.ammoniaN;
              }
            } else {
              this.paramValues[this.ammoniaNComponentKey] = this.ammoniaN;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 7) {
            this.phosphateP = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.phosphatePComponentKey)) {
                this.phosphateP = this.paramValues[this.phosphatePComponentKey];
              } else {
                this.paramValues[this.phosphatePComponentKey] = this.phosphateP;
              }
            } else {
              this.paramValues[this.phosphatePComponentKey] = this.phosphateP;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 8) {
            this.bod = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.bodComponentKey)) {
                this.bod = this.paramValues[this.bodComponentKey];
              } else {
                this.paramValues[this.bodComponentKey] = this.bod;
              }
            } else {
              this.paramValues[this.bodComponentKey] = this.bod;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 9) {
            this.tss = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.tssComponentKey)) {
                this.tss = this.paramValues[this.tssComponentKey];
              } else {
                this.paramValues[this.tssComponentKey] = this.tss;
              }
            } else {
              this.paramValues[this.tssComponentKey] = this.tss;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 10) {
            this.iocw_cadmium = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocw_cadmiumComponentKey)) {
                this.iocw_cadmium = this.paramValues[this.iocw_cadmiumComponentKey];
              } else {
                this.paramValues[this.iocw_cadmiumComponentKey] = this.iocw_cadmium;
              }
            } else {
              this.paramValues[this.iocw_cadmiumComponentKey] = this.iocw_cadmium;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 11) {
            this.iocw_chromium = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocw_chromiumComponentKey)) {
                this.iocw_chromium = this.paramValues[this.iocw_chromiumComponentKey];
              } else {
                this.paramValues[this.iocw_chromiumComponentKey] = this.iocw_chromium;
              }
            } else {
              this.paramValues[this.iocw_chromiumComponentKey] = this.iocw_chromium;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 12) {
            this.iocw_cobalt = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocw_cobaltComponentKey)) {
                this.iocw_cobalt = this.paramValues[this.iocw_cobaltComponentKey];
              } else {
                this.paramValues[this.iocw_cobaltComponentKey] = this.iocw_cobalt;
              }
            } else {
              this.paramValues[this.iocw_cobaltComponentKey] = this.iocw_cobalt;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 13) {
            this.iocw_copper = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocw_copperComponentKey)) {
                this.iocw_copper = this.paramValues[this.iocw_copperComponentKey];
              } else {
                this.paramValues[this.iocw_copperComponentKey] = this.iocw_copper;
              }
            } else {
              this.paramValues[this.iocw_copperComponentKey] = this.iocw_copper;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 14) {
            this.iocw_lead = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocw_leadComponentKey)) {
                this.iocw_lead = this.paramValues[this.iocw_leadComponentKey];
              } else {
                this.paramValues[this.iocw_leadComponentKey] = this.iocw_lead;
              }
            } else {
              this.paramValues[this.iocw_leadComponentKey] = this.iocw_lead;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 15) {
            this.iocw_manganese = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocw_manganeseComponentKey)) {
                this.iocw_manganese = this.paramValues[this.iocw_manganeseComponentKey];
              } else {
                this.paramValues[this.iocw_manganeseComponentKey] = this.iocw_manganese;
              }
            } else {
              this.paramValues[this.iocw_manganeseComponentKey] = this.iocw_manganese;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 16) {
            this.iocw_nickel = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocw_nickelComponentKey)) {
                this.iocw_nickel = this.paramValues[this.iocw_nickelComponentKey];
              } else {
                this.paramValues[this.iocw_nickelComponentKey] = this.iocw_nickel;
              }
            } else {
              this.paramValues[this.iocw_nickelComponentKey] = this.iocw_nickel;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 17) {
            this.iocw_zinc = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocw_zincComponentKey)) {
                this.iocw_zinc = this.paramValues[this.iocw_zincComponentKey];
              } else {
                this.paramValues[this.iocw_zincComponentKey] = this.iocw_zinc;
              }
            } else {
              this.paramValues[this.iocw_zincComponentKey] = this.iocw_zinc;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 18) {
            this.iocw_iron = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocw_ironComponentKey)) {
                this.iocw_iron = this.paramValues[this.iocw_ironComponentKey];
              } else {
                this.paramValues[this.iocw_ironComponentKey] = this.iocw_iron;
              }
            } else {
              this.paramValues[this.iocw_ironComponentKey] = this.iocw_iron;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 19) {
            this.iocw_mercury = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocw_mercuryComponentKey)) {
                this.iocw_mercury = this.paramValues[this.iocw_mercuryComponentKey];
              } else {
                this.paramValues[this.iocw_mercuryComponentKey] = this.iocw_mercury;
              }
            } else {
              this.paramValues[this.iocw_mercuryComponentKey] = this.iocw_mercury;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 20) {
            this.iocs_cadmium = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocs_cadmiumComponentKey)) {
                this.iocs_cadmium = this.paramValues[this.iocs_cadmiumComponentKey];
              } else {
                this.paramValues[this.iocs_cadmiumComponentKey] = this.iocs_cadmium;
              }
            } else {
              this.paramValues[this.iocs_cadmiumComponentKey] = this.iocs_cadmium;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 21) {
            this.iocs_chromium = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocs_chromiumComponentKey)) {
                this.iocs_chromium = this.paramValues[this.iocs_chromiumComponentKey];
              } else {
                this.paramValues[this.iocs_chromiumComponentKey] = this.iocs_chromium;
              }
            } else {
              this.paramValues[this.iocs_chromiumComponentKey] = this.iocs_chromium;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 22) {
            this.iocs_cobalt = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocs_cobaltComponentKey)) {
                this.iocs_cobalt = this.paramValues[this.iocs_cobaltComponentKey];
              } else {
                this.paramValues[this.iocs_cobaltComponentKey] = this.iocs_cobalt;
              }
            } else {
              this.paramValues[this.iocs_cobaltComponentKey] = this.iocs_cobalt;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 23) {
            this.iocs_copper = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocs_copperComponentKey)) {
                this.iocs_copper = this.paramValues[this.iocs_copperComponentKey];
              } else {
                this.paramValues[this.iocs_copperComponentKey] = this.iocs_copper;
              }
            } else {
              this.paramValues[this.iocs_copperComponentKey] = this.iocs_copper;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 24) {
            this.iocs_lead = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocs_leadComponentKey)) {
                this.iocs_lead = this.paramValues[this.iocs_leadComponentKey];
              } else {
                this.paramValues[this.iocs_leadComponentKey] = this.iocs_lead;
              }
            } else {
              this.paramValues[this.iocs_leadComponentKey] = this.iocs_lead;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }



          if (this.paramValidationDetails[i].paramID === 25) {
            this.iocs_manganese = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocs_manganeseComponentKey)) {
                this.iocs_manganese = this.paramValues[this.iocs_manganeseComponentKey];
              } else {
                this.paramValues[this.iocs_manganeseComponentKey] = this.iocs_manganese;
              }
            } else {
              this.paramValues[this.iocs_manganeseComponentKey] = this.iocs_manganese;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 26) {
            this.iocs_nickel = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocs_nickelComponentKey)) {
                this.iocs_nickel = this.paramValues[this.iocs_nickelComponentKey];
              } else {
                this.paramValues[this.iocs_nickelComponentKey] = this.iocs_nickel;
              }
            } else {
              this.paramValues[this.iocs_nickelComponentKey] = this.iocs_nickel;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 27) {
            this.iocs_zinc = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocs_zincComponentKey)) {
                this.iocs_zinc = this.paramValues[this.iocs_zincComponentKey];
              } else {
                this.paramValues[this.iocs_zincComponentKey] = this.iocs_zinc;
              }
            } else {
              this.paramValues[this.iocs_zincComponentKey] = this.iocs_zinc;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 28) {
            this.iocs_iron = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocs_ironComponentKey)) {
                this.iocs_iron = this.paramValues[this.iocs_ironComponentKey];
              } else {
                this.paramValues[this.iocs_ironComponentKey] = this.iocs_iron;
              }
            } else {
              this.paramValues[this.iocs_ironComponentKey] = this.iocs_iron;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 29) {
            this.iocs_mercury = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.iocs_mercuryComponentKey)) {
                this.iocs_mercury = this.paramValues[this.iocs_mercuryComponentKey];
              } else {
                this.paramValues[this.iocs_mercuryComponentKey] = this.iocs_mercury;
              }
            } else {
              this.paramValues[this.iocs_mercuryComponentKey] = this.iocs_mercury;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 30) {
            this.oc_pcbs = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.oc_pcbsComponentKey)) {
                this.oc_pcbs = this.paramValues[this.oc_pcbsComponentKey];
              } else {
                this.paramValues[this.oc_pcbsComponentKey] = this.oc_pcbs;
              }
            } else {
              this.paramValues[this.oc_pcbsComponentKey] = this.oc_pcbs;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 31) {
            this.oc_tph = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.oc_tphComponentKey)) {
                this.oc_tph = this.paramValues[this.oc_tphComponentKey];
              } else {
                this.paramValues[this.oc_tphComponentKey] = this.oc_tph;
              }
            } else {
              this.paramValues[this.oc_tphComponentKey] = this.oc_tph;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 32) {
            this.totalColiform = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.totalColiformComponentKey)) {
                this.totalColiform = this.paramValues[this.totalColiformComponentKey];
              } else {
                this.paramValues[this.totalColiformComponentKey] = this.totalColiform;
              }
            } else {
              this.paramValues[this.totalColiformComponentKey] = this.totalColiform;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 33) {
            this.enterococci = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.enterococciComponentKey)) {
                this.enterococci = this.paramValues[this.enterococciComponentKey];
              } else {
                this.paramValues[this.enterococciComponentKey] = this.enterococci;
              }
            } else {
              this.paramValues[this.enterococciComponentKey] = this.enterococci;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 34) {
            this.fecalColiform = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.fecalColiformComponentKey)) {
                this.fecalColiform = this.paramValues[this.fecalColiformComponentKey];
              } else {
                this.paramValues[this.fecalColiformComponentKey] = this.fecalColiform;
              }
            } else {
              this.paramValues[this.fecalColiformComponentKey] = this.fecalColiform;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 35) {
            this.temperature = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.temperatureComponentKey)) {
                this.temperature = this.paramValues[this.temperatureComponentKey];
              } else {
                this.paramValues[this.temperatureComponentKey] = this.temperature;
              }
            } else {
              this.paramValues[this.temperatureComponentKey] = this.temperature;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 36) {
            this.conductivity = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.conductivityComponentKey)) {
                this.conductivity = this.paramValues[this.conductivityComponentKey];
              } else {
                this.paramValues[this.conductivityComponentKey] = this.conductivity;
              }
            } else {
              this.paramValues[this.conductivityComponentKey] = this.conductivity;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 37) {
            this.salinity = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.salinityComponentKey)) {
                this.salinity = this.paramValues[this.salinityComponentKey];
              } else {
                this.paramValues[this.salinityComponentKey] = this.salinity;
              }
            } else {
              this.paramValues[this.salinityComponentKey] = this.salinity;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 39) {
            this.dissolvedO = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.dissolvedOComponentKey)) {
                this.dissolvedO = this.paramValues[this.dissolvedOComponentKey];
              } else {
                this.paramValues[this.dissolvedOComponentKey] = this.dissolvedO;
              }
            } else {
              this.paramValues[this.dissolvedOComponentKey] = this.dissolvedO;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 40) {
            this.Chlorophyll_a = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.chlorophyll_aComponentKey)) {
                this.Chlorophyll_a = this.paramValues[this.chlorophyll_aComponentKey];
              } else {
                this.paramValues[this.chlorophyll_aComponentKey] = this.Chlorophyll_a;
              }
            } else {
              this.paramValues[this.chlorophyll_aComponentKey] = this.Chlorophyll_a;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 41) {
            this.sechiDisc = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.sechiDiscComponentKey)) {
                this.sechiDisc = this.paramValues[this.sechiDiscComponentKey];
              } else {
                this.paramValues[this.sechiDiscComponentKey] = this.sechiDisc;
              }
            } else {
              this.paramValues[this.sechiDiscComponentKey] = this.sechiDisc;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }

          if (this.paramValidationDetails[i].paramID === 48) {
            this.pH = this.paramValidationDetails[i];
            let localData = this.localStore.store.get(this.paramValuesKey);
            if (localData.status == "success") {
              this.paramValues = localData.data;
              if (this.paramValues.hasOwnProperty(this.pHComponentKey)) {
                this.pH = this.paramValues[this.pHComponentKey];
              } else {
                this.paramValues[this.pHComponentKey] = this.pH;
              }
            } else {
              this.paramValues[this.pHComponentKey] = this.pH;
            }
            this.localStore.store.set(this.paramValuesKey, this.paramValues);
          }
        }
      } else {
        this.paramValidationDetails = [];
        this.spinner.hide();
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
    this.spinner.show();
    this.getHistoricalGraphData();
    this.getParametersValdationValues();
  }
}
