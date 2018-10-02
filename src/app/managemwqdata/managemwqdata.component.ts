import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';

@Component({
  selector: 'ms-managemwqdata',
  templateUrl: './managemwqdata.component.html',
  styleUrls: ['./managemwqdata.component.scss']
})
export class ManagemwqdataComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) { }

  ngOnInit() {
    this.pageTitleService.setTitle("Manage Data");
  }

}
