import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'ms-micro-biology',
  templateUrl: './micro-biology.component.html',
  styleUrls: ['./micro-biology.component.scss']
})
export class MicroBiologyComponent implements OnInit {

  totalColiform:any=  { val1: 65  };
  enterococci:any= { val1: 65  };
  fecalColiform:any= { val1: 65  };

  constructor(public route: Router) { }

  inputOrderClass(data, key) {
    console.log("INput Data", data, key);
  }
  siteDatePrev() {
    this.route.navigate(["mwqDataEntry", "organic-chemistry"]);
    console.log("At organic-chemistry Screen");
  }
  siteDateSave() {
    console.log("At Save Screen");
  }
  siteDateNext() {
    this.route.navigate(["mwqDataEntry", "upload-files"]);
    console.log("At upload-files Screen");
  }

  ngOnInit() {
  }

}
