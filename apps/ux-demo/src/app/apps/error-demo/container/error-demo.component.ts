import { Component } from "@angular/core";

interface RepoItem {
    icon: string;
    title: string;
    description: string;
    page: string;
}

@Component({
    selector: 'ryzen-error-demo',
    templateUrl: './error-demo.component.html'
})
export class ErrorDemoComponent {

    demoItems: RepoItem[] = [
        { icon: 'fab fa-blackberry', title: '404 Error Page', description: '404 Error Demo Page', page: '/admin/ux/apps/error-demo/error-demo-404' },
        { icon: 'fab fa-blackberry', title: '500 Error Page', description: '500 Error Demo Page', page: '/admin/ux/apps/error-demo/error-demo-500' },
    ]

}