import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'exxat-tab-navbar',
    templateUrl: 'tab-navbar.component.html',
})
export class TabnavBarComponent implements OnInit {

    navigations = [
        {
            id: 'academic-info',
            title: 'Academic Info',
            type: 'item',
            url: '/admin/ux/apps/profile-admin-print-demo/academic-info'
        },
        {
            id: 'student-info',
            title: 'student Info',
            type: 'item',
            url: '/admin/ux/apps/profile-admin-print-demo/student-info'
        },
        {
            id: 'contact-info',
            title: 'Contact',
            type: 'item',
            url: '/admin/ux/apps/profile-admin-print-demo/contact-info'
        },
        {
            id: 'share-profille',
            title: 'Share Profile',
            type: 'item',
            url: '/admin/ux/apps/profile-admin-print-demo/share-profile'
        },
        {
            id: 'compliance',
            title: 'Compliance',
            type: 'item',
            url: '/admin/ux/apps/profile-admin-print-demo/compliance'
        },
        {
            id: 'communications',
            title: 'Communications',
            type: 'item',
            url: '/admin/ux/apps/profile-admin-print-demo/communications'
        },

    ]

    constructor() { }

    ngOnInit() {
    }

}