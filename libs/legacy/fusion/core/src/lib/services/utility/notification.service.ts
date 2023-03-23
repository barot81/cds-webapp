import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { FusionConfigService } from '../../configuration/fusion-config.service';

@Injectable({providedIn: 'any'})
export class NotificationService {
  constructor(
    private fusionconfigService: FusionConfigService,
    private notificationService: NotificationsService,
  ) {

  }

  public displayNotification(messageTranslationCode: any, type: string = 'error', titleTranslationCode?: string) {
    // this.translateService.get(messageTranslationCode).subscribe((resp: string) => {
      let messageTitle = titleTranslationCode;
      const message: string = messageTranslationCode;
       let title: string = null; // titleTranslationCode ? this.translateService.instant(titleTranslationCode) : null;

      switch (type) {
        case 'error':
          title =  "Error"; // this.translateService.instant('ErrorNotificationTitle');
          break;

        case 'success':
          title = "Success";// this.translateService.instant('SuccessNotificationTitle');
          break;

        case 'alert':
          title = "Warning"; // this.translateService.instant('WarningNotificationTitle');
          break;

        default:
          title = "Info"; // this.translateService.instant('InfoNotificationTitle');
          break;
      }
      if((this.fusionconfigService.appSettings.notifications.toasterEnable && messageTranslationCode.ShowItAsToaster) || (this.fusionconfigService.appSettings.notifications.toasterEnable && messageTranslationCode.showItAsToaster))
      {
          this.notificationService[type.toLowerCase()](messageTitle, messageTranslationCode.statusText, this.fusionconfigService.appSettings.notifications.options);
      }
  }

  public showError(messageTitle, statusText, options) {
    this.notificationService['error'](messageTitle, statusText, options);

  }
}
