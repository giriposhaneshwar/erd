import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppStorageService } from "../../../appConfiguration/app-config.service";
import * as moment from 'moment';
import { MwqDataEntryService } from "app/mwq-data-entry/mwq-data-entry.service";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Config } from '../../../appConfiguration/config';

@Component({
  selector: "ms-site-data",
  templateUrl: "./site-data.component.html",
  styleUrls: ["./site-data.component.scss"]
})
export class SiteDataComponent implements OnInit {
  dataEntry: any;
  dataEntryKey: string = "dataEntry";
  dataComponentKey: string = "siteDetails";
  sampleInformationKey: string = "sampleInformation";

  temperatureComponentKey: string = "Temparature";
  conductivityComponentKey: string = "Conductivity";
  salinityComponentKey: string = "Salinity";
  pHComponentKey: string = "pH";
  dissolvedOComponentKey: string = "Dissolved_O_";
  chlorophyll_aComponentKey: string = "Chlorophyll_a";
  sechiDiscComponentKey: string = "Sechi_Disc";

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

  oc_totalPhospComponentKey: string = "Total_Phosp";
  oc_tphComponentKey: string = "TPH";

  totalColiformComponentKey: string = "Total_Coliform";
  enterococciComponentKey: string = "Enterococci";
  fecalColiformComponentKey: string = "Fecal_Coliform";

  siteData: any = { projectName: "", siteCategory: "", siteName: "" };
  sampleInformation: any = {
    sampleRefNum: "", sampleSource: "20", samplePreservation: "", sampleDescription: "", sampleDate: "", sampleTime: "",
    sampleBy: "", sampleEventType: "", sampleSiteDefaultValue: "", createdBy: "DeptUser"
  };
  //bottom5m: "", bottom10m: "", bottom15m: "", bottom20m: "", bottom25m: "", bottom30m: "", bottom35m: "", bottom40m: ""
  temperature: any = { surfaceValue: "", bottomValue: "" };
  conductivity: any = { surfaceValue: "", bottomValue: "" };
  salinity: any = { surfaceValue: "", bottomValue: "" };
  pH: any = { surfaceValue: "", bottomValue: "" };
  dissolvedO: any = { surfaceValue: "", bottomValue: "" };
  Chlorophyll_a: any = { surfaceValue: "", bottomValue: "" };
  sechiDisc: any = { surfaceValue: "" };

  totalPhosp: any = { surfaceValue: "", mql: "", testMethod: "" };
  totalNitrogen: any = { surfaceValue: "", mql: "", testMethod: "" };
  nitriteN: any = { surfaceValue: "", mql: "", testMethod: "" };
  nitrateN: any = { surfaceValue: "", mql: "", testMethod: "" };
  silicateSl: any = { surfaceValue: "", mql: "", testMethod: "" };
  ammoniaN: any = { surfaceValue: "", mql: "", testMethod: "" };
  phosphateP: any = { surfaceValue: "", mql: "", testMethod: "" };
  bod: any = { surfaceValue: "", mql: "", testMethod: "" };
  tss: any = { surfaceValue: "", mql: "", testMethod: "" };

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

  oc_totalPhosp: any = { surfaceValue: "", mql: "", extractionMethod: "", testMethod: "" };
  oc_tph: any = { surfaceValue: "", mql: "", extractionMethod: "", testMethod: "" };

  totalColiform: any = { surfaceValue: "", mql: "", extractionMethod: "", testMethod: "" };
  enterococci: any = { surfaceValue: "", mql: "", extractionMethod: "", testMethod: "" };
  fecalColiform: any = { surfaceValue: "", mql: "", extractionMethod: "", testMethod: "" };


  siteCategory = [];
  siteCategoryResp: any;

  siteDetails = [];
  siteNameResp: any;

  sourceDetails = [];
  sourceNameResp: any;

  preservationDetails = [];
  preservationResp: any;

  sampleByDetails = [];
  sampleByResp: any;

  eventTypeDetails = [];
  eventTypeResp: any;

  projectNamesDetails = [];
  projectNamesResp: any;

  sourceDepthDetails = [];
  sourceDepthResp: any;

  siteDefaultValueDetails = [];
  siteDefaultValueResp: any;

  module: String;
  dateval = '';
  isDisabled: boolean = true;

  constructor(
    public route: Router,
    public localStore: AppStorageService,
    private mwqDataEntryService: MwqDataEntryService,
    private fb: FormBuilder,
    public config: Config) {
    this.loaadSiteCategoryData();
    this.loadSiteNameData();
    this.loadSourceNameData();
    this.loadPreservationData();
    this.loadSampleByData();
    this.loadEventTypeData();
    this.loadProjectNames();
    this.loadSourceDepth();
    this.dateForamt();
  }

  ngOnInit() {
    let mod = this.config.getModuleName();
    this.module = mod.module;
    console.log("----module name----" + this.module);
    // store qc in dataEntryt
    /* if(module.module == "mwqDataQc"){
      this.localStore.store.set(this.dataEntryKey, this.localStore.store.get('qcData'));
    } */
    // get Data
    let localData = this.localStore.store.get(this.dataEntryKey);
    if (localData.status == "success") {
      this.dataEntry = localData.data;
      if (this.dataEntry.hasOwnProperty(this.dataComponentKey)) {
        this.siteData = this.dataEntry[this.dataComponentKey];
        this.sampleInformation = this.dataEntry[this.sampleInformationKey];
        this.sampleInformation['sampleDate'] = moment(this.sampleInformation['sampleDate']).format('YYYY-MM-DD');
        console.log("Moment date Format \n", moment().format(), "\n", new Date());

        this.temperature = this.dataEntry[this.temperatureComponentKey];
        this.conductivity = this.dataEntry[this.conductivityComponentKey];
        this.salinity = this.dataEntry[this.salinityComponentKey];
        this.pH = this.dataEntry[this.pHComponentKey];
        this.dissolvedO = this.dataEntry[this.dissolvedOComponentKey];
        this.Chlorophyll_a = this.dataEntry[this.chlorophyll_aComponentKey];
        this.sechiDisc = this.dataEntry[this.sechiDiscComponentKey];

        this.totalNitrogen = this.dataEntry[this.totalNitrogenComponentKey];
        this.nitriteN = this.dataEntry[this.nitriteNComponentKey];
        this.nitrateN = this.dataEntry[this.nitrateNComponentKey];
        this.silicateSl = this.dataEntry[this.silicateSlComponentKey];
        this.ammoniaN = this.dataEntry[this.ammoniaNComponentKey];
        this.phosphateP = this.dataEntry[this.phosphatePComponentKey];
        this.bod = this.dataEntry[this.bodComponentKey];
        this.tss = this.dataEntry[this.tssComponentKey];

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

        this.oc_totalPhosp = this.dataEntry[this.oc_totalPhospComponentKey];
        this.oc_tph = this.dataEntry[this.oc_tphComponentKey];

        this.totalColiform = this.dataEntry[this.totalColiformComponentKey];
        this.enterococci = this.dataEntry[this.enterococciComponentKey];
        this.fecalColiform = this.dataEntry[this.fecalColiformComponentKey];

      } else {
        this.dataEntry = {};
        this.dataEntry[this.dataComponentKey] = this.siteData;
        this.dataEntry[this.sampleInformationKey] = this.sampleInformation;

        this.dataEntry[this.temperatureComponentKey] = this.temperature;
        this.dataEntry[this.conductivityComponentKey] = this.conductivity;
        this.dataEntry[this.salinityComponentKey] = this.salinity;
        this.dataEntry[this.pHComponentKey] = this.pH;
        this.dataEntry[this.dissolvedOComponentKey] = this.dissolvedO;
        this.dataEntry[this.chlorophyll_aComponentKey] = this.Chlorophyll_a;
        this.dataEntry[this.sechiDiscComponentKey] = this.sechiDisc;

        this.dataEntry[this.totalPhospComponentKey] = this.totalPhosp;
        this.dataEntry[this.totalNitrogenComponentKey] = this.totalNitrogen;
        this.dataEntry[this.nitriteNComponentKey] = this.nitriteN;
        this.dataEntry[this.nitrateNComponentKey] = this.nitrateN;
        this.dataEntry[this.silicateSlComponentKey] = this.silicateSl;
        this.dataEntry[this.ammoniaNComponentKey] = this.ammoniaN;
        this.dataEntry[this.phosphatePComponentKey] = this.phosphateP;
        this.dataEntry[this.bodComponentKey] = this.bod;
        this.dataEntry[this.tssComponentKey] = this.tss;

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

        this.dataEntry[this.oc_totalPhospComponentKey] = this.oc_totalPhosp;
        this.dataEntry[this.oc_tphComponentKey] = this.oc_tph;

        this.dataEntry[this.totalColiformComponentKey] = this.totalColiform;
        this.dataEntry[this.enterococciComponentKey] = this.enterococci;
        this.dataEntry[this.fecalColiformComponentKey] = this.fecalColiform;

        this.localStore.store.set(this.dataEntryKey, this.dataEntry);
      }
    } else {
      this.dataEntry = {};
      this.dataEntry[this.dataComponentKey] = this.siteData;
      this.dataEntry[this.sampleInformationKey] = this.sampleInformation;

      this.dataEntry[this.temperatureComponentKey] = this.temperature;
      this.dataEntry[this.conductivityComponentKey] = this.conductivity;
      this.dataEntry[this.salinityComponentKey] = this.salinity;
      this.dataEntry[this.pHComponentKey] = this.pH;
      this.dataEntry[this.dissolvedOComponentKey] = this.dissolvedO;
      this.dataEntry[this.chlorophyll_aComponentKey] = this.Chlorophyll_a;
      this.dataEntry[this.sechiDiscComponentKey] = this.sechiDisc;

      this.dataEntry[this.totalPhospComponentKey] = this.totalPhosp;
      this.dataEntry[this.totalNitrogenComponentKey] = this.totalNitrogen;
      this.dataEntry[this.nitriteNComponentKey] = this.nitriteN;
      this.dataEntry[this.nitrateNComponentKey] = this.nitrateN;
      this.dataEntry[this.silicateSlComponentKey] = this.silicateSl;
      this.dataEntry[this.ammoniaNComponentKey] = this.ammoniaN;
      this.dataEntry[this.phosphatePComponentKey] = this.phosphateP;
      this.dataEntry[this.bodComponentKey] = this.bod;
      this.dataEntry[this.tssComponentKey] = this.tss;

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

      this.dataEntry[this.oc_totalPhospComponentKey] = this.oc_totalPhosp;
      this.dataEntry[this.oc_tphComponentKey] = this.oc_tph;

      this.dataEntry[this.totalColiformComponentKey] = this.totalColiform;
      this.dataEntry[this.enterococciComponentKey] = this.enterococci;
      this.dataEntry[this.fecalColiformComponentKey] = this.fecalColiform;

      this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    }
    console.log("Data Entry", this.dataEntryKey, this.dataEntry);
  }

  loadEventTypeData() {
    this.mwqDataEntryService.fetchEventTypeData().subscribe((resp) => {
      this.eventTypeResp = resp;
      this.eventTypeDetails = this.eventTypeResp.getEventbyResult.EventByList;
      // console.log("----eventTypeDetails----", this.eventTypeDetails);
    });
  }

  loadSampleByData() {
    this.mwqDataEntryService.fetchSampleByData().subscribe((resp) => {
      this.sampleByResp = resp;
      this.sampleByDetails = this.sampleByResp.getSamplebyResult.SampleByList;
      // console.log("----sampleByDetails----", this.sampleByDetails);
    });
  }

  loadPreservationData() {
    this.mwqDataEntryService.fetchPreservationData().subscribe((resp) => {
      this.preservationResp = resp;
      this.preservationDetails = this.preservationResp.getPreservationResult.PreservationList;
      // console.log("----preservationDetails----", this.preservationDetails);
    });
  }

  loadSourceNameData() {
    this.mwqDataEntryService.fetchSourceNameData().subscribe((resp) => {
      this.sourceNameResp = resp;
      this.sourceDetails = this.sourceNameResp.getSourceResult.SourceList;
      // console.log("----sourceDetails----", this.sourceDetails);
    });
  }

  loadSiteNameData() {
    this.mwqDataEntryService.fetchSiteNameData().subscribe((resp) => {
      this.siteNameResp = resp;
      this.siteDetails = this.siteNameResp.getSiteResult.SiteList;
      // console.log("----siteDetails----", this.siteDetails);
    });
  }

  loaadSiteCategoryData() {
    this.mwqDataEntryService.fetchSiteCategoryData().subscribe((resp) => {
      this.siteCategoryResp = resp;
      this.siteCategory = this.siteCategoryResp.getCategoryResult.CategoryList;
      // console.log("----siteCategory----", this.siteCategory);
    });
  }

  loadProjectNames(): void {
    this.mwqDataEntryService.fetchProjectNamesData().subscribe((restItems) => {
      this.projectNamesResp = restItems;
      this.projectNamesDetails = this.projectNamesResp.GetProjectsResult.ProjectList;
      // console.log("----projectNamesDetails----", this.projectNamesDetails);
    });
  }

  loadSourceDepth(): void {
    this.mwqDataEntryService.fetchSourceDepthData().subscribe((restItems) => {
      this.sourceDepthResp = restItems;
      this.sourceDepthDetails = this.sourceDepthResp.GetSourceDepthResult.getSourceDepthList[0].depthvalue;
      this.sampleInformation.sampleSource = this.sourceDepthDetails;
    });
  }


  onchangeSiteName(selectedSiteId) {
    console.log("Selected Site Name-----" + selectedSiteId);
    this.mwqDataEntryService.fetchSelectedSiteDefaultValue(selectedSiteId).subscribe((restItems) => {
      this.siteDefaultValueResp = restItems;
      this.siteDefaultValueDetails = this.siteDefaultValueResp.GetSiteDefaultValueResult.siteDefaultValueList[0].defaultsitevalue;
      this.sampleInformation.sampleSiteDefaultValue = this.siteDefaultValueDetails;
      //console.log("----siteDefaultValueDetails----", this.siteDefaultValueDetails + "--------" + this.sampleInformation.sampleSiteDefaultValue);
    });
  }

  siteDetailsSave(siteDetailsdata) {
    this.dataEntry[this.dataComponentKey] = siteDetailsdata;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }

  sampleBasicInfoSave(sampleInfoData) {
    this.dataEntry[this.sampleInformationKey] = sampleInfoData;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
  }
  
  dataEntrySave(siteDetailsdata, sampleInfoData) {
    this.dataEntry[this.dataComponentKey] = siteDetailsdata;
    this.dataEntry[this.sampleInformationKey] = sampleInfoData;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);

    this.isDisabled = false;
  }

  siteDataTabNext(module) {
    if (module === "mwqDataEntry") {
      this.route.navigate(["mwqDataEntry", "in-situ-parameters"]);
      console.log("At mwqDataEntry - in-situ-parameters Screen");
    }
    else {
      this.route.navigate(["mwqDataQc", "in-situ-parameters"]);
      console.log("At mwqDataQc - in-situ-parameters Screen");
    }
  }

  siteDataTabPrev(module) {
    if (module === "mwqDataEntry") {
      this.route.navigate(["mwqDataEntry", "data-entry"]);
      console.log("At mwqDataEntry - data-entry Screen");
    }
    else {
      this.route.navigate(["mwqDataQc", "qc-info"]);
      console.log("At mwqDataQc - data-entry Screen");
    }
  }

  dateForamt() {
    this.dateval = moment().format('YYYY-MM-DD'); // Gets today's date
    console.log("-------todayDate---------", this.dateval)
  }

}
