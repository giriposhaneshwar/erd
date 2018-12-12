import { Component, OnInit, Input } from "@angular/core";
import * as d3 from "d3";


@Component({
  selector: "app-graph",
  template: `<div class="grapHolder"></div>`,
  styleUrls: ["./graph.component.scss"]
})
export class GraphComponent implements OnInit {
  @Input() gd: any;
  @Input() threshold: Number;
  margin: any = {
    top: 20,
    right: 0,
    bottom: 0,
    left: 0
  };
  width: any = "148";
  height: any = "31";

  constructor() {}

  ngOnInit() {
    console.log("Graph Data", this.gd, this.threshold);
    this.draw();
  }
  generateMetaData(data) {
    // data = JSON.parse(data);
    debugger;
    let xDiff = Math.round(d3.max(data) / data.length);
    let metaDataInner = [];
    let start = { x: 0, y: 0 };
    let end = { x: (data.length - 1) * xDiff, y: 0 };
    metaDataInner.push(start);
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if(item === "" || item === null){
        item = 0;
      }
      metaDataInner.push({ x: i * xDiff, y: parseFloat(item) });
    }
    metaDataInner.push(end);
    //console.log(metaDataInner);
    return metaDataInner;
  }

  getMeanLine(mdata, point){
    point = parseInt(point);
    return [
      {x: 0, y: point},
      {x: mdata[mdata.length - 1].x, y: point},
    ];
  }

  draw() {
    // debugger;
    const ele = d3.selectAll('body');
    const svg = d3.select(".graphContainer").append('svg').attr('width', this.width).attr('height', this.height).attr('class', 'svgContainer');
    debugger;
    const metaData = this.generateMetaData(this.gd);
    const meanLine = this.getMeanLine(metaData, this.threshold);
    console.log("Meta Data", metaData, meanLine);

    let x = d3.scaleLinear().range([0, this.width]);
    let y = d3.scaleLinear().range([this.height, 0]);

    let g = svg
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margin.left + ", " + this.margin.top + ")"
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
      .attr("fill", "#cc000055")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke", "#000")
      .attr("stroke-width", 0)
      .attr("d", line);


      // Drawing thick line above ARea
      let newLineData = metaData;
      newLineData.shift();
      newLineData.pop();
      console.log("New Line", newLineData);

    g.append("path")
      .datum(newLineData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke", "#000")
      .attr("stroke-width", 4)
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
      .attr("r", 5)
      .attr("class", "marker markerCircle")
      .attr("fill", "#000");

      // Creating Label for each point
    g.selectAll("text")
      .data(metaData)
      .enter()
      .append("text")
      .attr('class', 'marker markerLabel')
      .attr("x", function(d) {
        return x(d.x);
      })
      .attr("y", function(d) {
        return y(d.y) - 5;
      })
      .text(function(d) {
        return d.y;
      });
  // Drawign mean line for Treshould
    g.append("path")
      .datum(meanLine)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke", "#000")
      .attr("stroke-width", 4)
      .attr("d", line);
  }
}
