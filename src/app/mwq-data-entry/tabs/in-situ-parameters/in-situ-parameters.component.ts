import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppStorageService } from "app/appConfiguration/app-config.service";

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
  dissolvedOComponentKey: string = "Dissolved O_";
  chlorophyll_aComponentKey: string = "Chlorophyll_a";
  sechiDiscComponentKey: string = "Sechi Disc";


  temperature: any = {
    surfaceValue: "",
    bottomValue:"",
    bottom5m: "",
    bottom10m: "",
    bottom15m: "",
    bottom20m: "",
    bottom25m: ""
   };
  
   conductivity: any = {
    surfaceValue: "",
    bottomValue:"",
    bottom5m: "",
    bottom10m: "",
    bottom15m: "",
    bottom20m: "",
    bottom25m: ""
  };

  salinity: any = {
    surfaceValue: "",
    bottomValue:"",
    bottom5m: "",
    bottom10m: "",
    bottom15m: "",
    bottom20m: "",
    bottom25m: ""
  };


  pH: any = {
    surfaceValue: "",
    bottomValue:"",
    bottom5m: "",
    bottom10m: "",
    bottom15m: "",
    bottom20m: "",
    bottom25m: ""
  };

  dissolvedO: any = {
    surfaceValue: "",
    bottomValue:"",
    bottom5m: "",
    bottom10m: "",
    bottom15m: "",
    bottom20m: "",
    bottom25m: ""
  };

  Chlorophyll_a: any = {
    surfaceValue: "",
    bottomValue:"",
    bottom5m: "",
    bottom10m: "",
    bottom15m: "",
    bottom20m: "",
    bottom25m: ""
  };

  sechiDisc: any = {
    surfaceValue: "",
    bottomValue:"",
    bottom5m: "",
    bottom10m: "",
    bottom15m: "",
    bottom20m: "",
    bottom25m: ""
  };

   ngOnInit() {
     // get DAta
    let localData = this.localStore.store.get(this.dataEntryKey);
    if (localData.status == "success") {
      this.dataEntry = localData.data;
      if(this.dataEntry.hasOwnProperty(this.temperatureComponentKey)){
        this.temperature = this.dataEntry[this.temperatureComponentKey];
        this.conductivity = this.dataEntry[this.conductivityComponentKey];
        this.salinity = this.dataEntry[this.salinityComponentKey];
        this.pH = this.dataEntry[this.pHComponentKey];
        this.dissolvedO = this.dataEntry[this.dissolvedOComponentKey];
        this.Chlorophyll_a = this.dataEntry[this.chlorophyll_aComponentKey];
        this.sechiDisc = this.dataEntry[this.sechiDiscComponentKey];
        
      }else{
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

  
  constructor(public route: Router, public localStore: AppStorageService) {}

  inputOrderClass(data, key) {
    console.log("INput Data", data, key);
  }
  siteDatePrev() {
    this.route.navigate(["mwqDataEntry", "site-details"]);
    console.log("At site-details Screen");
  }
  insituDetailsSave(temperature,conductivity,salinity,pH,dissolvedO,Chlorophyll_a,sechiDisc) {
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
  siteDateNext() {
    this.route.navigate(["mwqDataEntry", "general-chemistry"]);
    console.log("At Next Screen");
  }
  
  
}
