import { Component } from '@angular/core';

export var pie_chart_single = [
    {
        "name": "Germany",
        "value": 8940000
    },
    {
        "name": "USA",
        "value": 5000000
    },
    {
        "name": "France",
        "value": 7200000
    },
    {
        "name": "UK",
        "value": 6200000
    }
];

@Component({
    selector: 'ryzen-pie-chart',
    templateUrl: './pie-chart.component.html',
})
export class PieChartComponent {
    pie_chart_single: any[];
    view: any[] = [700, 400];

    // options
    gradient: boolean = true;
    showLegend: boolean = true;
    showLabels: boolean = false;
    isDoughnut: boolean = false;
    legendPosition: string = 'below';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    constructor() {
        Object.assign(this, { pie_chart_single });
    }

    onSelect(data): void {
        console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    }

    onActivate(data): void {
        console.log('Activate', JSON.parse(JSON.stringify(data)));
    }

    onDeactivate(data): void {
        console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }
}