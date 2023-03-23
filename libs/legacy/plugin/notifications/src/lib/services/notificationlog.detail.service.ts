import { Injectable, OnInit } from '@angular/core';
import { ComponentMap } from '@zhealthcare/fusion/core';
import { NotificationlogDetailComponent } from '../log/detail/notification-detail.component';




@Injectable({providedIn: 'any'})
export class NotificationLogDetailService extends ComponentMap {

  constructor() {
    super();
    this.add('notificationlogdetail', NotificationlogDetailComponent);

  }
}
