import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { Config } from '../appConfiguration/config';

@Component({
  selector: 'ms-mwq-data-entry',
  templateUrl: './mwq-data-entry.component.html',
  styleUrls: ['./mwq-data-entry.component.scss']
})
export class MwqDataEntryComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) { }

  ngOnInit() {
    this.pageTitleService.setTitle("MJQ Data Entry");
    console.log("Executing Configurations", Config.appConfig.mainNav);
  }

}
