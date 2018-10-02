import { Component, AfterViewInit, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

declare var $: any;

@Component({
    selector: 'ms-image-cropper',
    templateUrl:'./image-cropper-component.html',
    styleUrls: ['./image-cropper-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class CropperComponent implements AfterViewInit, OnInit{

    constructor(private pageTitleService: PageTitleService) {}

    ngOnInit() {
        this.pageTitleService.setTitle("Cropper");
    }

ngAfterViewInit(){    
    $('.container > img').cropper({
      aspectRatio: 16 / 9,
      crop: function(data) {}
    });
}
	
}



