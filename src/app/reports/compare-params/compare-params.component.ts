import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-compare-params',
  templateUrl: './compare-params.component.html',
  styleUrls: ['./compare-params.component.scss']
})
export class CompareParamsComponent implements OnInit {

  constructor(private route: Router,
    private spinner: NgxSpinnerService) {
    let currentUrl = this.route.url;
    let groupInfo = sessionStorage.getItem("groups");
    let username = sessionStorage.getItem("username");

    if (groupInfo === "2" || groupInfo === "20") {
      this.spinner.show();
      console.log("-----Group Mached-----" + groupInfo, username, currentUrl);
      this.spinner.hide();
    }
    else {
      console.log("-----Group Not Matched-----" + groupInfo, currentUrl);
      this.spinner.hide();
      this.route.navigate(["error"]);
    }
  }

  ngOnInit() {
  }

}
