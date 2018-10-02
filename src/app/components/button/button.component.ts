import { Component, OnInit,ViewEncapsulation }      from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-button',
  	templateUrl:'./button-component.html',
  	styleUrls: ['./button-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class ButtonComponent implements OnInit {

	constructor(private pageTitleService: PageTitleService) {}

   	ngOnInit() {
    	this.pageTitleService.setTitle("Buttons");
   	}

    public singleModel: string = '1';

    public checkModel:any = {left: false, middle: true, right: false};

    public radioModel: string = 'Middle';

    public disabled: boolean = false;
}


