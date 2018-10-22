import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppStorageService } from "../../../appConfiguration/app-config.service";
import * as $ from '../../../../../node_modules/jquery/dist/jquery.min.js';

@Component({
  selector: "ms-site-data",
  templateUrl: "./site-data.component.html",
  styleUrls: ["./site-data.component.scss"]
})
export class SiteDataComponent implements OnInit {
  dataEntry: any;
  dataEntryKey: String = "dataEntry";
  dataComponentKey: String = "siteData";
  siteData: any = {
    siteName: "",
    projectName: "",
    category: ""
  };
  siteDateEdit() {
    console.log("At Edit Screen");
  }
  siteDateSave(data) {
    this.dataEntry[this.dataComponentKey] = data;
    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    console.log("At Save Screen", data);
  }
  siteDateNext() {
    this.route.navigate(["mwqDataEntry", "in-situ-parameters"]);
    console.log("At Next Screen");
  }

  siteDatePrev() {
    this.route.navigate(["mwqDataEntry", "data-entry"]);
  }
  constructor(public route: Router, public localStore: AppStorageService) {
    this.locadSiteCategoryData();
    this.loadSiteNameData();
    this.loadSourceNameData();
    this.loadPreservationData();
    this.loadSampleByData();
    this.loadEventTypeData();
  }

  siteCategory = [];
  siteDetails = [];
  sourceDetails = [];
  preservationDetails = [];
  sampleByDetails = [];
  eventTypeDetails = [];

  selectedSiteCategory: any;
  selectedSiteName: any;
  selectedSourceName: any;
  selectedPreservation: any;
  selectedSampleBy: any;
  selectedEventType: any;

  ngOnInit() {
    // get DAta
    let localData = this.localStore.store.get(this.dataEntryKey);
    if (localData.status == "success") {
      this.dataEntry = localData.data;
      if(this.dataEntry.hasOwnProperty(this.dataComponentKey)){
        this.siteData = this.dataEntry[this.dataComponentKey];
      }else{
        this.dataEntry = {};
        this.dataEntry[this.dataComponentKey] = this.siteData;
        this.localStore.store.set(this.dataEntryKey, this.dataEntry);
      }
    } else {
      this.dataEntry = {};
      this.dataEntry[this.dataComponentKey] = this.siteData;
      this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    }
    console.log("Data Entry", this.dataEntryKey, this.dataEntry);
    this.selectedEventType = [this.eventTypeDetails[0]];
  }

  loadEventTypeData() {
    this.fetchEventTypeData(data => {
      this.selectedEventType = [data[1]];
      this.eventTypeDetails = data;
    });
  }

  fetchEventTypeData(cb) {
    const req = new XMLHttpRequest();
    req.open("GET", `assets/data/eventType.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  loadSampleByData() {
    this.fetchSampleByData(data => {
      this.sampleByDetails = data;
    });
  }

  fetchSampleByData(cb) {
    const req = new XMLHttpRequest();
    req.open("GET", `assets/data/sampleBy.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  loadPreservationData() {
    this.fetchPreservationData(data => {
      this.preservationDetails = data;
    });
  }

  fetchPreservationData(cb) {
    const req = new XMLHttpRequest();
    req.open("GET", `assets/data/preservation.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  loadSourceNameData() {
    this.fetchSourceNameData(data => {
      this.sourceDetails = data;
    });
  }

  fetchSourceNameData(cb) {
    const req = new XMLHttpRequest();
    req.open("GET", `assets/data/source.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  loadSiteNameData() {
    this.fetchSiteNameData(data => {
      this.siteDetails = data;
    });
  }

  fetchSiteNameData(cb) {
    const req = new XMLHttpRequest();
    req.open("GET", `assets/data/siteName.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  locadSiteCategoryData() {
    this.fetchSiteCategoryData(data => {
      this.siteCategory = data;
    });
  }
  fetchSiteCategoryData(cb) {
    const req = new XMLHttpRequest();
    req.open("GET", `assets/data/siteCategory.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }
}
