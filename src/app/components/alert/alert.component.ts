import { Component, OnInit,ViewEncapsulation }      from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-alert',
  	templateUrl:'./alert-component.html',
  	styleUrls: ['./alert-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class AlertComponent implements OnInit{
	
	constructor(private pageTitleService: PageTitleService) {}

   	ngOnInit() {
    	this.pageTitleService.setTitle("Alerts");
   	} 

    public alerts: any = [
    {
      type: 'success',
      msg: `You successfully read this important alert message.`
    },
    {
      type: 'info',
      msg: `This alert needs your attention, but it's not super important.`
    },
    {
      type: 'danger',
      msg: `Better check yourself, you're not looking too good.`
    }
  ];
 
  public reset(): void {
    this.alerts = this.alerts.map((alert: any) => Object.assign({}, alert));
  }


    public alerts2: any = [];
 
    public add(): void {
      this.alerts2.push({
        type: 'info',
        msg: `This alert will be closed in 5 seconds (added: ${(new Date()).toLocaleTimeString()})`,
        timeout: 5000
      });
    }
}


