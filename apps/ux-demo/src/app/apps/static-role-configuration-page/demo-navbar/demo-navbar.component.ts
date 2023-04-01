import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-demo-navbar',
  templateUrl: './demo-navbar.component.html',
})
export class DemoNavbarComponent implements OnInit {

  navigations = [
    {
      id: 'role-info',
      title: 'Role info',
      type: 'item',
      url: '/admin/ux/apps/static-role-configuration-page/role-info'
    },
    {
      id: 'student-info',
      title: 'Student Info',
      type: 'item',
      url: '/admin/ux/apps/static-role-configuration-page/student-info'
    },
    {
      id: 'compliance',
      title: 'Clinical Personal',
      type: 'item',
      url: '/admin/ux/apps/static-role-configuration-page/Compliance'
    },
    
    {
      id: 'site',
      title: 'Site',
      type: 'item',
      url: '/admin/ux/apps/static-role-configuration-page/site'
    },
    {
      id: 'placements',
      title: 'Placements',
      type: 'item',
      url: '/admin/ux/apps/static-role-configuration-page/placements'
    },
    {
      id: 'configuration',
      title: 'Configuration',
      type: 'item',
      url: '/admin/ux/apps/static-role-configuration-page/configuration'
    },
    {
      id: 'learning-activity',
      title: 'Learning Activity',
      type: 'item',
      url: '/admin/ux/apps/static-role-configuration-page/learning-activity'
    },
    {
      id: 'cohort-setup',
      title: 'Cohort Setup',
      type: 'item',
      url: '/admin/ux/apps/static-role-configuration-page/cohort-setup'
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
