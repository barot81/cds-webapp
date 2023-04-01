import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderService } from '@exxat/ux';

@Component({
  selector: 'ryzen-public-website-app',
  templateUrl: './public-website-app.component.html',
  styleUrls: ['./public-website-app.component.scss'],
})
export class PublicWebsiteAppComponent implements OnInit, AfterViewInit {
  announcements = [
    {
      title: 'Test rru',
      content:
        'Lorem Ipsum is simply dummy text of the printnting and typeseting and typesetting industry Lorem Ipsum is simply dummy text of the printnting and typeseting and typesetting industry. ).',
    },
    {
      title: 'Test  announcement',
      content:
        'Lorem Ipsum is simply dummy text of the printnting and typeseting and typesetting industry Lorem Ipsum is simply dummy text of the printnting and typeseting and typesetting industry. ).',
    },
    {
      title: 'Test 2 announcement',
      content:
        'Lorem Ipsum is simply dummy text of the printnting and typeseting and typesetting industry Lorem Ipsum is simply dummy text of the printnting and typeseting and typesetting industry. ).',
    },
    {
      title: 'DPT announcement for public website',
      content:
        'Lorem Ipsum is simply dummy text of the printnting and typeseting and typesetting industry Lorem Ipsum is simply dummy text of the printnting and typeseting and typesetting industry. ).',
    },
    {
      title: 'Test 3 announcement',
      content:
        'Lorem Ipsum is simply dummy text of the printnting and typeseting and typesetting industry Lorem Ipsum is simply dummy text of the printnting and typeseting and typesetting industry. ).',
    },
    {
      title: 'Test 4 announcement',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesettin Lorem Ipsum is simply dummy text of the printing and typesettinng industry. ).',
    },
  ];

  dashboardContentList = [
    {
      icon: 'fas fa-graduation-cap',
      title: 'Experiential Education Schedule',
      url: '/public/clinicalcource',
      description: 'Experiential Education Schedule',
    },
    {
      icon: 'fas fa-book-reader',
      title: 'Resources',
      url: '/public/resource',
      description:
        'Review content provided by your school to help you along the way.',
    },
    {
      icon: 'fa-light fa-chalkboard-teacher',
      title: 'School Contact',
      url: '/public/schoolcontact',
      description:
        'Learn how to reach the faculty and staff at your school who play a role in your clinical education.',
    },
  ];

  constructor(public _headerService: HeaderService) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this._headerService.setCurrentHeaderHeight(0);
    });
  }

  ngOnInit() {}
}
