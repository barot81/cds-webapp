import { Injectable, OnInit } from '@angular/core';
import { ComponentMap } from '@exxat/fusion/core';

import { WizardComponent } from '../wizard/navigation-wizard.component';
import { NotificationLogComponent } from '../log/notification-log.component';


@Injectable({providedIn: 'any'})
export class NotificationService extends ComponentMap {

  constructor() {
    super();
    this.add('notificationstepper', WizardComponent);
    this.add('notificationlog', NotificationLogComponent);

  }
}
