import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService,private route: Router,
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
    this.pageTitleService.setTitle("Analytics");
  }

}
