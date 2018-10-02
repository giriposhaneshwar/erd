import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-accordion',
  	templateUrl:'./accordion-component.html',
  	styleUrls: ['./accordion-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class AccordionComponent implements OnInit{
	
	constructor(private pageTitleService: PageTitleService) {}

   	ngOnInit() {
    	this.pageTitleService.setTitle("Accordion");
   	}

      public items: string[] = ['Item 1', 'Item 2', 'Item 3'];
 
      public status: any = {
        isFirstOpen: true,
        isOpen: false
      };
     
      public groups: any[] = [
        {
          title: 'Dynamic Group Header - 1',
          content: 'Dynamic Group Body - 1'
        },
        {
          title: 'Dynamic Group Header - 2',
          content: 'Dynamic Group Body - 2'
        }
      ];
     
      public addItem(): void {
        this.items.push(`Items ${this.items.length + 1}`);
      }

      public oneAtATime: boolean = true;
      public customClass: string = 'customClass';
      public isFirstOpen: boolean = true;
}
