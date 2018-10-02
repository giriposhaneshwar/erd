import { Component, OnInit,ViewEncapsulation, ViewChild }      from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-tabs',
  	templateUrl:'./tabs-component.html',
  	styleUrls: ['./tabs-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class TabsComponent implements OnInit {

	constructor(private pageTitleService: PageTitleService) {}

   	ngOnInit() {
    	this.pageTitleService.setTitle("Tabs");
   	}

      public alertMe(): void {
    setTimeout(function (): void {
      alert('You\'ve selected the alert tab!');
    });
  }

  @ViewChild('staticTabs') staticTabs: TabsetComponent;
 
  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }
 
  disableEnable() {
    this.staticTabs.tabs[2].disabled = ! this.staticTabs.tabs[2].disabled
  }

}


