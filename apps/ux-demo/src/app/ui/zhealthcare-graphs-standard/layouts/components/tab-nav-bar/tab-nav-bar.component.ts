import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'zhealthcare-graphs-tab-nav-bar',
    templateUrl: './tab-nav-bar.component.html'
})
export class TabNavBarComponent implements OnInit {

    navigations = [
        {
            id: 'graph-layout-one',
            title: 'Layout One',
            type: 'item',
            url: '/admin/ux/ui/zhealthcare_graphs_standards/layouts/layout_one'
        },
        {
            id: 'graph-layout-two',
            title: 'Layout Two',
            type: 'item',
            url: '/admin/ux/ui/zhealthcare_graphs_standards/layouts/layout_two'
        },
        {
            id: 'graph-layout-three',
            title: 'Layout Three',
            type: 'item',
            url: '/admin/ux/ui/zhealthcare_graphs_standards/layouts/layout_three'
        },
    ]

    constructor() { }

    ngOnInit() {
    }

}
