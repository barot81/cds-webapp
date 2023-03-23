import { NgModule } from '@angular/core';
import { NotificationService } from '../services/notificaton.service';
import { NotifationSandbox } from '../services/notification.sandbox';
import { NotificationApiClient } from '../services/notofication.ApiClient';
import { NotificationFormService } from '../services/notification.form.service';



@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [ NotifationSandbox,NotificationApiClient,NotificationService,NotificationFormService],
})
export class NotificationServicesModule { }
