import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';

@Component({
  selector: 'ms-download-data',
  templateUrl: './download-data.component.html',
  styleUrls: ['./download-data.component.scss']
})
export class DownloadDataComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) { }

  ngOnInit() {
    this.pageTitleService.setTitle("Download Data");
  }

}
