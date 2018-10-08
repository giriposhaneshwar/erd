import { Directive, ElementRef, ngOnInit } from "@angular/core";
/* import * as $ from 'jquery'; */
@Directive({
  selector: "[msHistoricalGraph]"
})
export class HistoricalGraphDirective {
  element: ElementRef;
  constructor(public el: ElementRef) {
    this.element = el.nativeElement;
  }
  ngOnInit() {
    console.log("Data type", this.element.attributes.graphData);
    // this.element.innerHTML = this.element.attributes.data.join(", ");
  }
}
