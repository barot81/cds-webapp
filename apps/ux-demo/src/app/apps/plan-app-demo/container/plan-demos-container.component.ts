import { Component } from "@angular/core";

interface RepoItem {
    title: string;
    icon: string;
    description?: string;
    page?: string;
    isAccessible?:boolean;
}

@Component({
    selector: 'plan-demos-container',
    templateUrl: './plan-demos-container.component.html',
    styleUrls: ['./plan-demos-container.component.scss']
})
export class PlanDemosContainerComponent {

    public planDemoItems: Array<RepoItem> = [
        // { icon: 'fab fa-blackberry', title: 'Plan Mapping Demo', description: 'plan mapping demo', page: '/admin/ux/apps/plan-mapping-demo' },
       // { icon: 'fab fa-blackberry', title: 'Plan Student Demo', description: 'Admin side student module', page: '/admin/ux/apps/plan-student-demo-plan' },
        { icon: 'fab fa-blackberry', title: 'Plan App Demo', description: 'Plan App Demo', page: '/admin/ux/apps/plan-app-demo', isAccessible:true },
       // { icon: 'fab fa-blackberry', title: 'Plan Course Details Demo', description: 'Course details demo page', page: '/admin/ux/apps/plan-course-details-demo/tab1' },
        { icon: 'fab fa-blackberry', title: 'Plan Static Demo Pages', description: 'Demo pages', page: '/admin/ux/apps/event-schedule-demo', isAccessible: true },
       // { icon: 'fab fa-blackberry', title: 'Plan Setup Demo', description: 'Plan Setup Pages Demo', page: '/admin/ux/apps/plan-setup-demo' },
        { icon: 'fab fa-blackberry', title: 'Plan of Study Demo', description: 'Plan of Study Demo', page: '/admin/ux/apps/plan-of-study-demo' },
    ]
}