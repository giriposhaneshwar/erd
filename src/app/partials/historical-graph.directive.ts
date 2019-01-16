import { Directive, ElementRef, OnInit, Input, OnChanges } from "@angular/core";
import * as d3 from "d3";
import * as $ from "jquery/dist/jquery.min.js";
declare var $: any;

@Directive({
  selector: "[msHistoricalGraph]"
})
export class HistoricalGraphDirective implements OnChanges {
  element: HTMLInputElement;
  @Input("graphData") graphData: any;
  @Input("threshold") threshold: any;
  margin: any = {
    top: 3,
    right: 10,
    bottom: 3,
    left: 0
  };
  width: any = 148 - (this.margin.left + this.margin.right);
  height: any = 31 - (this.margin.top + this.margin.bottom);
  constructor(public el: ElementRef) {
    this.element = el.nativeElement;
    /* console.log("this.element", this.element); */
  }

  ngOnInit() {
    // this.draw();
    //console.log("ele", this.element);
  }
  ngOnChanges() {
    this.draw();
  }
  generateMetaData(data) {
    // data = JSON.parse(data);
    // debugger;
    let xDiff = Math.round(d3.max(data) / data.length);
    let metaDataInner = [];
    let start = { x: 0, y: 0 };
    let end = { x: (data.length - 1) * xDiff, y: 0 };
    metaDataInner.push(start);
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item === "" || item === null) {
        item = 0;
      }
      metaDataInner.push({ x: i * xDiff, y: parseFloat(item) });
    }
    metaDataInner.push(end);
    //console.log(metaDataInner);
    return metaDataInner;
  }

  getMeanLine(mdata, point) {
    point = parseInt(point);
    return [{ x: 0, y: point }, { x: mdata[mdata.length - 1].x, y: point }];
  }
  getBaseLine(mdata) {
    return [{ x: 0, y: 0 }, { x: mdata[mdata.length - 1].x, y: 0 }];
  }

  draw() {
    // debugger;
    let ele = $(this.element);
    let graphHolder = d3
      .select(this.element)
      .append("div")
      .attr("class", "graphContainer");
    //console.log("Width ", this.graphData);
    let svg = graphHolder
      .append("svg")
      .attr("width", this.width+(this.margin.left + this.margin.right))
      .attr("height", this.height + (this.margin.top + this.margin.bottom))
      .attr("class", "svgContainer")
      // .attr("style", "border: 1px solid #c00")
      .on("mouseover", e => {
        //console.log("ON Mouse Over", e, $(this.element).find('circle'));
        let element = $(this.element);
        // element.find("circle").addClass("active");
        element.find("text").addClass("active");
      })
      .on("mouseout", e => {
        //console.log("ON Mouse Out", e, this);
        let element = $(this.element);
        /* if (element.find('circle').hasClass('active')){
          element.find("circle").removeClass("active");
        } */
        if (element.find('text').hasClass('active')) {
          element.find("text").removeClass("active");
        }
       });
    const metaData = this.generateMetaData(this.graphData);
    const meanLine = this.getMeanLine(metaData, this.threshold);
    const baseLine = this.getBaseLine(metaData);
    //console.log("Meta Data", metaData, meanLine);

    let x = d3.scaleLinear().range([0, this.width-(this.margin.left+this.margin.right)]);
    let y = d3.scaleLinear().range([this.height-(this.margin.top+this.margin.bottom), 0]);

    let g = svg
      .append("g")
      .attr(
        "transform",
        "translate(5, 10)"
      );

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
    // Filling Area with color
    g.append("path")
      .datum(metaData)
      .attr("fill", "#4682b422")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke", "none")
      .attr("stroke-width", 0)
      .attr("d", line);

    // Drawing thick line above ARea
    let newLineData = metaData;
    newLineData.shift();
    newLineData.pop();
    //console.log("New Line", newLineData);

    g.append("path")
      .datum(newLineData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1)
      .attr("d", line);

    // Drwaing the marker circles
    g.selectAll("circle")
      .data(metaData)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return x(d.x);
      })
      .attr("cy", function(d) {
        return y(d.y);
      })
      .attr("r", 2)
      .attr("class", "marker markerCircle")
      .attr("fill", "steelblue");

    // Creating Label for each point
    g.selectAll("text")
      .data(metaData)
      .enter()
      .append("text")
      .attr("class", "marker markerLabel")
      .attr("font-size", "8px")
      .attr("x", function(d) {
        return x(d.x);
      })
      .attr("y", function(d) {
        return y(d.y) - 2;
      })
      .text(function(d) {
        return d.y;
      });
    // Drawign mean line for Treshould
    g.append("path")
      .datum(meanLine)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line);

    // Drawign mean line for Treshould
    g.append("path")
      .datum(baseLine)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line);
  }
}
