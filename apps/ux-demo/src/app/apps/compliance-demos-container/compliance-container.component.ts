import { Component } from "@angular/core";

interface RepoItem {
    icon: string;
    title: string;
    description: string;
    page: string;
}

@Component({
    selector: 'zhealthcare-compliance-demo-container',
    templateUrl: './compliance-container.component.html'
})
export class ComplianceDemoContainerComponent {
    demoItems: RepoItem[] = [
       // { icon: 'fab fa-blackberry', title: 'Compliance Student Demo', description: 'Student side compliance module', page: '/admin/ux/apps/compliance/student' },
        { icon: 'fab fa-blackberry', title: 'Compliance Document Demo', description: 'compliance document demo page in configuration', page: '/admin/ux/apps/compliance-document-demo/tab1' },
       // { icon: 'fab fa-blackberry', title: 'Compliance Admin Demo', description: 'Admin side compliance module', page: '/admin/ux/apps/compliance/admin' },
       // { icon: 'fab fa-blackberry', title: 'Compliance Site Demo', description: 'Compliance Site App Demo', page: '/admin/ux/apps/compliance-site-demo' },
        { icon: 'fab fa-blackberry', title: 'Compliance Summary Grid', description: 'Compliance Summary Grid', page: '/admin/ux/apps/compliance-summary-grid' },
    ]
}