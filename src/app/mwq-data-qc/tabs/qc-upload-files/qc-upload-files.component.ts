import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-qc-upload-files',
  templateUrl: './qc-upload-files.component.html',
  styleUrls: ['./qc-upload-files.component.scss']
})
export class QcUploadFilesComponent implements OnInit {

  siteDateEdit() {
    console.log("At Edit Screen");
  }
  siteDateSave() {
    console.log("At Save Screen");
  }


  siteDatePrev() {
    this.route.navigate(["mwqDataQc", "qc-microbiology"]);
  }

  siteDateNext() {
    this.route.navigate(["mwqDataQc", "qc-remarks"]);
    console.log("At Next Screen");
  }

  constructor(public route: Router) { }

  ngOnInit() {
  }

}
