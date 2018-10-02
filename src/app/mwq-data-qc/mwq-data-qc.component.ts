import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';

@Component({
  selector: 'ms-mwq-data-qc',
  templateUrl: './mwq-data-qc.component.html',
  styleUrls: ['./mwq-data-qc.component.scss']
})
export class MwqDataQcComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) { }

  ngOnInit() {
    this.pageTitleService.setTitle("MJQ Data QC");
  }


}
