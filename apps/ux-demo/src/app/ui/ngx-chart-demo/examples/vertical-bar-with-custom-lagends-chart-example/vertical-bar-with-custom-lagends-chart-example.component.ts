import { Component } from "@angular/core";


export var single_custom = [
    {
        "name": "Germany",
        "value": 90,
        "color": "#5AA454",
        "data": "(90/100)"
    },
    {
        "name": "USA",
        "value": 50,
        "color": "#A10A28",
        "data": "(50/100)"
    },
    {
        "name": "France",
        "value": 80,
        "color": "#C7B42C",
        "data": "(80/100)"
    }
];


@Component(
    {
        selector: 'zhealthcare-vertical-bar-with-custom-lagends-chart-example',
        templateUrl: 'vertical-bar-with-custom-lagends-chart-example.component.html',
    }
)
export class VerticalBarWithCustomLagendChartComponent {

    single_custom: any[];
    multi: any[];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = false;
    showXAxisLabel = true;
    xAxisLabel = 'Country';
    showYAxisLabel = true;
    yAxisLabel = 'Population';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C']
    };

    constructor() {
        Object.assign(this, { single_custom })
    }

    onSelect(event) {
        console.log(event);
    }

}
