import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppStorageService } from "../../../appConfiguration/app-config.service";
import * as $ from '../../../../../node_modules/jquery/dist/jquery.min.js';
import { MwqDataEntryService } from "app/mwq-data-entry/mwq-data-entry.service";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

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
    sampleSource: "",
    samplePreservation: "",
    sampleDescription: "",
    sampleDate: "",
    sampleTime: "",
    sampleBy: "",
    sampleEventType: ""
  };


  siteCategory = [];
  siteDetails = [];
  sourceDetails = [];
  preservationDetails = [];
  sampleByDetails = [];
  eventTypeDetails = [];

  siteCategoryResp: any;
  siteNameResp: any;
  sourceNameResp: any;
  preservationResp: any;
  sampleByResp: any;
  eventTypeResp: any;

  //public siteDataform: FormGroup;
//   isValidFormSubmitted = null;

//   siteDataform = new FormGroup({
//     projectName: new FormControl('', [Validators.required])
   
//  });

  siteDateEdit() {
    console.log("At Edit Screen");
  }
  siteDetailsSave(siteDetailsdata, sampleInfoData) {

    // this.isValidFormSubmitted = false;
    //  if (this.siteDataform.invalid) {
    //     return;
    //  }
    //  this.isValidFormSubmitted = true;

    this.dataEntry[this.dataComponentKey] = siteDetailsdata;
    this.dataEntry[this.sampleInformationKey] = sampleInfoData;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    console.log("At siteDetails Save Screen" + " siteDetailsdata --" + siteDetailsdata + "sampleInfoData --" + sampleInfoData);
  }

//   get projectName() {
//     return this.siteDataform.get('projectName');
//  }

  siteDateNext() {
    this.route.navigate(["mwqDataEntry", "in-situ-parameters"]);
    console.log("At Next Screen");
  }

  siteDatePrev() {
    this.route.navigate(["mwqDataEntry", "data-entry"]);
  }
  constructor(public route: Router, public localStore: AppStorageService,
    private mwqDataEntryService: MwqDataEntryService,
    private fb: FormBuilder) {
    this.loaadSiteCategoryData();
    this.loadSiteNameData();
    this.loadSourceNameData();
    this.loadPreservationData();
    this.loadSampleByData();
    this.loadEventTypeData();
  }

  ngOnInit() {
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
      console.log("----eventTypeDetails----", this.eventTypeDetails);
    });
  }

  loadSampleByData() {
    this.mwqDataEntryService.fetchSampleByData().subscribe((resp) => {
      this.sampleByResp = resp;
      this.sampleByDetails = this.sampleByResp.getSamplebyResult.SampleByList;
      console.log("----sampleByDetails----", this.sampleByDetails);
    });
  }

  loadPreservationData() {
    this.mwqDataEntryService.fetchPreservationData().subscribe((resp) => {
      this.preservationResp = resp;
      this.preservationDetails = this.preservationResp.getPreservationResult.PreservationList;
      console.log("----preservationDetails----", this.preservationDetails);
    });
  }

  loadSourceNameData() {
    this.mwqDataEntryService.fetchSourceNameData().subscribe((resp) => {
      this.sourceNameResp = resp;
      this.sourceDetails = this.sourceNameResp.getSourceResult.SourceList;
      console.log("----sourceDetails----", this.sourceDetails);
    });
  }

  loadSiteNameData() {
    this.mwqDataEntryService.fetchSiteNameData().subscribe((resp) => {
      this.siteNameResp = resp;
      this.siteDetails = this.siteNameResp.getSiteResult.SiteList;
      console.log("----siteDetails----", this.siteDetails);
    });
  }

  loaadSiteCategoryData() {
    this.mwqDataEntryService.fetchSiteCategoryData().subscribe((resp) => {
      this.siteCategoryResp = resp;
      this.siteCategory = this.siteCategoryResp.getCategoryResult.CategoryList;
      console.log("----siteCategory----", this.siteCategory);
    });
  }

  submitSiteData(data) {
    console.log("Site DAta Form Submited", data);
  }

}
