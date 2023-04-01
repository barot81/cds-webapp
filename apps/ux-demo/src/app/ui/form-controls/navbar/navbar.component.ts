import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navigations = [
    {
      id: 'common-controls',
      title: 'Common Controls',
      type: 'item',
      url: '/admin/ux/ui/form-controls/common-controls',
    },
    {
      id: 'checkbox-radio-validation',
      title: 'Checkbox & Radiobutton Validation',
      type: 'item',
      url: '/admin/ux/ui/form-controls/checkbox-radio-validation',
    },
    {
      id: 'date-time-picker-controls',
      title: 'Date & Time Picker Controls',
      type: 'item',
      url: '/admin/ux/ui/form-controls/date-time-picker-controls',
    },
    {
      id: 'mat-select',
      title: 'Drop Down (Mat Select) List Controls',
      type: 'item',
      url: '/admin/ux/ui/form-controls/mat-select',
    },
  ];
}
