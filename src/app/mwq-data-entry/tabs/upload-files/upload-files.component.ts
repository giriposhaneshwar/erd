import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  constructor(public route: Router) { }

  ngOnInit() {
  }

  siteDateSave() {
    console.log("At Save Screen");
  }

  siteDatePrev() {
    this.route.navigate(["mwqDataEntry", "microbiology"]);
  }
}
