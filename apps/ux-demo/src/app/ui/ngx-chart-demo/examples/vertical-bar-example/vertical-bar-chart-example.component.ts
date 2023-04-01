import { Component } from '@angular/core';

export var single = [
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
    }
  ];
@Component({
    selector: 'ryzen-vertical-bar-chart-example',
    templateUrl: './vertical-bar-chart-example.component.html',
})
export class VerticalBarcChartExampleComponent {

    single: any[];
    multi: any[];

    view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Country';
    showYAxisLabel = true;
    yAxisLabel = 'Population';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    constructor() {
        Object.assign(this, { single })
    }

    onSelect(event) {
        console.log(event);
    }
}
