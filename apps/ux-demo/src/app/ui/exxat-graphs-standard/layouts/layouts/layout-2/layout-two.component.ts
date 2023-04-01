import { Component } from "@angular/core";
import { HeaderService } from "@exxat/ux";

export var layout_two_single = [
    {
        "name": "Lagend 1",
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
        "color": '#FFC107'
    },
    {
        "name": "Lagend 4",
        "value": 93,
        "color": '#8BC34A'
    }
];

export var layout_two_single_two = [
    {
        "name": "Lagend 1",
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
        "name": "Lagend 4",
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
    }
];

@Component({
    selector: 'exxat-graphs-layout-two',
    templateUrl: 'layout-two.component.html',
})
export class LayoutTwoComponent {

    layout_two_single: any[];
    layout_two_single_two: any[];
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
        domain: ['#BF342A', '#00BCD4', '#FFC107', '#8BC34A']
    };

    colorScheme_two = {
        domain: ['#BF342A', '#00BCD4', '#FF8BB2', '#FFC107', '#8BC34A', '#E85D67']
    };

    constructor(public _headerService: HeaderService) {
        Object.assign(this, { layout_two_single })
        Object.assign(this, { layout_two_single_two })
    }

    onSelect(event) {
        console.log(event);
    }
}
