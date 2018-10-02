import { Component, OnInit,ViewEncapsulation }      from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-media-list',
  	templateUrl:'./media-list-component.html',
 	  styleUrls: ['./media-list-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class MediaListComponent implements OnInit {

	constructor(private pageTitleService: PageTitleService) {}

   	ngOnInit() {
    	this.pageTitleService.setTitle("Media List");
   	}
  photos : object[] = [{
    photo : 'assets/img/post1.jpg',
  },{
    photo : 'assets/img/post2.jpg',
  },{
    photo : 'assets/img/post3.jpg',
  },{
    photo : 'assets/img/post4.jpg',
  }];
}


