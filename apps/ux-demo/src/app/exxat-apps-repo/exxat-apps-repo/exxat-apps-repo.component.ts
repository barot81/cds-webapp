import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export interface zhealthcare_apps_repo_item {
  title: string;
  icon: string;
  description?: Array<string>;
  page?: string;
  isAccessible?: boolean;
}

@Component({
  selector: 'ryzen-zhealthcare-apps-repo',
  templateUrl: './zhealthcare-apps-repo.component.html',
  styleUrls: ['./zhealthcare-apps-repo.component.scss'],
})
export class zhealthcareAppsRepoComponent {
  searchByItem: FormControl;

  listofOptions = [
    { fieldName: 'title', displayName: 'Title' },
    { fieldName: 'description', displayName: 'Description' },
  ];

  searchItem = new FormControl();

  zhealthcare_apps_repo_list: zhealthcare_apps_repo_item[] = [
    // { icon: 'fa-light fa-file-lines', title: 'Profile - Admin Print Demo', description: 'Profile - Admin Print Demo', page: '/admin/ux/apps/profile-admin-print-demo' },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Login Screen',
      description: ['Login Screen Demo Page'],
      page: '/admin/ux/apps/login_demo',
      isAccessible: true,
    },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Sticky Header Table Layout',
      description: ['Sticky Header Table Layout'],
      page: '/admin/ux/apps/sticky-table-header-layout',
      isAccessible: true,
    },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Home Screen',
      description: ['Home Screen Demo Page'],
      page: '/admin/ux/apps/home-screen-demo',
      isAccessible: true,
    },
    // { icon: 'fa-light fa-file-lines', title: 'Data Level Security Demo', description: 'Data Level Security Demo', page: '/admin/ux/apps/data-level-security-demo' },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Change Password Screen',
      description: ['Change Password Screen Demo Page'],
      page: '/admin/ux/apps/login_demo/change_password',
      isAccessible: true,
    },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Change Password Success Screen',
      description: ['Change Password Success Screen Demo Page'],
      page: '/admin/ux/apps/login_demo/change_password_success',
      isAccessible: true,
    },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Student Demo',
      description: ['Admin side student module'],
      page: '/admin/ux/apps/student/details',
    },
    // { icon: 'fa-light fa-file-lines', title: 'Release Notes Demo App', description: ['Release Notes Demo App'], page: '/admin/ux/apps/release-notes-demo-app' },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Drawer Examples demo',
      description: ['Different drawers examples'],
      page: '/admin/ux/apps/drawer-examples-demo',
      isAccessible: true,
    },
    //{ icon: 'fa-light fa-file-lines', title: 'Public website demo', description: ['public website demo'], page: '/admin/ux/apps/public-website-demo' },
    // { icon: 'fa-light fa-file-lines', title: 'Landing page demo', description: ['Landing page demo'], page: '/admin/ux/apps/landing-page-demo' },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Public Website Dashboard',
      description: ['public website dashboard'],
      page: '/admin/ux/apps/public-website-home',
      isAccessible: true,
    },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Placement Demo',
      description: ['Placement App Demo'],
      page: '/admin/ux/apps/placement',
      isAccessible: false,
    },
    //{ icon: 'fa-light fa-file-lines', title: 'PatientLog Demo', description: ['PatientLog App Demo'], page: '/admin/ux/apps/patientlog-demo' },
    //{ icon: 'fa-light fa-file-lines', title: 'Evaluation Admin Demo', description: ['Admin side evaluation module'], page: '/admin/ux/apps/evaluation-admin-demo' },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Static Role Configuration page',
      description: ['Static Role Configuration page'],
      page: '/admin/ux/apps/static-role-configuration-page',
      isAccessible: true,
    },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Frequency Based Eval Form',
      description: ['Frequency Based Eval Form'],
      page: '/admin/ux/apps/frequency-based-eval-form',
      isAccessible: false,
    },
    //{ icon: 'fa-light fa-file-lines', title: 'Slot Demo', description: ['Slot Demo'], page: '/admin/ux/apps/slot-demo/tab1' },
    //{ icon: 'fa-light fa-file-lines', title: 'Tenant Onboarding Demo', description: ['Tenant Onboarding Demo'], page: '/admin/ux/apps/tenant-onboarding-demo' },
    //{ icon: 'fa-light fa-file-lines', title: 'Institution List Demo', description: ['Institution List Demo'], page: '/admin/ux/apps/institution-list-demo' },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Add Records Tenant Onboarding',
      description: ['Add Records Tenant Onboarding'],
      page: '/admin/ux/apps/add-records',
      isAccessible: false,
    },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Faculty Profile Page',
      description: ['Faculty Profile Page'],
      page: '/admin/ux/apps/faculty-profile-page',
      isAccessible: true,
    },
    {
      icon: 'fa-light fa-file-lines',
      title: 'configuration course offering',
      description: ['configuration course offering'],
      page: '/admin/ux/apps/configuration-course-offering',
      isAccessible: false,
    },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Ess wizard new page',
      description: ['Ess wizard new page'],
      page: '/admin/ux/apps/ess-wizard-page-new',
      isAccessible: true,
    },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Student Wishlist Demo',
      description: ['Student Wishlist Demo'],
      page: '/admin/ux/apps/student-wishlist-demo',
      isAccessible: true,
    },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Map of Affiliation Demo',
      description: ['Map of Affiliation Demo'],
      page: '/admin/ux/apps/map-of-affiliation-demo',
      isAccessible: false,
    },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Slot And Placement Demo',
      description: ['Slot And Placement Demo'],
      page: '/admin/ux/apps/slot-and-placement-demo',
      isAccessible: true,
    },
    //{ icon: 'fa-light fa-file-lines', title: 'Notification Demo', description: ['Notification Demo'], page: '/admin/ux/apps/notification',isAccessible:false },
    {
      icon: 'fa-light fa-file-lines',
      title: 'The Complete Demo',
      description: ['Filter and Filter chips with show more'],
      page: '/admin/ux/apps/the-complete-demo-page',
      isAccessible: true,
    },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Timeline Sidebar Demo',
      description: ['Timeline Sidebar Demo'],
      page: '/admin/ux/apps/sidebar-with-timeline',
      isAccessible: true,
    },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Programs Dashboard Demo',
      description: ['Programs Dashboard Demo'],
      page: '/admin/ux/apps/programs-dashboard-demo',
      isAccessible: true,
    },
    //{ icon: 'fa-light fa-file-lines', title: 'Inner Page Demo', description: ['Inner Page Demo'], page: '/admin/ux/apps/inner-page-demo' },
    //{ icon: 'fa-light fa-file-lines', title: 'ESS Wizard Demo', description: ['Ess Wizard Demo'], page: '/admin/ux/apps/ESS-wizard/tab1' },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Error Demo Pages',
      description: ['404 Error Page', '500 Error Page'],
      page: '/admin/ux/apps/error-demo',
      isAccessible: true,
    },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Plan App Demo Pages',
      description: [
        'Plan Mapping Demo',
        'Plan App Demo',
        'Plan Static Demo Pages',
        'Plan of Study Demo',
      ],
      page: '/admin/ux/apps/plan-demos',
      isAccessible: false,
    },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Compliance App Demo Pages',
      description: ['Compliance Document Demo', 'Compliance Summary Grid'],
      page: '/admin/ux/apps/compliance-demos',
      isAccessible: false,
    },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Site App Demo Pages',
      description: ['Site Demo', 'Slot By Site', 'Site Person'],
      page: '/admin/ux/apps/site-demos',
      isAccessible: false,
    },
    // { icon: 'fa-light fa-file-lines', title: 'ESS Wizard Demo', description: ['Ess Wizard Demo'], page: '/admin/ux/apps/ESS-wizard/tab1' },
    {
      icon: 'fa-light fa-file-lines',
      title: 'Session TimeOut Screen',
      description: ['Session TimeOut Screen'],
      page: '/admin/ux/apps/session-timeout',
      isAccessible: true,
    },
  ];

  filtered_zhealthcare_apps_repo_list = new BehaviorSubject<zhealthcare_apps_repo_item[]>(
    new Array<zhealthcare_apps_repo_item>()
  );

  filtered_zhealthcare_apps_repo_list$ =
    this.filtered_zhealthcare_apps_repo_list.asObservable();

  constructor() {
    this.searchByItem = new FormControl(this.listofOptions[0].fieldName);

    this.zhealthcare_apps_repo_list = this.zhealthcare_apps_repo_list.sort((a, b) =>
      a.title > b.title ? 1 : -1
    );

    this.filtered_zhealthcare_apps_repo_list.next(this.zhealthcare_apps_repo_list);

    this.searchItem.valueChanges.subscribe((changes) => {
      if (changes && changes !== null && changes.length > 0) {
        if (
          this._filter(changes, 'title').length > 0 &&
          this._filter(changes, 'description').length > 0
        ) {
          let data = this._filter(changes, 'title').concat(
            this._filter(changes, 'description')
          );

          var unique = data.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
          });

          this.filtered_zhealthcare_apps_repo_list.next(unique);
        } else if (this._filter(changes, 'title').length > 0) {
          this.filtered_zhealthcare_apps_repo_list.next(
            this._filter(changes, 'title')
          );
        } else {
          this.filtered_zhealthcare_apps_repo_list.next(
            this._filter(changes, 'description')
          );
        }
      } else {
        this.filtered_zhealthcare_apps_repo_list.next(this.zhealthcare_apps_repo_list);
      }
    });
  }

  private _filter(value: string, searchItem: string): zhealthcare_apps_repo_item[] {
    const filterValue = value.toLowerCase();

    return this.zhealthcare_apps_repo_list.filter(
      (item) =>
        item[searchItem].toString().toLowerCase().indexOf(filterValue) > -1
    );
  }
}
