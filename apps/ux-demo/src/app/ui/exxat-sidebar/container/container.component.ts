import { Component } from '@angular/core';

export interface repo_item {
  title: string;
  icon: string;
  description?: string;
  page?: string;
  isAccessible?: boolean;
  isThemeChanged?: boolean;
  isUxApproved?: boolean;
}

@Component({
  selector: 'sidebar-container',
  templateUrl: './container.component.html',
})
export class SidebarContainerComponent {

  items: repo_item[] = [
    {
      icon: 'fa-light fa-sidebar',
      title: 'Sidebar One',
      description: 'Sidebar with Avatar List Item and has 20% width',
      page: '/admin/ux/ui/exxat-sidebar/sidebar-one',
      isAccessible: false,
      isThemeChanged: false,
      isUxApproved: false,
    },
    {
      icon: 'fa-light fa-sidebar',
      title: 'Sidebar Two',
      description: 'Sidebar with Tree Control and has 30% width',
      page: '/admin/ux/ui/exxat-sidebar/sidebar-two',
      isAccessible: false,
      isThemeChanged: false,
      isUxApproved: false,
    },   
    {
      icon: 'fa-light fa-sidebar',
      title: 'Sidebar Three',
      description: 'Sidebar with collapse and has 240px width',
      page: '/admin/ux/ui/exxat-sidebar/sidebar-three',
      isAccessible: false,
      isThemeChanged: false,
      isUxApproved: false,
    },   
    {
      icon: 'fa-light fa-sidebar',
      title: 'Sidebar Four',
      description: 'Sidebar with secondary description and has 20% width',
      page: '/admin/ux/ui/exxat-sidebar/sidebar-four',
      isAccessible: false,
      isThemeChanged: false,
      isUxApproved: false,
    },   
    {
      icon: 'fa-light fa-sidebar',
      title: 'Sidebar Five',
      description: 'Sidebar with status badge and has 20% width',
      page: '/admin/ux/ui/exxat-sidebar/sidebar-five',
      isAccessible: false,
      isThemeChanged: false,
      isUxApproved: false,
    },   
    {
      icon: 'fa-light fa-sidebar',
      title: 'Sidebar Six',
      description: 'Sidebar with Action Item and has 20% width',
      page: '/admin/ux/ui/exxat-sidebar/sidebar-six',
      isAccessible: false,
      isThemeChanged: false,
      isUxApproved: false
    }  
  ];

}
