import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit} from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
	selector: 'ms-timepicker',
	templateUrl:'./timepicker-component.html',
	encapsulation: ViewEncapsulation.None,
  host: {
      "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ],
})
export class TimepickerComponent implements OnInit{
  	constructor(private pageTitleService: PageTitleService) {}

  	ngOnInit() {
    	this.pageTitleService.setTitle("Timepicker");
   	}

     public mytime: Date = new Date();

    public ismeridian:boolean = true;
 
    public mytime2:Date = new Date();
   
    public toggleMode():void {
      this.ismeridian = !this.ismeridian;
    }


      public ismeridian2: boolean = false;
  public isEnabled: boolean = true;
  public mytime3: Date = new Date();

  public hstep: number = 1;
  public mstep: number = 15;
 
  public mytime4: Date = new Date();
  public options: any = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  public mytime5: Date = new Date();
 
  public update(): void {
    let d = new Date();
    d.setHours(14);
    d.setMinutes(0);
    this.mytime5 = d;
  }
 
  public changed(): void {
    console.log('Time changed to: ' + this.mytime5);
  }
 
  public clear(): void {
    this.mytime5 = void 0;
  }
}


