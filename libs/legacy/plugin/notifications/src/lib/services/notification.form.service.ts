import { Injectable, OnInit } from '@angular/core';
import { ComponentMap } from '@exxat/fusion/core';
import { NotificationTemplateEditComponent } from '../wizard/template/edit/notification-template-edit.component';




@Injectable({providedIn: 'any'})
export class NotificationFormService extends ComponentMap {

  constructor() {
    super();
    this.add('template', NotificationTemplateEditComponent);

  }
}
