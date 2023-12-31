import { Component } from '@angular/core';

@Component({
  selector: 'zhealthcare-tab-navbar',
  templateUrl: 'navbar.component.html',
})
export class TabnavBarComponent {
  navigations = [
    {
      id: 'academic-info',
      title: 'Tab 1',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-layout-scroll',
    },
    {
      id: 'student-info',
      title: 'Tab 2',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-component-library/tab2',
    },
    {
      id: 'contact-info',
      title: 'Tab 3',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-component-library/tab3',
    },
    {
      id: 'share-profille',
      title: 'Tab 4',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-component-library/tab4',
    },
    {
      id: 'compliance',
      title: 'Tab 5',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-component-library/tab5',
    },
    {
      id: 'communications',
      title: 'Tab 6',
      type: 'item',
      url: '/admin/ux/ui/zhealthcare-component-library/tab6',
    },
  ];
}
