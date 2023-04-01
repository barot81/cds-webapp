import {
  ChangeDetectorRef, Component, EventEmitter, Input,
  OnDestroy, OnInit, Output
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as ClassicEditor from '@exxat/ckeditor5-build-classic';
import {
  FusionFormAdapter, FusionFormComponent
} from '@zhealthcare/fusion/components';
import moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationEmailFormModel } from '../../models/notification-emailform.model';
import { NotifationSandbox, NotificationService } from '../../services';

@Component({
  selector: 'zhealthcare-notification-preview',
  templateUrl: './notification-preview.component.html',
  styleUrls: ['./notification-preview.component.scss']
})
export class NotificationPreviewComponent extends FusionFormComponent
  implements OnInit, FusionFormAdapter, OnDestroy {
  @Input() categoryId;
  @Input() notificationId;
  @Input() emailConfiguration;
  public componentEvents: string[] = [];
  public Editor = ClassicEditor;
  configData: any;
  public isDisabled = true;
  isSend = '1';
  startDate = new Date();
  previewData = '';
  destroy$: Subject<boolean> = new Subject<boolean>();
  templateId: any;
  layoutId: any;
  selectedLayoutBody: string;
  subject: string;
  startDateValidation = true;
  emailtemplate: string;
  emailData: NotificationEmailFormModel;
  selectedLayoutHeader:string;
  selectedLayoutFooter:string;
  @Input() tenantLogoPath: string;
  @Output() sendEmail = new EventEmitter();
  @Output() isPreviewFormChange = new EventEmitter();
  @Output() sendNotification: EventEmitter<any> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private notificationsandbox: NotifationSandbox,
    private notificationserviceemail: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    super();
    this.fusionFormGroup = this.fb.group({
      scheduleType: new FormControl('FireAndForget'),
      scheduleDate: new FormControl('', [])
    });
  }
  primaryAction() {}
  secondaryAction() {}
  panelClose() { }

  ngOnInit() {
    this.sendEmail.emit(true);
    this.notificationserviceemail.notificationData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response) {
          this.emailData = response;
          this.subject = response.subject;
          this.templateId = response.templateId;
        }
      });
    this.notificationserviceemail.templateData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if(response){
          this.subject = response?.subject;
          this.previewData = response?.body;
          this.selectLayout(response.layoutId);
        }
      });
      if (this.data && this.data.edited) {
        this.startDateValidation = false;
      }
    this.fusionFormGroup.get('scheduleType').value ? this.emailData.scheduleType=this.fusionFormGroup.get('scheduleType').value :'';
    this.emailData.scheduleDate = this.fusionFormGroup.get('scheduleDate')
          .value
          ? moment(this.fusionFormGroup.get('scheduleDate').value)
              .utc()
              .format('YYYY-MM-DDTHH:mm:SS')
          : '';
    this.notificationserviceemail.updateData(this.emailData);

    this.fusionFormGroup.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        response.scheduleType == 'Schedule'
          ? this.fusionFormGroup
              .get('scheduleDate')
              .setValidators([Validators.required])
          : this.fusionFormGroup.get('scheduleDate').setValidators(null),
          this.fusionFormGroup.get('scheduleDate').setErrors(null);

        this.isSend = response.scheduleType;
        this.emailData.scheduleDate = this.fusionFormGroup.get('scheduleDate')
          .value
          ? moment(this.fusionFormGroup.get('scheduleDate').value)
              .utc()
              .format('YYYY-MM-DDTHH:mm:SS')
          : '';
        this.emailData.scheduleType = response.scheduleType;
        this.notificationserviceemail.updateData(this.emailData);
        this.cdr.detectChanges();
        if (this.fusionFormGroup.dirty) {
          this.isPreviewFormChange.emit('true');
        }
      });
    this.cdr.detectChanges();

    this.configData = {
          toolbar: {
            items: []
        },
          language: 'en',
          licenseKey: '',
      };
  }

  SendNotification(){
    if(this.fusionFormGroup.valid)
    {

      if(this.emailConfiguration.sendEmailAsInline){
        this.emailData.templateId = 'Inline';
        this.notificationserviceemail.updateData(this.emailData);
      }
      this.sendNotification.emit();
    }
  }

  selectLayout(layoutId) {
      this.layoutId = layoutId;
      this.notificationsandbox.Layout(this.layoutId).subscribe(response => {
        if (response) {
          this.selectedLayoutBody = response['body'];
          const selectedLayout = this.selectedLayoutBody.split("[@TemplateBody@]");
          this.selectedLayoutHeader = selectedLayout[0];
          this.selectedLayoutFooter = selectedLayout[1];
          this.selectedLayoutBody = this.selectedLayoutBody.replace(
            '[@TemplateBody@]',
            this.previewData
          );
          this.selectedLayoutHeader = this.selectedLayoutHeader.replace(
            '[@TenantLogo@]',
            this.tenantLogoPath
          );
        }
      });
  }

  public onReady(event) {

		this.componentEvents.push( 'The editor is ready.' );
	}

	public onChange(event) {
		this.componentEvents.push( 'Editor model changed.' );
    // this.editorValue(event);
	}

	public onFocus(event) {
		this.componentEvents.push( 'Focused the editing view.' );
	}

	public onBlur(event) {
    this.componentEvents.push( 'Blurred the editing view.' );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
