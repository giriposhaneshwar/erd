import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import { single, multi } from './../charts.data';

@Component({
  selector: 'ms-pie-charts',
  templateUrl:'./pie-chart-component.html',
  styleUrls: ['./pie-chart-component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
  
})
export class PieChartDemoComponent implements OnInit {

public single: any[];
  public multi: any[];
 
  public showLegend = true;
  public gradient = true;
  public colorScheme = {
    domain: ['#32936f', '#e83f6f', '#ffbf00 ', '#2274a5']
  }; 
  public showLabels = true;
  public explodeSlices = false;
  public doughnut = false;

  constructor(private pageTitleService: PageTitleService) {
    Object.assign(this, {single}); 
  }

    ngOnInit() {
      this.pageTitleService.setTitle("Pie Charts");
    }
  
  public onSelect(event) {
    console.log(event);
  }
	
}



