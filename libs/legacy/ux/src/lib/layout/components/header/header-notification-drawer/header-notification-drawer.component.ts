import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zhealthcare-app-header-notification-drawer',
  templateUrl: './header-notification-drawer.component.html',
})
export class HeaderNotificationDrawerComponent implements OnInit {
  data: any;
  scheduledDowntimes: any;

  constructor() { }

  ngOnInit() {
    if (this.data)
      this.scheduledDowntimes = this.data;
  }

}
