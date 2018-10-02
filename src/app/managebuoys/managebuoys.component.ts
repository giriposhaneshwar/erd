import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';

@Component({
  selector: 'ms-managebuoys',
  templateUrl: './managebuoys.component.html',
  styleUrls: ['./managebuoys.component.scss']
})
export class ManagebuoysComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) { }

  ngOnInit() {
    this.pageTitleService.setTitle("Manage BUOYS");
  }

}



