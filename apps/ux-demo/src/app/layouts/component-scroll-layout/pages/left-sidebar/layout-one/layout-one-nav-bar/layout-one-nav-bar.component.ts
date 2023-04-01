import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'zhealthcare-layout-one-nav-bar',
    templateUrl: 'layout-one-nav-bar.component.html',
})
export class LayoutNavBarComponent implements OnInit {

    navigations = [
        {
            id: 'tab-one',
            title: 'Tab One',
            type: 'item',
            url: '/admin/ux/ui/component-scroll-layout/left-side-bar/layout-one/tab-one'
        },
        {
            id: 'tab-two',
            title: 'Tab Two',
            type: 'item',
            url: '/admin/ux/ui/component-scroll-layout/left-side-bar/layout-one/tab-two'
        },
        // {
        //     id: 'tab-three',
        //     title: 'Tab Three',
        //     type: 'item',
        //     url: '/admin/ux/ui/component-scroll-layout/left-side-bar/layout-one/tab-three'
        // },
        // {
        //     id: 'tab-four',
        //     title: 'Tab Four',
        //     type: 'item',
        //     url: '/admin/ux/ui/component-scroll-layout/left-side-bar/layout-one/tab-four'
        // },
        // {
        //     id: 'tab-five',
        //     title: 'Tab Five',
        //     type: 'item',
        //     url: '/admin/ux/ui/component-scroll-layout/left-side-bar/layout-one/tab-five'
        // },
        {
            id: 'tab-six',
            title: 'Condensed Grid',
            type: 'item',
            url: '/admin/ux/ui/component-scroll-layout/left-side-bar/layout-one/tab-six'
        }
    ]

    constructor() {

    }

    ngOnInit() {
    }

}
