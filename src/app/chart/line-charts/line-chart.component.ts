import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import { single, multi } from './../charts.data';

@Component({
  selector: 'ms-line-charts',
  templateUrl:'./line-chart-component.html',
  styleUrls: ['./line-chart-component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
  
})
export class LineChartDemoComponent implements OnInit {

public single: any[];
  public multi: any[];

  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Year';
  public showYAxisLabel = true;
  public yAxisLabel = 'Population';
  public colorScheme = {
    domain: ['#32936f', '#e83f6f', '#ffbf00 ', '#2274a5']
  }; 
  public autoScale = true;
  
  constructor(private pageTitleService: PageTitleService) {
    Object.assign(this, {single, multi}) 
  }

    ngOnInit() {
      this.pageTitleService.setTitle("Line Charts");
    }
  
  onSelect(event) {
    console.log(event);
  }
}



