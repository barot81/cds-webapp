import { Component, OnInit } from '@angular/core';

export interface ButtonToggle {
  value: string;
  icon?: string;
  label: string;
}

@Component({
  selector: 'ryzen-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
})
export class ButtonToggleComponent implements OnInit {
  buttonList: Array<ButtonToggle> = [
    {
      value: 'Card View',
      label: 'Card view',
      icon: 'fa-light fa-bring-forward',
    },
    { value: 'Grid View', label: 'Grid view', icon: 'fa-light fa-th' },
  ];

  buttonList2: Array<ButtonToggle> = [
    { value: 'Student', label: 'Student' },
    { value: 'Site', label: 'Site' },
    { value: 'Preceptor', label: 'Preceptor' },
  ];

  constructor() {}

  ngOnInit() {}
}
