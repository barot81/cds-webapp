import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AuthSandbox, OucodeHelper } from '@zhealthcare/fusion/core';
import { EmailConfiguration } from '../models/notification-configuration.model';
import { NotificationService } from '../services/notificaton.service';
import { NotificationPreviewComponent } from './preview/notification-preview.component';
import { NotificationRecipientListComponent } from './recipient-list/notification-recipient-list.component';
import { NotificationTemplateComponent } from './template/notification-template.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'notification-wizard',
  templateUrl: './notification-wizard.component.html',
})
export class NotificationWizardComponent implements OnInit, OnDestroy {
  isDone = false;
  @Input() emailConfiguration: EmailConfiguration;
  @Input() disableSelectorRecipients = false;
  @Input() disableRecipientsComponent = false;
  @Input() displayCountButton = false;
  @Input() recipientCount: number;

  @Input() categoryId: string;
  @Input() notificationId: string;
  @Input() groupId: string;
  @Output() triggerStep = new EventEmitter();
  @Output() isFormChange = new EventEmitter();
  stepsCompleted = false;

  @ViewChild(NotificationRecipientListComponent)
  stepRecipientListComponent: NotificationRecipientListComponent;
  @ViewChild(NotificationTemplateComponent)
  stepTemplateComponent: NotificationTemplateComponent;
  @ViewChild(NotificationPreviewComponent)
  stepPreviewComponent: NotificationPreviewComponent;
  tenantLogoPath: string;

  get recipientListFormStep() {
    return this.stepRecipientListComponent
      ? this.stepRecipientListComponent.fusionFormGroup
      : null;
  }

  get templateFormStep() {
    return this.stepTemplateComponent
      ? this.stepTemplateComponent.fusionFormGroup
      : null;
  }

  get previewFormStep() {
    return this.stepPreviewComponent
      ? this.stepPreviewComponent.fusionFormGroup
      : null;
  }

  constructor(
    public notificationService: NotificationService,
    private cdr: ChangeDetectorRef,
    private _authSandbox: AuthSandbox
  ) {}

  ngOnInit(): void {
    const tanentId = localStorage.getItem('TenantId');
    const oucodes = JSON.parse(localStorage.getItem('Oucodes'));
    const oucodeIds = OucodeHelper.getOucodeList([], oucodes, true);
    if (oucodeIds.length > 1) {
      this._authSandbox
        .getOrganization('Org.' + tanentId)
        .subscribe((result) => {
          this.tenantLogoPath = result.logoPath;
        });
    } else {
      this._authSandbox
        .getOrgUnitInfo(oucodeIds.slice(0, 1))
        .subscribe((result) => {
          if (
            result?.length === 0 ||
            result[0] === undefined ||
            result[0] === null ||
            result[0].logoPath === '' ||
            result[0].logoPath === null ||
            result[0].logoPath === undefined
          ) {
            this._authSandbox
              .getOrganization('Org.' + tanentId)
              .subscribe((response) => {
                this.tenantLogoPath = response.logoPath;
              });
          } else {
            this.tenantLogoPath = result[0].logoPath;
          }
        });
    }
    // this._authSandbox
    //   .getOrganization(localStorage.getItem('TenantId'))
    //   .subscribe(resp => {
    //     this.tenantLogoPath = resp?.logoPath;
    //   });
  }

  confirmNotification(event) {
    this.isDone = event;
    this.cdr.detectChanges();
    if (event) {
      this.stepsCompleted = true;
    } else {
      this.stepsCompleted = false;
    }
  }

  sendNotification() {
    if (this.stepsCompleted) {
      this.notificationService.updateEmailStatus(true);
      this.triggerStep.emit('3');
    } else {
      this.notificationService.updateEmailStatus(false);
    }
  }

  formChangedEvent(event) {
    this.isFormChange.emit(event);
  }

  ngOnDestroy() {
    this.notificationService.updateEmailStatus(false);
    this.notificationService.templateData.next(null);
  }
}
