import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import { messages, users, single, multi, dashboardbar, map1, map2, map3, map4 } from './../dashboard.data';

@Component({
  selector: 'ms-dashboard',
  templateUrl:'./dashboard-component.html',
  styleUrls: ['./dashboard-component.scss'],
  encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class DashboardComponent implements OnInit  {

  lat: number = 50.937531;
  lng: number = 6.960278600000038;

  public messages: any[];
  public users: any[];
  public single: any[];
  public multi: any[];
  public dashboardbar: any[];
  public map1: any[];
  public map2: any[];
  public map3: any[];
  public map4: any[];
  constructor( private pageTitleService: PageTitleService) {
    this.messages = messages;
    this.users = users;
    this.single = single;
    this.multi = multi;
    this.dashboardbar = dashboardbar;
    this.map1 = map1;
    this.map2 = map2;
    this.map3 = map3;
    this.map4 = map4;
  }
  ngOnInit() {
    this.pageTitleService.setTitle("Home");
  }

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  showLabels = true;
  yAxisLabel = 'Population';
  doughnut = false;

  colorScheme = {
    domain: ['#32936f', '#e83f6f', '#ffbf00 ', '#2274a5']
  };
  
  colorScheme1 = {
    domain: ['#32936f']
  };
  colorScheme2 = {
    domain: ['#e83f6f']
  };
  colorScheme3 = {
    domain: ['#ffbf00 ']
  };
  colorScheme4 = {
    domain: ['#2274a5']
  };
  
  onSelect(event) {
    console.log(event);
  }
 
}