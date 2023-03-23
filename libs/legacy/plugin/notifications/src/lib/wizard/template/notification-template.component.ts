import {
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as ClassicEditor from '@zhealthcare/ckeditor5-build-classic';
import {
  FusionFormAdapter,
  FusionFormComponent
} from '@zhealthcare/fusion/components';
import { SecurityContext } from '@zhealthcare/fusion/models';
import { FileConfiguration } from '@zhealthcare/plugin/file-upload';
import { SnackbarService } from '@zhealthcare/ux';
import { compare } from 'fast-json-patch';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { EmailConfiguration } from '../../models/notification-configuration.model';
import { NotificationEmailFormModel } from '../../models/notification-emailform.model';
import { NotificationEmailSendModel } from '../../models/notification-emailsend.model';
import { NotificationTemplateModel } from '../../models/notification-template.model';
import { StandardTemplate } from '../../models/notification.constant';
import { NotificationFormService } from '../../services/notification.form.service';
import { NotifationSandbox } from '../../services/notification.sandbox';
import { NotificationService } from '../../services/notificaton.service';
import { TemplateConstants } from '../constants';

@Component({
  selector: 'zhealthcare-notification-template',
  templateUrl: './notification-template.component.html',
  styleUrls: ['./notification-template.component.scss'],
})
export class NotificationTemplateComponent
  extends FusionFormComponent
  implements OnInit, FusionFormAdapter, OnDestroy
{
  public componentEvents: string[] = [];
  public Editor = ClassicEditor;
  configData: any;
  config: any;
  public showError = false;
  public isDisabled = true;
  subject = '';
  templates: Array<Record<string, any>>;
  emailtemplate;
  templateId: string;
  layoutId: string;
  @Input() tenantLogoPath: string;
  selectedLayoutBody: string;
  entireTemplate: NotificationTemplateModel;
  @Input()
  categoryId: string;
  @Input()
  emailConfiguration: EmailConfiguration;
  @Input()
  notificationId: string;
  @Input()
  groupId: string;
  @Output()
  isTemplateFormChange = new EventEmitter();
  selectedTemplate: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  emailData: NotificationEmailFormModel;
  templateData: NotificationEmailSendModel[];
  templateSecurityContext: SecurityContext;
  fileConfiguration: FileConfiguration;
  parameters: any;
  selectedLayoutHeader: string;
  selectedLayoutFooter: string;
  showLayout = false;
  layouts: Array<{}>;
  enableTemplateEdit = false;
  templateToEdit: NotificationTemplateModel;
  inlineTemplate: NotificationTemplateModel;
  mentionArray = [];
  tooltipOptions = {
    contentType: 'string',
    placement: 'left',
    trigger: 'hover',
    theme: 'light',
    pointerEvents: 'auto',
  };
  isChecked: boolean;
  Standard: string;
  constructor(
    private fb: FormBuilder,
    private notificationsandbox: NotifationSandbox,
    private notifcationservice: NotificationService,
    public notificationformservice: NotificationFormService,
    private _snackBarService: SnackbarService,
    private cdr: ChangeDetectorRef
  ) {
    super();
    this.fusionFormGroup = this.fb.group({
      subject: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
      layoutId: new FormControl('', [Validators.required]),
      isDefault: new FormControl(false)
    });
  }

  ngOnInit(): void {

    this.Standard = StandardTemplate;
    // Get Inline Template
    this.notificationsandbox
      .Template(
        this.categoryId,
        this.notificationId,
        TemplateConstants.InlineTemplateName
      )
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response) this.inlineTemplate = response;
        else this.createNewInlineTemplate();
      });
    // Get Layouts
    this.notificationsandbox.LayoutList().subscribe((response) => {
      this.layouts = response;
    });
    // Get selected  Template's Parameters
    this.notificationsandbox
      .NotificationCategory(this.categoryId, this.notificationId)
      .subscribe((response) => {
        if (response) {
          this.parameters = response['parameters'].filter((x) => !x.isInternal);
          const itemsToDisplay = this.parameters;
          itemsToDisplay.forEach((element) => {
            element.mentionId = element.displayName.slice(1);
          });
          this.mentionArray = itemsToDisplay;
          this.notifcationservice.updateTemplateParameters(this.parameters);
        }
      });

    this.notifcationservice.notificationData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.emailData = response;
      });

    this.notifcationservice.templateList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.templates = response;
        this.selectStandardTemplateIfPresent(response);
      });

    this.notifcationservice.templateData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response) {
          this.entireTemplate = response;
          this.subject = response['subject'];
          this.emailtemplate = response?.body;
          // this.entireTemplate.body = response?.body;
          this.selectLayout(response['layoutId']);
        }
      });

    this.notifcationservice.updateTemplateList(
      this.categoryId,
      this.notificationId
    );

    this.fusionFormGroup.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.fusionFormGroup.get('subject').value
          ? (this.emailData.subject = this.fusionFormGroup.get('subject').value)
          : '';
        this.fusionFormGroup.get('name').value
          ? (this.emailData.templateId = this.fusionFormGroup.get('name').value)
          : '';

        this.notifcationservice.updateData(this.emailData);
        this.cdr.detectChanges();
        if (this.fusionFormGroup.dirty) {
          this.isTemplateFormChange.emit('true');
        }
      });
    this.configData = {
      toolbar: {
        items: [],
      },
      language: 'en',
      licenseKey: '',
    };

    this.config = {
      mention: {
        feeds: [
          {
            marker: '@',
            feed: getFeedItems,
          },
        ],
      },
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          'alignment',
          'link',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'fontColor',
          'fontSize',
          '|',
          'outdent',
          'indent',
          '|',
          'blockQuote',
          '|',
          'undo',
          'redo',
        ],
        viewportTopOffset: 30,
        shouldNotGroupWhenFull: false,
      },
      fontSize: {
        options: [9, 11, 13, 'default', 17, 19, 21],
      },
      language: 'en',
      licenseKey: '',
    };
    const _this = this;
    function getFeedItems(queryText: any) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const itemsToDisplay = _this.parameters;
          itemsToDisplay.forEach((element) => {
            element.id = element.displayName;
          });
          resolve(itemsToDisplay);
        }, 100);
      });
    }
  }
  createNewInlineTemplate() {
    const newInlineTemplate = new NotificationTemplateModel();
    newInlineTemplate.name = TemplateConstants.InlineTemplateName;
    newInlineTemplate.categoryId = this.categoryId;
    newInlineTemplate.notificationId = this.notificationId;
    newInlineTemplate.body = '';
    newInlineTemplate.subject = TemplateConstants.InlineTemplateName;
    newInlineTemplate.layoutId = '';
    this.notificationsandbox
      .addTemplate(newInlineTemplate)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.inlineTemplate = resp;
      });
  }

  primaryAction() {}
  secondaryAction() {}

  selectStandardTemplateIfPresent(response) {
    this.fusionFormGroup.get('name').setValue(this.templates.find(x => x.isDefault)?.name ?? this.templates.find(x => x.name === this.Standard)?.name ?? this.templates[0]?.name);
    this.selectTemplate(this.fusionFormGroup.get('name').value);
  }

  selectLayout(layoutId) {
    this.layoutId = layoutId;
    this.notificationsandbox.Layout(this.layoutId).subscribe((response) => {
      if (response) {
        this.selectedLayoutBody = response['body'];
        const selectedLayout =
          this.selectedLayoutBody.split('[@TemplateBody@]');
        this.selectedLayoutHeader = selectedLayout[0];
        this.selectedLayoutFooter = selectedLayout[1];
        this.replaceTemplateBodyAndLogo();
      }
      this.cdr.detectChanges();
    });
  }

  replaceTemplateBodyAndLogo() {
    this.selectedLayoutBody = this.selectedLayoutBody.replace(
      '[@TemplateBody@]',
      this.emailtemplate
    );
    this.selectedLayoutHeader = this.selectedLayoutHeader.replace(
      '[@TenantLogo@]',
      this.tenantLogoPath
    );
  }
  selectTemplate(templateId) {
    if (this.templateId !== templateId) {
      this.templateId = templateId;
      this.notificationsandbox
        .Template(this.categoryId, this.notificationId, templateId)
        .subscribe((response) => {
          if (response) {
            this.entireTemplate = response;
            this.templateToEdit = response;
            this.selectedTemplate = response['name'];
            this.emailtemplate = this.notifcationservice.replaceParameters(
              response?.body,
              this.parameters
            );

            this.subject = this.notifcationservice.replaceParameters(
              response?.subject,
              this.parameters
            );
            this.fusionFormGroup.get('subject').setValue(this.subject);
            this.layoutId = response['layoutId'];
            this.fusionFormGroup.get('layoutId').setValue(this.layoutId);
            this.isChecked = response.isDefault;
            this.entireTemplate.body = this.emailtemplate;
            this.entireTemplate.subject = this.subject;
            this.selectLayout(this.layoutId);

            this.notifcationservice.updateTemplateData(this.entireTemplate);
            this.cdr.detectChanges();
          }
          this.cdr.detectChanges();
        });
    }
  }

  enableEdit() {
    this.enableTemplateEdit = true;
    this.emailConfiguration.sendEmailAsInline = true;
    this.isDisabled = false;
    this.fusionFormGroup.addControl(
      'body',
      new FormControl([Validators.required])
    );
    this.fusionFormGroup.get('body').setValue(this.entireTemplate?.body);
  }

  addValidation() {
    if (this.templateId != this.fusionFormGroup.get('name').value)
      this.fusionFormGroup
        .get('name')
        .setValidators([
          Validators.required,
          Validators.maxLength(500),
          this.notifcationservice.templateIdValidator(this.templates),
        ]);
    else
      this.fusionFormGroup
        .get('name')
        .setValidators([Validators.required, Validators.maxLength(500)]);

    this.fusionFormGroup.get('name').updateValueAndValidity();
  }

  inlineEmailCheck() {
    if (this.emailConfiguration.sendEmailAsInline) {
      // this.templateId = "";
      // this.layoutId = "";
      this.emailConfiguration.showScheduleType = false;
      this.templateToEdit = this.fusionFormGroup.value;
      this.templateToEdit.name = this.inlineTemplate.name;
      this.templateToEdit.body = this.parseAndReplaceParameters(
        this.templateToEdit.body
      );
      this.templateToEdit.subject = this.parseAndReplaceParameters(
        this.templateToEdit.subject
      );
      const patch = compare(this.inlineTemplate, {
        ...this.inlineTemplate,
        ...this.templateToEdit,
      });

      this.notificationsandbox
        .editTemplate(
          this.categoryId,
          this.notificationId,
          this.inlineTemplate.name,
          patch
        )
        .subscribe(
          (response) => {
            response.body = this.notifcationservice.replaceParameters(
              response?.body,
              this.parameters
            );
            response.subject = this.notifcationservice.replaceParameters(
              response?.subject,
              this.parameters
            );
            this.inlineTemplate = response;
            this.notifcationservice.updateTemplateData(response);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  cancelEdit() {
    this.fusionFormGroup
      .get('name')
      .setValidators([Validators.required, Validators.maxLength(500)]);
    this.fusionFormGroup.get('name').updateValueAndValidity();
    this.fusionFormGroup.get('name').setValue(this.templateId);
    this.enableTemplateEdit = false;
    this.emailConfiguration.sendEmailAsInline = false;
    this.isDisabled = true;
    if (this.templateId == this.entireTemplate.name) {
      const formgroupValues = {
        name: this.entireTemplate.name,
        body: this.entireTemplate.body,
        subject: this.entireTemplate.subject,
        layoutId: this.entireTemplate.layoutId,
        isDefault: this.entireTemplate.isDefault
      };
      this.fusionFormGroup.setValue(formgroupValues);
      if (this.layoutId !== this.entireTemplate.layoutId)
        this.selectLayout(this.entireTemplate.layoutId);
    } else {
      const name = this.templateId;
      this.templateId = '';
      this.selectTemplate(name);
    }
  }

  makeTemplateDefaultAPI() {
    const patch = [{op:"replace",path:"/isDefault",value:true}]
    this.isChecked = true;
    this.notificationsandbox
              .editTemplate(
                this.categoryId,
                this.notificationId,
                this.templateId,
                patch
              )
              .subscribe({
                next: (response) => {
                  response.body = this.notifcationservice.replaceParameters(
                    response?.body,
                    this.parameters
                  );
                  response.subject = this.notifcationservice.replaceParameters(
                    response?.subject,
                    this.parameters
                  );
                  this.notifcationservice.updateTemplateList(
                    this.categoryId,
                    this.notificationId
                  );
                  this.notifcationservice.updateTemplateData(response);
                  this._snackBarService.openCustomSnackBar(
                    { message: 'Default Template is changed Successfully!' },
                    5000
                  );
                },
                error: (error) => {
                  this._snackBarService.openCustomSnackBar(
                    { message: 'Default Template is not Changed!' },
                    5000
                  );
                }
              }
              );
  }

  editTemplate() {
    this.enableTemplateEdit = false;
    this.emailConfiguration.sendEmailAsInline = false;
    this.isDisabled = true;
    if (this.templateId != this.entireTemplate.name) {
      //this will update same template which user selected to edit & not Inline
      const changesInTemplate = this.templateToEdit;
      changesInTemplate.name = this.fusionFormGroup.get('name').value;
      changesInTemplate.subject = this.parseAndReplaceParameters(
        this.fusionFormGroup.get('subject').value
      );
      changesInTemplate.isDefault = this.isChecked;
      this.notificationsandbox
        .Template(this.categoryId, this.notificationId, this.templateId)
        .subscribe((response) => {
          if (response) {
            const patch = compare(response, {
              ...response,
              ...changesInTemplate,
            });

            this.notificationsandbox
              .editTemplate(
                this.categoryId,
                this.notificationId,
                this.templateId,
                patch
              )
              .subscribe(
                (response) => {
                  response.body = this.notifcationservice.replaceParameters(
                    response?.body,
                    this.parameters
                  );
                  response.subject = this.notifcationservice.replaceParameters(
                    response?.subject,
                    this.parameters
                  );
                  this.notifcationservice.updateTemplateList(
                    this.categoryId,
                    this.notificationId
                  );
                  this.notifcationservice.updateTemplateData(response);
                  this._snackBarService.openCustomSnackBar(
                    { message: 'Edit Template Successful!' },
                    5000
                  );
                },
                (error) => {
                  this._snackBarService.openCustomSnackBar(
                    { message: 'Edit Template Unsuccessful!' },
                    5000
                  );
                }
              );
          }
        });
    } else {
      this.fusionFormGroup
        .get('body')
        .setValue(this.parseAndReplaceParameters(this.templateToEdit.body));
      this.fusionFormGroup
        .get('subject')
        .setValue(
          this.parseAndReplaceParameters(
            this.fusionFormGroup.get('subject').value
          )
        );

      const patch = compare(this.entireTemplate, {
        ...this.entireTemplate,
        ...this.fusionFormGroup.value,
      });

      this.notificationsandbox
        .editTemplate(
          this.categoryId,
          this.notificationId,
          this.entireTemplate.name,
          patch
        )
        .subscribe(
          (response) => {
            response.body = this.notifcationservice.replaceParameters(
              response?.body,
              this.parameters
            );
            response.subject = this.notifcationservice.replaceParameters(
              response?.subject,
              this.parameters
            );
            this.notifcationservice.updateTemplateList(
              this.categoryId,
              this.notificationId
            );
            this.notifcationservice.updateTemplateData(response);
            this._snackBarService.openCustomSnackBar(
              { message: 'Edit Template Successful!' },
              5000
            );
          },
          (error) => {
            this._snackBarService.openCustomSnackBar(
              { message: 'Edit Template Unsuccessful!' },
              5000
            );
          }
        );
    }
  }

  parseAndReplaceParameters(body: string) {
    for (const parameter of this.parameters) {
      body = body.split(parameter.displayName).join(parameter.name);
    }
    return body;
  }

  public onReady(event) {
    this.componentEvents.push('The editor is ready.');
  }

  public onChange(event) {
    this.componentEvents.push('Editor model changed.');
    this.editorValue(event);
  }

  public onFocus(event) {
    this.componentEvents.push('Focused the editing view.');
  }

  public onBlur(event) {
    this.componentEvents.push('Blurred the editing view.');
  }

  public editorValue(event) {
    this.templateToEdit.body = event.editor.getData();
    this.templateToEdit.body = this.templateToEdit.body.replace(
      /data-mention[^>]*/g,
      ''
    );
    this.templateToEdit.body = this.templateToEdit.body.replace(
      /\\(?=[^\[\]]*\])|\\(?=\[)/g,
      ''
    ); // (\\) this is to remove \ appended by ckeditor before brackets []
    this.fusionFormGroup.get('body')?.setValue(this.templateToEdit.body);
    if (event.editor.getData() == '') this.showError = true;
    else this.showError = false;
  }

  panelClose() {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
