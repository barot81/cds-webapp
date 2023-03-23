import { Injectable } from '@angular/core';
import { ComponentMap } from '@exxat/fusion/core';
import { HeaderNotificationDrawerComponent } from './header-notification-drawer/header-notification-drawer.component';
import { UserSettingDrawerComponent } from './user-setting-drawer/user-setting-drawer.component';

@Injectable({providedIn: 'any'})
export class HeaderDrawerService extends ComponentMap {
  constructor() {
    super();
    this.add(
      'exxat-app-header-notification-drawer',
      HeaderNotificationDrawerComponent
    );
    this.add('exxat-user-setting-drawer', UserSettingDrawerComponent);
  }
}
