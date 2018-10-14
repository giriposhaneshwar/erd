import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { Router } from '@angular/router';
import { Config } from '../appConfiguration/config';

@Component({
  selector: 'ms-mwq-data-qc',
  templateUrl: './mwq-data-qc.component.html',
  styleUrls: ['./mwq-data-qc.component.scss']
})
export class MwqDataQcComponent implements OnInit {

  //constructor(private pageTitleService: PageTitleService) { }

  mobileTabNav: any = "qc-site-details";
  constructor(
    private pageTitleService: PageTitleService,
    public route: Router
  ) {}

  tabRouteinMobile(evt, data) {
    this.route.navigate(["mwqDataQc", data]);
  }
  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
    console.log("Executing Configurations", Config.appConfig.mainNav);
  }
}
