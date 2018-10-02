import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { fadeInAnimation } from '../core/route-animation/route.animation';

@Component({
  selector: 'ms-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class AlertsComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) { 
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Alerts");
  }
}