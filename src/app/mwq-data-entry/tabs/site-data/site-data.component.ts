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


  siteData: any = {
    projectName: "",
    siteCategory: "",
    siteName: ""
  };
  sampleInformation: any = {
    sampleRefNum: "",
    sampleSource: "20",
    samplePreservation: "",
    sampleDescription: "",
    sampleDate: "",
    sampleTime: "",
    sampleBy: "",
    sampleEventType: "",
    sampleSiteDefaultValue: "",
    createdBy: "DeptUser"
  };

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
  dateval ='';
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
    // get DAta
    let localData = this.localStore.store.get(this.dataEntryKey);
    if (localData.status == "success") {
      this.dataEntry = localData.data;
      if (this.dataEntry.hasOwnProperty(this.dataComponentKey)) {
        this.siteData = this.dataEntry[this.dataComponentKey];
        this.sampleInformation = this.dataEntry[this.sampleInformationKey];
      } else {
        this.dataEntry = {};
        this.dataEntry[this.dataComponentKey] = this.siteData;
        this.dataEntry[this.sampleInformationKey] = this.sampleInformation;
        this.localStore.store.set(this.dataEntryKey, this.dataEntry);
      }
    } else {
      this.dataEntry = {};
      this.dataEntry[this.dataComponentKey] = this.siteData;
      this.dataEntry[this.sampleInformationKey] = this.sampleInformation;
      this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    }

    console.log("Data Entry", this.dataEntryKey, this.dataEntry);
    //this.selectedEventType = [this.eventTypeDetails[0]];

    // this.siteDataform = this.fb.group({
    //   //projectName: new FormControl({ value: '' }, Validators.compose([Validators.required])),
    //   projectName: ['', Validators.required]
    // });
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

  siteDetailsSave(siteDetailsdata, sampleInfoData) {
    this.dataEntry[this.dataComponentKey] = siteDetailsdata;
    this.dataEntry[this.sampleInformationKey] = sampleInfoData;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    // console.log("At siteDetails Save Screen" + " siteDetailsdata --" + siteDetailsdata + "sampleInfoData --" + sampleInfoData);
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
    console.log("-------todayDate---------",this.dateval)
  }

}
