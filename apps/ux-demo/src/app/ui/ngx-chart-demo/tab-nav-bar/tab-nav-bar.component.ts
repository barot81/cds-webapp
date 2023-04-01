import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ryzen-tab-nav-bar',
    templateUrl: './tab-nav-bar.component.html'
})
export class TabNavBarComponent implements OnInit {
    navigations = [
        {
            id: 'vertical-bar-chart',
            title: 'Vertical Bar Chart',
            type: 'item',
            url: '/admin/ux/ui/ngx-chart-demo/vertical-bar-chart'
        },
        {
            id: 'vertical-bar-with-custom-lagend-chart',
            title: 'Vertical Bar With Custom Lagends Chart',
            type: 'item',
            url: '/admin/ux/ui/ngx-chart-demo/vertical-bar-with-custom-lagend-chart'
        },
        {
            id: 'horizontal-bar-chart',
            title: 'Horizontal Bar Chart',
            type: 'item',
            url: '/admin/ux/ui/ngx-chart-demo/horizontal-bar-chart'
        },
        {
            id: 'grouped-vertical-bar-chart',
            title: 'Grouped Vertical Bar Chart',
            type: 'item',
            url: '/admin/ux/ui/ngx-chart-demo/grouped-vertical-bar-chart'
        },
        {
            id: 'grouped-horizontal-bar-chart',
            title: 'Grouped Horizontal Bar Chart',
            type: 'item',
            url: '/admin/ux/ui/ngx-chart-demo/grouped-horizontal-bar-chart'
        },
        {
            id: 'stacked-vertical-bar-chart',
            title: 'Stacked Vertical Bar Chart',
            type: 'item',
            url: '/admin/ux/ui/ngx-chart-demo/stacked-vertical-bar-chart'
        },
        {
            id: 'stacked-horizontal-bar-chart',
            title: 'Stacked Horizontal Bar Chart',
            type: 'item',
            url: '/admin/ux/ui/ngx-chart-demo/stacked-horizontal-bar-chart'
        },
        {
            id: 'normalized-vertical-bar-chart',
            title: 'Normalized Vertical Bar Chart',
            type: 'item',
            url: '/admin/ux/ui/ngx-chart-demo/normalized-vertical-bar-chart'
        },
        {
            id: 'normalized-horizontal-bar-chart',
            title: 'Normalized Horizontal Bar Chart',
            type: 'item',
            url: '/admin/ux/ui/ngx-chart-demo/normalized-horizontal-bar-chart'
        },
        {
            id: 'pie-chart',
            title: 'Pie Chart',
            type: 'item',
            url: '/admin/ux/ui/ngx-chart-demo/pie-chart'
        },
        {
            id: 'line-chart',
            title: 'Line Chart',
            type: 'item',
            url: '/admin/ux/ui/ngx-chart-demo/line-chart'
        }
    ]

    constructor() { }

    ngOnInit() {
    }

}
