import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


export interface HelperTableElement {
    propertyTitle: string;
    propertyType: string;
    defaultValue: string;
    description: string;
}

const ELEMENT_DATA: HelperTableElement[] = [
    { propertyTitle: 'view', propertyType: 'number[]', defaultValue: '', description: 'the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size' },
    { propertyTitle: 'scheme', propertyType: 'object', defaultValue: '', description: 'the color scheme of the chart' },
    { propertyTitle: 'animations', propertyType: 'boolean', defaultValue: 'true', description: 'enable animations' },
    { propertyTitle: 'legend', propertyType: 'boolean', defaultValue: 'false', description: 'show or hide the legend' },
    { propertyTitle: 'legendTitle', propertyType: 'string', defaultValue: 'Legend', description: 'the legend title' },
    { propertyTitle: 'xAxis', propertyType: 'boolean', defaultValue: 'false', description: 'show or hide the x axis' },
    { propertyTitle: 'yAxis', propertyType: 'boolean', defaultValue: 'false', description: 'show or hide the y axis' },
    { propertyTitle: 'showXAxisLabel', propertyType: 'boolean', defaultValue: 'false', description: 'show or hide the x axis label' },
    { propertyTitle: 'showYAxisLabel', propertyType: 'boolean', defaultValue: 'false', description: 'show or hide the y axis label' },
    { propertyTitle: 'xAxisLabel', propertyType: 'string', defaultValue: '', description: 'the x axis label text' },
    { propertyTitle: 'yAxisLabel', propertyType: 'string', defaultValue: '', description: 'the y axis label text' },
    { propertyTitle: 'showDataLabel', propertyType: 'boolean', defaultValue: 'false', description: 'displays the value number next to the bar' },
    { propertyTitle: 'labels', propertyType: 'boolean', defaultValue: 'true ', description: 'show or hide the labels (Pie Chart Only)' },
    { propertyTitle: 'tooltipDisabled', propertyType: 'boolean', defaultValue: 'false', description: 'show or hide the tooltip' },
    { propertyTitle: 'roundEdges', propertyType: 'boolean', defaultValue: 'true ', description: 'round edges for the bars' },

]


@Component({
    selector: 'ngx-chart-helper-table',
    templateUrl: './ngx-chart-helper-table.component.html',
})
export class NgxChartHelperTableComponent implements OnInit {


    displayedColumns: string[] = ['property', 'type', 'default_value', 'description'];

    dataSource = new MatTableDataSource<HelperTableElement>(ELEMENT_DATA);


    ngOnInit() {

    }
}