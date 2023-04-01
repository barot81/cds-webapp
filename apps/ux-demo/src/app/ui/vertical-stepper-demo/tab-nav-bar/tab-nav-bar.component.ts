import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ryzen-tab-nav-bar',
    templateUrl: './tab-nav-bar.component.html'
})
export class TabNavBarComponent implements OnInit {

    navigations = [
        {
            id: 'vertical-stepper-example',
            title: 'Vertical Stepper Example 1',
            type: 'item',
            url: '/admin/ux/ui/vertical_stepper_demo/example_one'
        },
    ]

    constructor() { }

    ngOnInit() {
    }

}
