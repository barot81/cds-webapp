import { Component, OnInit } from '@angular/core';
import { FuseSidebarService, HeaderService } from '@exxat/ux';

import { ButtonToggle } from '../../../placement-by-rotation/placement-by-rotation.component';

@Component({
  selector: 'ryzen-patientlog-statistics',
  templateUrl: './patientlog-statistics.component.html',
})
export class PatientlogStatisticsComponent implements OnInit {
  studentList = [
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/anna-strong.png',
      plCount: '2',
    },
    {
      firstName: 'Rough',
      lastName: 'Strong',
      src: 'assets/images/avatars/alice.jpg',
      plCount: '3',
    },
    {
      firstName: 'Lanna',
      lastName: 'Neil',
      src: 'assets/images/avatars/Barrera.jpg',
      plCount: '40',
    },
    {
      firstName: 'Sanna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Blair.jpg',
      plCount: '5',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
    {
      firstName: 'Anna',
      lastName: 'Strong',
      src: 'assets/images/avatars/Boyle.jpg',
      plCount: '10',
    },
  ];

  buttonList: Array<ButtonToggle> = [
    { value: 'Setting', label: 'Setting', icon: '' },
    { value: 'Rotations', label: 'Rotations', icon: '' },
  ];

  constructor(
    private _fuseSidebarService: FuseSidebarService,
    public headerService: HeaderService
  ) {}

  ngOnInit() {}

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
}
