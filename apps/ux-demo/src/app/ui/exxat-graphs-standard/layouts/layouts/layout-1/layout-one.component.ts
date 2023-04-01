import { Component } from "@angular/core";
import { HeaderService } from "@exxat/ux";

export var single = [
    {
        "name": "Lagend 1 Lagend 1 Lagend 1 Lagend 1 Lagend 1 Lagend 1 Lagend 1 Lagend 1",
        "value": 100,
        "color": '#BF342A'
    },
    {
        "name": "Lagend 2",
        "value": 66,
        "color": '#00BCD4'
    },
    {
        "name": "Lagend 3",
        "value": 90,
        "color": '#FF8BB2'
    },
    {
        "name": "Lagend 4 Lagend 4 Lagend 4 Lagend 4 Lagend 4",
        "value": 93,
        "color": '#FFC107'
    },
    {
        "name": "Lagend 5",
        "value": 83,
        "color": '#8BC34A'
    },
    {
        "name": "Lagend 6",
        "value": 23,
        "color": '#E85D67'
    },
    {
        "name": "Lagend 7",
        "value": 100,
        "color": '#BF342A'
    },
    {
        "name": "Lagend 8",
        "value": 66,
        "color": '#00BCD4'
    },
    {
        "name": "Lagend 9 Lagend 9 Lagend 9 Lagend 9 Lagend 9 Lagend 9",
        "value": 90,
        "color": '#FF8BB2'
    },
    {
        "name": "Lagend 10",
        "value": 93,
        "color": '#FFC107'
    },
    {
        "name": "Lagend 11",
        "value": 83,
        "color": '#8BC34A'
    },
    {
        "name": "Lagend 12",
        "value": 23,
        "color": '#E85D67'
    },
    {
        "name": "Lagend 13",
        "value": 100,
        "color": '#BF342A'
    },
    {
        "name": "Lagend 14",
        "value": 66,
        "color": '#00BCD4'
    },
    {
        "name": "Lagend 15",
        "value": 83,
        "color": '#8BC34A'
    },
    {
        "name": "Lagend 16",
        "value": 23,
        "color": '#E85D67'
    },
    {
        "name": "Lagend 17",
        "value": 100,
        "color": '#BF342A'
    },
    {
        "name": "Lagend 18",
        "value": 66,
        "color": '#00BCD4'
    },
    {
        "name": "Lagend 19",
        "value": 90,
        "color": '#FF8BB2'
    },
    {
        "name": "Lagend 20",
        "value": 93,
        "color": '#FFC107'
    },
    {
        "name": "Lagend 21",
        "value": 83,
        "color": '#8BC34A'
    },
    {
        "name": "Lagend 22",
        "value": 23,
        "color": '#E85D67'
    },

];

@Component({
    selector: 'exxat-graphs-layout-one',
    templateUrl: 'layout-one.component.html',
})
export class LayoutOneComponent {

    single: any[];
    multi: any[];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Country';
    showYAxisLabel = true;
    yAxisLabel = 'Population';
    animations = false;

    tooltipOptions = {
        'contentType': 'string',
        'placement': 'top',
        'trigger': 'hover',
        'max-width': '126',
        'width': '126',
        'pointerEvents': 'auto'
    }

    colorScheme = {
        domain: ['#BF342A', '#00BCD4', '#FF8BB2', '#FFC107', '#8BC34A', '#E85D67']
    };

    constructor(public _headerService: HeaderService) {
        Object.assign(this, { single })
    }

    onSelect(event) {
        console.log(event);
    }
}