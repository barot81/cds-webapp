import { Component, OnInit } from '@angular/core';
import { HeaderService, FuseSidebarService } from '@exxat/ux';

@Component({
  selector: 'ryzen-patientlog-review',
  templateUrl: './patientlog-review.component.html',
})
export class PatientlogReviewComponent implements OnInit {

  studentList = [
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/anna-strong.png', plCount: '2' },
    { firstName: 'Rough', lastName: 'Strong', src: 'assets/images/avatars/alice.jpg', plCount: '3' },
    { firstName: 'Lanna', lastName: 'Neil', src: 'assets/images/avatars/Barrera.jpg', plCount: '40' },
    { firstName: 'Sanna', lastName: 'Strong', src: 'assets/images/avatars/Blair.jpg', plCount: '5' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },
    { firstName: 'Anna', lastName: 'Strong', src: 'assets/images/avatars/Boyle.jpg', plCount: '10' },

  ];

  plList = [
    { date: 'March 30, 2020', status: 'Progress', color: 'inprogress', content1: 'This is demo patientlog.', content2: 'Log is in under progress.' },
    { date: 'April 30, 2020', status: 'Reviewed', color: 'approved', content1: 'This is demo patientlog.', content2: 'Log is Reviewed.' },
    { date: 'May 30, 2020', status: 'Filled', color: 'pending', content1: 'This is demo patientlog.', content2: 'Log is Filled.' },
    { date: 'June 30, 2020', status: 'Progess', color: 'inprogress', content1: 'This is demo patientlog.', content2: 'Log is in under progress.' },
    { date: 'July 30, 2020', status: 'Reviewed', color: 'approved', content1: 'This is demo patientlog.', content2: 'Log is Reviewed.' },
    { date: 'March 30, 2020', status: 'Progress', color: 'inprogress', content1: 'This is demo patientlog.', content2: 'Log is in under progress.' },
    { date: 'April 30, 2020', status: 'Reviewed', color: 'approved', content1: 'This is demo patientlog.', content2: 'Log is Reviewed.' },
    { date: 'May 30, 2020', status: 'Filled', color: 'pending', content1: 'This is demo patientlog.', content2: 'Log is Filled.' },
    { date: 'June 30, 2020', status: 'Progess', color: 'inprogress', content1: 'This is demo patientlog.', content2: 'Log is in under progress.' },
    { date: 'July 30, 2020', status: 'Reviewed', color: 'approved', content1: 'This is demo patientlog.', content2: 'Log is Reviewed.' },
    { date: 'March 30, 2020', status: 'Progress', color: 'inprogress', content1: 'This is demo patientlog.', content2: 'Log is in under progress.' },
    { date: 'April 30, 2020', status: 'Reviewed', color: 'approved', content1: 'This is demo patientlog.', content2: 'Log is Reviewed.' },
    { date: 'May 30, 2020', status: 'Filled', color: 'pending', content1: 'This is demo patientlog.', content2: 'Log is Filled.' },
    { date: 'June 30, 2020', status: 'Progess', color: 'inprogress', content1: 'This is demo patientlog.', content2: 'Log is in under progress.' },
    { date: 'July 30, 2020', status: 'Reviewed', color: 'approved', content1: 'This is demo patientlog.', content2: 'Log is Reviewed.' },
    { date: 'March 30, 2020', status: 'Progress', color: 'inprogress', content1: 'This is demo patientlog.', content2: 'Log is in under progress.' },
    { date: 'April 30, 2020', status: 'Reviewed', color: 'approved', content1: 'This is demo patientlog.', content2: 'Log is Reviewed.' },
    { date: 'May 30, 2020', status: 'Filled', color: 'pending', content1: 'This is demo patientlog.', content2: 'Log is Filled.' },
    { date: 'June 30, 2020', status: 'Progess', color: 'inprogress', content1: 'This is demo patientlog.', content2: 'Log is in under progress.' },
    { date: 'July 30, 2020', status: 'Reviewed', color: 'approved', content1: 'This is demo patientlog.', content2: 'Log is Reviewed.' }

  ]

  constructor(private _fuseSidebarService: FuseSidebarService, public headerService: HeaderService) { }

  ngOnInit() {
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

}
