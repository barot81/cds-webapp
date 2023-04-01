import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { HeaderService } from "@zhealthcare/ux";
import { graphs_data, graphs_data_medium } from '../../data';

@Component({
    selector: 'zhealthcare-graphs-page-one',
    templateUrl: 'page-one.component.html',
    styleUrls: ['page-one.component.scss']
})
export class PageOneComponent implements AfterViewInit {

    @ViewChild('graphs_page_header') elementView: ElementRef;

    graphs_data: any[];
    graphs_data_medium: any[];
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
        Object.assign(this, { graphs_data });
        Object.assign(this, { graphs_data_medium });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            let height = this.elementView.nativeElement.offsetHeight;
            this._headerService.setCurrentHeaderHeight(height);
        });
    }

    onSelect(event) {
        console.log(event);
    }
}