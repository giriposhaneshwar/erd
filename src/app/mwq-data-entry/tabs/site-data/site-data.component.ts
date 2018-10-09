import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "ms-site-data",
  templateUrl: "./site-data.component.html",
  styleUrls: ["./site-data.component.scss"]
})
export class SiteDataComponent implements OnInit {

  siteDateEdit() {
    console.log("At Edit Screen");
  }
  siteDateSave() {
    console.log("At Save Screen");
  }
  siteDateNext() {
    this.route.navigate(["mwqDataEntry", "in-situ-parameters"]);
    console.log("At Next Screen");
  }

  constructor(public route: Router) {
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
    this.selectedEventType = [this.eventTypeDetails[0]];
  }

  loadEventTypeData() {
    this.fetchEventTypeData((data) => {
      //this.selectedEventType = [data[1]];
      this.eventTypeDetails = data;
    });
  }

  fetchEventTypeData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/eventType.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  loadSampleByData() {
    this.fetchSampleByData((data) => {
      this.sampleByDetails = data;
    });
  }

  fetchSampleByData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/sampleBy.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  loadPreservationData() {
    this.fetchPreservationData((data) => {
      this.preservationDetails = data;
    });
  }

  fetchPreservationData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/preservation.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }


  loadSourceNameData() {
    this.fetchSourceNameData((data) => {
      this.sourceDetails = data;
    });
  }

  fetchSourceNameData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/source.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }


  loadSiteNameData() {
    this.fetchSiteNameData((data) => {
      this.siteDetails = data;
    });
  }

  fetchSiteNameData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/siteName.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  locadSiteCategoryData() {
    this.fetchSiteCategoryData((data) => {
      this.siteCategory = data;
    });
  }
  fetchSiteCategoryData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/siteCategory.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }
}
