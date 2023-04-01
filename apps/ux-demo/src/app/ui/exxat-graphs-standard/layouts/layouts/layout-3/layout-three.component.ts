import { Component } from "@angular/core";
import { HeaderService } from "@exxat/ux";

export var layout_three_single = [
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
        "name": "Lagend 9",
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
];

@Component({
    selector: 'exxat-graphs-layout-three',
    templateUrl: 'layout-three.component.html',
})
export class LayoutThreeComponent {

    layout_three_single: any[];
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
        Object.assign(this, { layout_three_single })
    }

    isTextOverflow(elementId: string): boolean {
        const elem = document.getElementById(elementId);
        if (elem) {
            return (elem.offsetHeight < elem.scrollHeight);
        }
        else {
            return false;
        }
    }


    onSelect(event) {
        console.log(event);
    }
}
