import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderService } from '@zhealthcare/ux';

@Component({
  selector: 'ryzen-landing-page-demo',
  templateUrl: './landing-page-demo.component.html',
  styleUrls: ['./landing-page-demo.component.scss'],
})
export class LandingPageDemoComponent implements OnInit, AfterViewInit {
  announcements = [
    {
      title: 'Announcement title ',
      content:
        'Lorem Ipsum is simply dummy textites still in their infancy.Various versions have evolved over the years, sometimes by accident, sometimes on purpose(injected humour and the like).',
      date: 'Oct 21st, 2020 13:00',
    },
    {
      title: 'Announcement title ',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.(injected humour and the like).',
      date: 'Oct 21st, 2020 13:00',
    },
    {
      title: 'Announcement title ',
      content:
        " industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using Lorem Ipsum is that it has a more- or - less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem .",
      date: 'Oct 21st, 2020 13:00',
    },
    {
      title: 'Announcement title ',
      content:
        "'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using Lorem Ipsum is that it has a more- or - less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.Various versions have evolved .",
      date: 'Oct 21st, 2020 13:00',
    },
    {
      title: 'Announcement title ',
      content:
        "s been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using Lorem Ipsum is that it has a more- or - less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.Various versions have evolved over the years, sometimes by accident, sometimes on purpose(injected humour and the like).",
      date: 'Oct 21st, 2020 13:00',
    },
    {
      title: 'Announcement title ',
      content:
        "m Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using Lorem Ipsum is that it has a more- or - less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.Various versions have evolved over the years, sometimes by accident, sometimes on purpose(injected humour and the like).",
      date: 'Oct 21st, 2020 13:00',
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
