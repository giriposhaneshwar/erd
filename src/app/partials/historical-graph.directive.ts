import { Directive, ElementRef, OnInit, Input, OnChanges, DoCheck } from "@angular/core";
import * as d3 from "d3";
import * as $ from "jquery/dist/jquery.min.js";
declare var $: any;

@Directive({
  selector: "[msHistoricalGraph]"
})
export class HistoricalGraphDirective implements OnInit, OnChanges, DoCheck {
  element: HTMLInputElement;
  @Input("graphData") graphData: any;
  @Input("threshold") threshold: any;
  @Input("graphName") graphName: any;

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

  ngDoCheck() {
    //console.log("AT Do Check Chagne Dected", this.graphName, this.graphData);
    // $(this.element).find(".graphContainer").remove();
    // this.draw();
    this.updateGraph();
  }
  ngOnInit() {
    // this.draw();
    //console.log("ele", this.element);
  }
  ngOnChanges() {
    //console.log("Directive Hit", this.graphData);
    this.draw();
    this.updateGraph();
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
  doMouseOver() {
    //console.log("Mouse Ovce");
  }
  draw() {
    // debugger;
    let ele = $(this.element);
    const metaData = this.generateMetaData(this.graphData);
    const meanLine = this.getMeanLine(metaData, this.threshold);
    const baseLine = this.getBaseLine(metaData);
    let contaier = d3.select(this.element);
    contaier.select('.graphContainer').remove();
    let graphHolder = contaier.append("div")
      .attr("class", "graphContainer");
    //console.log("Width ", this.graphData);
    let svg = graphHolder
      .append("svg")
      .attr("width", this.width + (this.margin.left + this.margin.right))
      .attr("height", this.height + (this.margin.top + this.margin.bottom))
      .attr("class", "svgContainer");
    // .attr("style", "border: 1px solid #c00")
    let g = svg
      .append("g")
      .attr('class', 'graphG')
      .attr(
        "transform",
        "translate(5, 10)"
      );

      g.append("path").attr('class', 'metaData');
      g.append("path").attr('class', 'newLineData');
      g.append("path").attr('class', 'meanLine');
      g.append("path").attr('class', 'baseLine');

    

    // Drwaing the marker circles
    g.selectAll("circle")
      .data(metaData)
      .enter()
      .append("circle")
      .attr('class', function(n,i) {
        return 'circle'+i;
      });

      g.selectAll("text")
      .data(metaData)
      .enter()
      .append("text")
      .attr("class", function(n,i) {
        return 'text'+i;
      });
 }

  updateGraph() {
    // debugger;
    let ele = d3
      .select(this.element);
    let graphHolder = ele.select("div.graphContainer");
    let svg = graphHolder.select('svg');
    let g = svg.select('g.graphG');
    // svg.select('g.graphG').remove();


    const metaData = this.generateMetaData(this.graphData);
    const meanLine = this.getMeanLine(metaData, this.threshold);
    const baseLine = this.getBaseLine(metaData);
    //console.log("Meta Data", metaData, meanLine);

    let x = d3.scaleLinear().range([0, this.width - (this.margin.left + this.margin.right)]);
    let y = d3.scaleLinear().range([this.height - (this.margin.top + this.margin.bottom), 0]);



    let line = d3
      .line()
      .x(function (d) {
        return x(d.x);
      })
      .y(function (d) {
        return y(d.y);
      });
    x.domain(
      d3.extent(metaData, function (d) {
        return d.x;
      })
    );
    y.domain(
      d3.extent(metaData, function (d) {
        return d.y;
      })
    );
    // Filling Area with color

    g.select("path.metaData")
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

    g.select("path.newLineData")
      .datum(newLineData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1)
      .attr("d", line);

    // Drwaing the marker circles
    for(let i=0; i<metaData.length; i++){
      let cirValue = metaData[i];
      // debugger;
      //console.log('.circle'+i, cirValue);
      let circle = g.select('.circle'+i);
      circle.attr("cx", x(cirValue.x))
      .attr("cy", y(cirValue.y))
      .attr("r", 2)
      .attr("class", "marker markerCircle")
      .attr("fill", "steelblue");
    }
    for(let i=0; i<metaData.length; i++){
      let textValue = metaData[i];
      // debugger;
      let text = g.select('.text'+i);
      text.attr("class", "marker markerLabel")
      .attr("font-size", "8px")
      .attr("x", x(textValue.x))
      .attr("y", y(textValue.y) - 2)
      .text(textValue.y);
    }
    

    // Creating Label for each point
    
    // Drawign mean line for Treshould
    g.select("path.meanLine")
      .datum(meanLine)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line);

    // Drawign mean line for Treshould
    g.select("path.baseLine")
      .datum(baseLine)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line);

    svg.on("mouseover", e => {
      //console.log("ON Mouse Over", e, $(this.element).find('circle'));
      let element = $(this.element);
      // element.find("circle").addClass("active");
      element.find("text").addClass("active");
      
    });
    svg.on("mouseout", e => {
      //console.log("ON Mouse Out", e, this);
      let element = $(this.element);
      /* if (element.find('circle').hasClass('active')){
        element.find("circle").removeClass("active");
      } */
      if (element.find('text').hasClass('active')) {
        element.find("text").removeClass("active");
      }
    });
  }
}
