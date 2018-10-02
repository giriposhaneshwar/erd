import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-linea',
  	templateUrl:'./linea-component.html',
  	styleUrls: ['./linea-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class LineaComponent implements OnInit{
	
	constructor(private pageTitleService: PageTitleService) {}

   	ngOnInit() {
    	this.pageTitleService.setTitle("Linea");
   	}

icons = [
  "icon icon-arrows-anticlockwise",
  "icon icon-arrows-anticlockwise-dashed",
  "icon icon-arrows-button-down",
  "icon icon-arrows-button-off",
  "icon icon-arrows-button-on",
  "icon icon-arrows-button-up",
  "icon icon-arrows-check",
  "icon icon-arrows-circle-check",
  "icon icon-basic-magnifier",
  "icon icon-basic-magnifier-minus",
  "icon icon-basic-magnifier-plus",
  "icon icon-basic-mail",
  "icon icon-basic-mail-multiple",
  "icon icon-basic-mail-open",
  "icon icon-basic-mail-open-text",
  "icon icon-basic-male",
  "icon icon-basic-map",
  "icon icon-basic-message",
  "icon icon-basic-message-multiple",
  "icon icon-basic-message-txt",
  "icon icon-basic-mixer2",
  "icon icon-basic-mouse",
  "icon icon-basic-notebook",
  "icon icon-basic-notebook-pen",
  "icon icon-basic-notebook-pencil",
  "icon icon-basic-paperplane",
  "icon icon-basic-pencil-ruler",
  "icon icon-basic-pencil-ruler-pen",
  "icon icon-basic-photo",
  "icon icon-basic-picture",
  "icon icon-basic-picture-multiple",
  "icon icon-basic-pin1",
  "icon icon-basic-pin2",
  "icon icon-basic-postcard",
  "icon icon-basic-postcard-multiple",
  "icon icon-basic-printer",
  "icon icon-basic-question",
  "icon icon-basic-rss",
  "icon icon-basic-server",
  "icon icon-basic-server2",
  "icon icon-basic-server-cloud",
  "icon icon-basic-server-download",
  "icon icon-basic-server-upload",
  "icon icon-basic-settings",
  "icon icon-basic-share",
  "icon icon-basic-sheet",
  "icon icon-basic-sheet-multiple",
  "icon icon-basic-sheet-pen",
  "icon icon-basic-sheet-pencil",
  "icon icon-basic-sheet-txt",
  "icon icon-basic-signs",
  "icon icon-basic-smartphone",
  "icon icon-basic-spades",
  "icon icon-basic-spread",
  "icon icon-basic-spread-bookmark",
  "icon icon-basic-spread-text",
  "icon icon-basic-spread-text-bookmark",
  "icon icon-basic-star",
  "icon icon-basic-tablet",
  "icon icon-basic-target",
  "icon icon-basic-todo",
  "icon icon-basic-todo-pen",
  "icon icon-basic-todo-pencil",
  "icon icon-basic-trashcan",
  "icon icon-basic-trashcan-full",
  "icon icon-basic-trashcan-refresh",
  "icon icon-basic-trashcan-remove",
  "icon icon-basic-upload",
  "icon icon-basic-usb",
  "icon icon-basic-video",
  "icon icon-basic-watch",
  "icon icon-basic-webpage",
  "icon icon-basic-webpage-img-txt",
  "icon icon-basic-webpage-multiple",
  "icon icon-basic-webpage-txt"
];
}

