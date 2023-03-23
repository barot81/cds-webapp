import { Injectable } from '@angular/core';
import { ComponentMap } from '@zhealthcare/fusion/core';
import { HeaderNotificationDrawerComponent } from './header-notification-drawer/header-notification-drawer.component';
import { UserSettingDrawerComponent } from './user-setting-drawer/user-setting-drawer.component';

@Injectable({providedIn: 'any'})
export class HeaderDrawerService extends ComponentMap {
  constructor() {
    super();
    this.add(
      'zhealthcare-app-header-notification-drawer',
      HeaderNotificationDrawerComponent
    );
    this.add('zhealthcare-user-setting-drawer', UserSettingDrawerComponent);
  }
}
