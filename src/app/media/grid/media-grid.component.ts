import { Component, OnInit,ViewEncapsulation }      from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-media-grid',
  	templateUrl:'./media-grid-component.html',
 	  styleUrls: ['./media-grid-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class MediaGridComponent implements OnInit {

	constructor(private pageTitleService: PageTitleService) {}

   	ngOnInit() {
    	this.pageTitleService.setTitle("Media Grid");
   	}

  photos : object[] = [{
    photo : 'assets/img/post1.jpg',
    title:'Image 1'
  },{
    photo : 'assets/img/post2.jpg',
    title:'Image 2'
  },{
    photo : 'assets/img/post3.jpg',
    title:'Image 3'
  },{
    photo : 'assets/img/post4.jpg',
    title:'Image 4'
  },{
    photo : 'assets/img/post5.jpg',
    title:'Image 5'
  },{
    photo : 'assets/img/post4.jpg',
    title:'Image 6'
  },{
    photo : 'assets/img/post3.jpg',
    title:'Image 7'
  },{
    photo : 'assets/img/post2.jpg',
    title:'Image 8'
  },{
    photo : 'assets/img/post1.jpg',
    title:'Image 9'
  }];
}


