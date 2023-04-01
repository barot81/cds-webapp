import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExxatDrawerFormService } from '../../../ui/exxat-drawers/exxat-drawer-forms-shared.service';

export interface ButtonToggle {
  value: string;
  icon?: string;
  label: string;
}

@Component({
  selector: 'ryzen-course-catalog-demo',
  templateUrl: './course-catalog-demo.component.html',
})
export class CourseCatalogDemoComponent implements OnInit {

  navigations = [
    // {
    //   id: 'courses',
    //   title: 'Courses',
    //   type: 'item',
    //   url: '/admin/ux/apps/plan-app-demo-1'
    // },
    // {
    //   id: 'courses_offering',
    //   title: 'Courses offering',
    //   type: 'item',
    //   url: '/admin/ux/apps/plan-app-demo'

    // },
    {
      id: 'courses_catalog',
      title: 'Courses catalog',
      type: 'item',
      url: '/admin/ux/apps/course-catalog-demo'
    },
    {
      id: 'student_registration',
      title: 'Student registration',
      type: 'item',
      url: '/admin/ux/apps/plan-app-demo-3'
    }
  ]

  cohortControl = new FormControl();

  cohorts = [
    { value: "Class 2020 Class 2020 Class 2020 Class 2020", viewValue: "Class 2020 Class 2020 Class 2020 Class 2020" },
    { value: "Class 2021", viewValue: "Class 2021" },
    { value: "Class 2022", viewValue: "Class 2022" },
  ];
  

  constructor(public _ExxatDrawerFormService: ExxatDrawerFormService) { }

  ngOnInit() {
  }

}
