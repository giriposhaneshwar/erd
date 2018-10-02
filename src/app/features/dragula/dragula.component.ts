import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-dragula',
	templateUrl:'./dragula-component.html',
  	styleUrls: ['./dragula-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class DragulaDemoComponent implements OnInit {
	
	constructor(private pageTitleService: PageTitleService) {}

   	ngOnInit() {
    	this.pageTitleService.setTitle("Dragula");
   	}

	group1: Object[] = [{
		name: 'Andrew Pearson',
	},{
		name: 'John S. Guinn',
      
	},{
		name: 'Jill D. Loring',
        
	},{
		name: 'Reggie J. Pough',
        
	},{
		name: 'Eric C. Taylor',
       
	}];

	group2: any[] = [{
		name: 'Apple',
        
	},{
		name: 'Mango',
        
	},{
		name: 'Apricot',
        
	},{
		name: 'Banana',
        
	},{
		name: 'Bilberry',
    
	}];

}



