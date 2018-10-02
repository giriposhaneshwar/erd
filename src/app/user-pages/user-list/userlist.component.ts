import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-userlist',
    templateUrl:'./userlist-component.html',
    styleUrls: ['./userlist-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class UserListComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) {}

  ngOnInit() {
    this.pageTitleService.setTitle("User List");
  }
	
  users: Object[] = [{
      name: 'Haile',
      city: 'New York',
      country: 'USA',
      post:'Manager',
      image:'assets/img/user-1.jpg'
    },{
      name: 'Victor',
      city: 'New York',
      country: 'USA',
      post:'Developer',
      image:'assets/img/user-2.jpg'
    },{
      name: 'Jhon',
      city: 'New York',
      country: 'USA',
      post:'Student',
      image:'assets/img/user-3.jpg'
    },{
      name: 'Maria',
      city: 'New York',
      country: 'USA',
      post:'Student',
      image:'assets/img/user-4.jpg'
    },{
       name: 'Marry',
      city: 'New York',
      country: 'USA',
      post:'Student',
      image:'assets/img/user-1.jpg'
    },{
      name: 'Love',
      city: 'New York',
      country: 'USA',
      post:'Student',
      image:'assets/img/user-2.jpg'
    },{
      name: 'Harris',
      city: 'New York',
      country: 'USA',
      post:'Developer',
      image:'assets/img/user-3.jpg'
    },{
      name: 'Marcus',
      city: 'New York',
      country: 'USA',
      post:'Developer',
      image:'assets/img/user-4.jpg'
    },{
      name: 'Mills',
      city: 'New York',
      country: 'USA',
      post:'Developer',
      image:'assets/img/user-1.jpg'
    }
  ];
	
}



