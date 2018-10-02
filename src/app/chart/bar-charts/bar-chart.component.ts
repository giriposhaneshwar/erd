import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import { single, multi } from './../charts.data';

@Component({
  selector: 'ms-bar-charts',
  templateUrl:'./bar-chart-component.html',
  styleUrls: ['./bar-chart-component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
  
})
export class BarChartComponent implements OnInit {

  public single: any[];
  public multi: any[]; 

  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Country';
  public showYAxisLabel = true;
  public yAxisLabel = 'Population';
  public colorScheme = {
    domain: ['#32936f', '#e83f6f', '#ffbf00 ', '#2274a5']
  };

    constructor(private pageTitleService: PageTitleService) {
      Object.assign(this, {single, multi});
    }

    ngOnInit() {
      this.pageTitleService.setTitle("Bar Charts");
    }

    public onSelect(event) {
    console.log(event);
  }
}

