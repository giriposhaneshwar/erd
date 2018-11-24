import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppStorageService } from "app/appConfiguration/app-config.service";
import { Config } from "app/appConfiguration/config";

@Component({
  selector: "ms-in-situ-parameters",
  templateUrl: "./in-situ-parameters.component.html",
  styleUrls: ["./in-situ-parameters.component.scss"]
})
export class InSituParametersComponent implements OnInit {
  dataEntry: any;
  dataEntryKey: string = "dataEntry";
  temperatureComponentKey: string = "Temparature";
  conductivityComponentKey: string = "Conductivity";
  salinityComponentKey: string = "Salinity";
  pHComponentKey: string = "pH";
  dissolvedOComponentKey: string = "Dissolved_O_";
  chlorophyll_aComponentKey: string = "Chlorophyll_a";
  sechiDiscComponentKey: string = "Sechi_Disc";
  graphData: any;
  graphDataKey: any = "insituParams";
  module: String;

  temperature: any = { surfaceValue: "", bottomValue: "", bottom5m: "", bottom10m: "", bottom15m: "", bottom20m: "", bottom25m: "", bottom30m: "", bottom35m: "", bottom40m: "" };
  conductivity: any = { surfaceValue: "", bottomValue: "", bottom5m: "", bottom10m: "", bottom15m: "", bottom20m: "", bottom25m: "", bottom30m: "", bottom35m: "", bottom40m: "" };
  salinity: any = { surfaceValue: "", bottomValue: "", bottom5m: "", bottom10m: "", bottom15m: "", bottom20m: "", bottom25m: "", bottom30m: "", bottom35m: "", bottom40m: "" };
  pH: any = { surfaceValue: "", bottomValue: "", bottom5m: "", bottom10m: "", bottom15m: "", bottom20m: "", bottom25m: "", bottom30m: "", bottom35m: "", bottom40m: "" };
  dissolvedO: any = { surfaceValue: "", bottomValue: "", bottom5m: "", bottom10m: "", bottom15m: "", bottom20m: "", bottom25m: "", bottom30m: "", bottom35m: "", bottom40m: "" };
  Chlorophyll_a: any = { surfaceValue: "", bottomValue: "", bottom5m: "", bottom10m: "", bottom15m: "", bottom20m: "", bottom25m: "", bottom30m: "", bottom35m: "", bottom40m: "" };
  sechiDisc: any = { surfaceValue: "", bottomValue: "", bottom5m: "", bottom10m: "", bottom15m: "", bottom20m: "", bottom25m: "", bottom30m: "", bottom35m: "", bottom40m: "" };
  constructor(public route: Router, public localStore: AppStorageService, public config: Config) { }

  ngOnInit() {

    let mod = this.config.getModuleName();
    this.module = mod.module;
    console.log("----module name----" + this.module);

    // get DAta
    let localData = this.localStore.store.get(this.dataEntryKey);
    let insituParamsgraphData = this.localStore.store.get("graphData");
    this.graphData = insituParamsgraphData.data.insituParams;
    console.log("-----insituParams----------" + this.graphData);
    //  console.log("-----insituParams----------"+ this.graphData )
    /*  setTimeout(() => {
       this.graphData.Sechi_Disc_Surface = ["30", "80", "20", "95"];
     }, 5000); */
    if (localData.status == "success") {
      this.dataEntry = localData.data;
      if (this.dataEntry.hasOwnProperty(this.temperatureComponentKey)) {
        this.temperature = this.dataEntry[this.temperatureComponentKey];
        this.conductivity = this.dataEntry[this.conductivityComponentKey];
        this.salinity = this.dataEntry[this.salinityComponentKey];
        this.pH = this.dataEntry[this.pHComponentKey];
        this.dissolvedO = this.dataEntry[this.dissolvedOComponentKey];
        this.Chlorophyll_a = this.dataEntry[this.chlorophyll_aComponentKey];
        this.sechiDisc = this.dataEntry[this.sechiDiscComponentKey];
      } else {
        // this.dataEntry = {};
        this.dataEntry[this.temperatureComponentKey] = this.temperature;
        this.dataEntry[this.conductivityComponentKey] = this.conductivity;
        this.dataEntry[this.salinityComponentKey] = this.salinity;
        this.dataEntry[this.pHComponentKey] = this.pH;
        this.dataEntry[this.dissolvedOComponentKey] = this.dissolvedO;
        this.dataEntry[this.chlorophyll_aComponentKey] = this.Chlorophyll_a;
        this.dataEntry[this.sechiDiscComponentKey] = this.sechiDisc;

        this.localStore.store.set(this.dataEntryKey, this.dataEntry);
      }
    } else {
      // this.dataEntry = {};
      this.dataEntry[this.temperatureComponentKey] = this.temperature;
      this.dataEntry[this.conductivityComponentKey] = this.conductivity;
      this.dataEntry[this.salinityComponentKey] = this.salinity;
      this.dataEntry[this.pHComponentKey] = this.pH;
      this.dataEntry[this.dissolvedOComponentKey] = this.dissolvedO;
      this.dataEntry[this.chlorophyll_aComponentKey] = this.Chlorophyll_a;
      this.dataEntry[this.sechiDiscComponentKey] = this.sechiDisc;
      this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    }
    console.log("Data Entry", this.dataEntryKey, this.dataEntry);
    //this.selectedEventType = [this.eventTypeDetails[0]];
  }

  inputOrderClass(data, key) {
    console.log("Input Data", data, key);
  }

  insituDetailsSave(temperature, conductivity, salinity, pH, dissolvedO, Chlorophyll_a, sechiDisc) {
    this.dataEntry[this.temperatureComponentKey] = temperature;
    this.dataEntry[this.conductivityComponentKey] = conductivity;
    this.dataEntry[this.salinityComponentKey] = salinity;
    this.dataEntry[this.pHComponentKey] = pH;
    this.dataEntry[this.dissolvedOComponentKey] = dissolvedO;
    this.dataEntry[this.chlorophyll_aComponentKey] = Chlorophyll_a;
    this.dataEntry[this.sechiDiscComponentKey] = sechiDisc;

    this.localStore.store.set(this.dataEntryKey, this.dataEntry);
    console.log("At Save Screen");
  }

  inSituTabPrev(module) {
    if (module === "mwqDataEntry") {
      this.route.navigate(["mwqDataEntry", "site-details"]);
      console.log("At mwqDataEntry - site-details Screen");
    }
    else {
      this.route.navigate(["mwqDataQc", "site-details"]);
      console.log("At mwqDataQc - site-details Screen");
    }
  }

  inSituTabNext(module) {
    if (module === "mwqDataEntry") {
      this.route.navigate(["mwqDataEntry", "general-chemistry"]);
      console.log("At mwqDataEntry - general-chemistry Screen");
    }
    else {
      this.route.navigate(["mwqDataQc", "general-chemistry"]);
      console.log("At mwqDataQc - general-chemistry Screen");
    }
  }
}
