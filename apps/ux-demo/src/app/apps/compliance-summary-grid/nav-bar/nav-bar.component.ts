import { Component } from '@angular/core';

@Component({
    selector: 'ryzen-nav-bar',
    templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {

    navigations = [
        {
            id: 'profile',
            title: 'Profile',
            type: 'item',
            url: '/admin/ux/apps/compliance-site-demo/profile'
        },
        {
            id: 'compliance',
            title: 'Compliance',
            type: 'item',
            url: '/admin/ux/apps/compliance-summary-grid'
        },
        {
            id: 'contact',
            title: 'Contact',
            type: 'item',
            url: '/admin/ux/apps/compliance-site-demo/contact'
        }
    ]
}
