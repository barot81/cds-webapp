import { Component } from "@angular/core";

interface RepoItem {
    icon: string;
    title: string;
    description: string;
    page: string;
}

@Component({
    selector: 'exxat-site-demos-container',
    templateUrl: './site-demos-container.component.html'
})
export class SiteDemosContainerComponent {

    demoItems: RepoItem[] = [
        { icon: 'fab fa-blackberry', title: 'Site Demo', description: 'Site Demo', page: '/admin/ux/apps/site' },
        { icon: 'fab fa-blackberry', title: 'Slot By Site', description: 'Slot By Site', page: '/admin/ux/apps/Slot_By_Site_Demo' },
        { icon: 'fab fa-blackberry', title: 'Site Person', description: 'Site Person module', page: '/admin/ux/apps/person-from-site-location/tab1' },
    ]

}