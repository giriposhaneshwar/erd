import { Directive, ElementRef, OnInit } from "@angular/core";
import * as d3 from "d3";

import * as scale from "d3-scale";

import * as $ from "jquery/dist/jquery.min.js";
declare var $: any;

@Directive({
  selector: "[qc-msHistoricalGraph]"
})
export class QcHistoricalGraphDirective implements OnInit {
  element: HTMLInputElement;
  constructor(public el: ElementRef) {
    this.element = el.nativeElement;
    
  }

  ngOnInit() {
    this.draw();
  }

  draw() {
    let ele = $(this.element);
    let graphHolder = d3
      .select(this.element)
      .append("div")
      .attr("class", "graphHolder");
    console.log("Width ", $(".graphHolder"));
    let canvas = graphHolder.append("svg");
    let graphData =
      ele[0].attributes.graphData.value != undefined
        ? JSON.parse(ele[0].attributes.graphData.value)
        : [];
    let metaData = this.generateMetaData(graphData);
    console.log("Graph Data", graphData, metaData);
    /* Generating Graph */
    var w = 150,
      h = 30,
      margin = { top: 1, bottom: 0, left: -1, right: -1 };
    canvas
      .attr("width", w + (margin.left + margin.right))
      .attr("height", h + (margin.top + margin.bottom))
      .attr("class", "graphSection");
    canvas.selectAll("g").remove();
    let g = canvas
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let x = scale.scaleLinear().rangeRound([0, w]);
    let y = scale.scaleLinear().rangeRound([h, 0]);
    let line = d3.svg
      .line()
      .x(function(d) {
        return x();
      })
      .y(function(d) {
        return y();
      });
    x.domain(
      d3.extent(metaData, function(d) {
        return d.x;
      })
    );
    y.domain(
      d3.extent(metaData, function(d) {
        return d.y;
      })
    );

    /*g.append("g")
         .attr("transform", "translate(0," + h + ")")
         .call(d3.axisBottom(x))
         .select(".domain")
         .remove();
    g.append("g")
         .call(d3.axisLeft(y))
         .append("text")
         .attr("fill", "#000")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "0.71em")
         .attr("text-anchor", "end");*/

    g.append("path")
      .datum(metaData)
      .attr("fill", "#4682b422")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 2)
      .attr("d", line);
  }

  generateMetaData(data) {
    var xDiff = Math.round(d3.max(data) / data.length);
    var metaDataInner = [];
    var start = { x: 0, y: 0 };
    var end = { x: (data.length - 1) * xDiff, y: 0 };
    metaDataInner.push(start);
    data.map(function(n, i) {
      metaDataInner.push({
        x: i * xDiff,
        y: n
      });
    });
    metaDataInner.push(end);
    console.log(metaDataInner);
    return metaDataInner;
  }
}
