import { Component, OnInit,ViewEncapsulation }      from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-popover',
  	templateUrl:'./popover-component.html',
  	styleUrls: ['./popover-component.scss'],
     encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class PopoverComponent implements OnInit {

	constructor(private pageTitleService: PageTitleService) {}

   	ngOnInit() {
    	this.pageTitleService.setTitle("Popover");
   	}
      public title:string = 'Welcome word';
  public content: string = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';

  public html:string = `
<span class="btn btn-danger">Never trust not sanitized HTML!!!</span>`;  
}


