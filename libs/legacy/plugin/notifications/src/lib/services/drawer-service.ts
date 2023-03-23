import { Injectable, OnInit } from '@angular/core';
import { ComponentMap } from '@exxat/fusion/core';
import { NotificationLogPreviewComponent } from "../log/preview/notification-log-preview.component";

@Injectable({providedIn: 'any'})
export class DrawerService extends ComponentMap {

  constructor() {
    super();
    this.add('notification-log-preview',NotificationLogPreviewComponent );

  }
}
