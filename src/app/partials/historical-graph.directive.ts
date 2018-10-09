import { Directive, ElementRef } from "@angular/core";
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
    this.draw();
  }
  draw() {
    let ele = $(this.element);
    let graphHolder = d3
      .select(this.element)
      .append("div")
      .attr("class", "graphHolder");
    console.log("Width", $(".graphHolder"));
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
    let x = d3.scaleLinear().rangeRound([0, w]);
    let y = d3.scaleLinear().rangeRound([h, 0]);
    let line = d3
      .line()
      .x(function(d) {
        return x(d.x);
      })
      .y(function(d) {
        return y(d.y);
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
    var xDiff = parseInt(d3.max(data) / data.length);
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
