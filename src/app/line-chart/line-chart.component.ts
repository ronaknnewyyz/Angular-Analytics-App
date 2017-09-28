import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../shared/data.service';
import { Location } from '@angular/common';
import { ILineEventName } from '../shared/data.interface';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit {

  @ViewChild('line') private lineContainer: ElementRef;
  condition: string;
  data: Array<any>;
  eventConditions: ILineEventName[] = [
    {event: 'pushRO', name: 'Push Repair Order'},
    {event: 'enterRO', name: 'Enter Repair Order'},
    {event: 'welcomeTab', name: 'Welcome Tab'}
  ];
  private margin: any = {top: 50, bottom: 50, left: 50, right: 50};
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private xAxis: any;
  private yAxis: any;

  constructor(
    private dataService: DataService,
    private location: Location
  ) {
    this.condition = 'pushRO';
  }

  ngOnInit() {
    this.generateLineData(this.condition);
  }

  generateLineData(option: string): void {
    this.dataService.getLineData(option)
      .subscribe(data => {
        this.data = data;
        this.updateLine();
      });
  }

  updateLineChart(option: string): void {
    this.condition = option;
    this.generateLineData(option);
  }

  createLine(): any {
    const element = this.lineContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    const svg = d3.select(element).append('svg').attr('width', element.offsetWidth).attr('height', element.offsetHeight);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'lines')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    const xDomain = this.data.map(d => d[0]);
    const yDomain = [0, d3.max(this.data, d => d[1])];

    // create scales
    this.xScale = d3.scaleBand().padding(1).domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));

    // Labeling on X-Axis
    // svg.append('text')
    //   .attr('transform', 'translate(' + (this.width / 2) + ',' + (this.height + this.margin.top + 50) + ')')
    //   .style('text-anchor', 'middle')
    //   .text('Days of the Week');
  }

  updateLine() {
    // create Axes if not already present
    if (!this.xAxis) {
      this.createLine();
    }
    // update scales & axis
    this.chart.selectAll('path').remove();
    this.chart.selectAll('circle').remove();
    this.xScale.domain(this.data.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.data, d => d[1])]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));
    const update = this.chart.selectAll('.lines').data(this.data);

    update.exit().remove();

    this.chart.selectAll('.lines').transition()
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(d[1]))
      .attr('width', d => this.xScale.bandwidth())
      .attr('height', d => this.height - this.yScale(d[1]));

    const lineFun = d3.line()
      .x(d => this.xScale(d[0]))
      .y(d => this.yScale(d[1]));

    update
      .data(this.data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('r', 5)
      .attr('cx', d => this.xScale(d[0]))
      .attr('cy', d => this.yScale(d[1]))
      .on('mouseover', function () {
        d3.select(this).attr('r', 8);
      })
      .on('mouseout', function () {
          d3.select(this).attr('r', 5);
      });

    update.enter()
      .append('path')
      .attr('class', 'line')
      .datum(this.data)
      .transition()
      .attr('height', d => this.height - this.yScale(d[1]))
      .style('fill', 'none')
      .style('stroke', 'blue')
      .style('stroke-width', 2)
      .attr('d', lineFun(this.data));
  }

  goBack(): void {
    this.location.back();
  }
}
