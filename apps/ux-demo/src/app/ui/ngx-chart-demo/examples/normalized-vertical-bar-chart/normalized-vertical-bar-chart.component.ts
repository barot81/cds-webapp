import { Component } from '@angular/core';

export var normalized_vertical_bar_multi = [
    {
        "name": "Germany",
        "series": [
            {
                "name": "2010",
                "value": 7300000
            },
            {
                "name": "2011",
                "value": 8940000
            }
        ]
    },

    {
        "name": "USA",
        "series": [
            {
                "name": "2010",
                "value": 7870000
            },
            {
                "name": "2011",
                "value": 8270000
            }
        ]
    },

    {
        "name": "France",
        "series": [
            {
                "name": "2010",
                "value": 5000002
            },
            {
                "name": "2011",
                "value": 5800000
            }
        ]
    }
];


@Component({
    selector: 'ryzen-stacked-vertical-bar-chart',
    templateUrl: './normalized-vertical-bar-chart.component.html',
})
export class NormalizedVerticalBarComponent {
    normalized_vertical_bar_multi: any[];
    view: any[] = [700, 400];

    // options
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = false;
    showLegend: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Country';
    showYAxisLabel: boolean = true;
    yAxisLabel: string = 'Population';
    animations: boolean = true;

    colorScheme = {
        domain: ['#5AA454', '#C7B42C', '#AAAAAA']
    };

    constructor() {
        Object.assign(this, { normalized_vertical_bar_multi });
    }

    onSelect(event) {
        console.log(event);
    }
}
