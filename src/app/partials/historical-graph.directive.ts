import { Directive, ElementRef, ngOnInit } from "@angular/core";
import * as d3 from "d3";
import * as $ from "jquery/dist/jquery.min.js";
declare var $: any;

@Directive({
  selector: "[msHistoricalGraph]"
})
export class HistoricalGraphDirective {
  element: ElementRef;
  constructor(public el: ElementRef) {
    this.element = el.nativeElement;
  }
  ngOnInit() {
    let ele = $(this.element);
    let graphData =
      ele[0].attributes.graphData.value != undefined
        ? JSON.parse(ele[0].attributes.graphData.value)
        : [];
    console.log("D#", $(ele.parent())[0].clientWidth);
    let svg = d3
      .selectAll(ele)
      .append("svg");
    svg.attr("width", "100%").attr("height", 50);

    let group = svg.append('g');
    let gdMax = d3.max(graphData);
    let gdMin = d3.min(graphData);

    // set the ranges
    /* var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]); */

    graphData.map(function(n, i){
      console.log("GD", i, n);
    });

    console.log("Data type", typeof graphData, graphData, ele.parent().width(), ele.parent().height());
    // this.element.innerHTML = this.element.attributes.data.join(", ");
  }
}
