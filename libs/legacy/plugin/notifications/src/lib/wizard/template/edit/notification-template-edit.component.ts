import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as ClassicEditor from '@exxat/ckeditor5-build-classic';
import {
  FusionFormAdapter, FusionFormComponent
} from '@exxat/fusion/components';
import { ManifoldPanelService, SnackbarService } from '@exxat/ux';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationTemplateModel } from '../../../models/notification-template.model';
import { NotifationSandbox } from '../../../services/notification.sandbox';
import { NotificationService } from '../../../services/notificaton.service';
@Component({
  selector: 'exxat-notification-template-edit',
  templateUrl: './notification-template-edit.component.html',
  styleUrls: ['./notification-template-edit.component.scss']
})
export class NotificationTemplateEditComponent
  extends FusionFormComponent
  implements OnInit, FusionFormAdapter, OnDestroy
{
  public isDisabled = false;
  public showError = false;
  public componentEvents: string[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  configData: any;
  key: string;
  templateData: NotificationTemplateModel;
  parameters: any;
  notificationTemplateModel: NotificationTemplateModel;
  layouts: Array<{}>;
  tenantLogoPath: string;
  selectedLayoutId: string;
  selectedLayoutHeader: string;
  selectedLayoutFooter: string;
  selectedLayout: string;
  notificationId: string;
  categoryId: string;
  public Editor = ClassicEditor;
  templateIdList: Array<{}>;
  showLayout = true;
  mentionArray = [];
  tooltipOptions = {
    contentType: 'string',
    placement: 'left',
    trigger: 'hover',
    'max-width': '450',
    width: '300',
    pointerEvents: 'auto'
  };
  isChecked: boolean;
  constructor(
    private notificationsandbox: NotifationSandbox,
    private fb: FormBuilder,
    private notifcationservice: NotificationService,
    private draverservice: ManifoldPanelService,
    private cdr: ChangeDetectorRef,
    private _snackBar: SnackbarService,
    public dialog: MatDialog
  ) {
    super();
    this.createFormGroup();
  }

  createFormGroup() {
    this.fusionFormGroup = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(500)
      ]),
      body: new FormControl('', [Validators.required]),
      subject: new FormControl('', [
        Validators.required,
        Validators.maxLength(500)
      ]),
      layoutId: this.selectedLayoutId,
      isDefault: new FormControl(false)
    });
  }

  ngOnInit() {
    this.tenantLogoPath = this.key['tenantLogoPath'];
    this.templateData = this.key['templateData'];

    this.notificationTemplateModel = new NotificationTemplateModel();
    this.selectedLayoutId = this.key['layoutId'];
    this.notificationId = this.key['notificationId'];
    this.categoryId = this.key['categoryId'];
    this.templateIdList = this.key['templateIdList'];

    // Get selected  Template's Parameters
    this.notifcationservice.templateParameters$
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.parameters = response;
        const itemsToDisplay = this.parameters;
        itemsToDisplay.forEach((element) => {
          element.mentionId = element.displayName.slice(1);
        });
        this.mentionArray = itemsToDisplay;
      });

    // Get Layouts
    this.notificationsandbox.LayoutList().subscribe((response) => {
      this.layouts = response;
      if (!this.selectedLayoutId) {
        this.selectedLayoutId = response[0].toString();
      }
      this.fusionFormGroup.get('layoutId').setValue(this.selectedLayoutId);
      this.selectLayout(this.selectedLayoutId);
    });
    // Get Template
    this.notifcationservice.templateData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response && !this.key['add']) {
          this.fusionFormGroup.patchValue(response);
        }
      });

    this.notifcationservice.templateList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.fusionFormGroup
          .get('name')
          .setValidators([
            Validators.required,
            Validators.maxLength(500),
            this.notifcationservice.templateIdValidator(response)
          ]);
        this.fusionFormGroup.get('name').updateValueAndValidity();
      });

    this.configData = {
      mention: {
        feeds: [
          {
            marker: '@',
            feed: getFeedItems
          }
        ]
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
          'redo'
        ],
        viewportTopOffset: 30,
        shouldNotGroupWhenFull: false
      },
      placeholder: 'Type email content here!',
      language: 'en',
      licenseKey: ''
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

  primaryAction() {
    if (this.fusionFormGroup.invalid) {
      this.draverservice.hideActionProgress();
      return;
    }
    this.addTemplate();
  }

  selectLayout(layoutId) {
    this.notificationsandbox.Layout(layoutId).subscribe((response) => {
      if (response) {
        this.selectedLayoutId = response['name'];
        const responseBody = response['body'].replace(
          '[@TenantLogo@]',
          this.tenantLogoPath
        );

        const selectedLayout = responseBody.split('[@TemplateBody@]');
        this.selectedLayoutHeader = selectedLayout[0];
        this.selectedLayoutFooter = selectedLayout[1];
      }
      this.cdr.detectChanges();
    });
  }

  addTemplate() {
    this.notificationTemplateModel = this.fusionFormGroup.value;
    this.notificationTemplateModel.name =
      this.notificationTemplateModel.name.trim();
    this.notificationTemplateModel.categoryId = this.categoryId;
    this.notificationTemplateModel.notificationId = this.notificationId;
    this.notificationTemplateModel.body = this.parseAndReplaceParameters(
      this.fusionFormGroup.get('body').value
    );
    this.notificationTemplateModel.subject = this.parseAndReplaceParameters(
      this.fusionFormGroup.get('subject').value
    );
    this.notificationTemplateModel.isDefault = this.isChecked;
    this.notificationsandbox
      .addTemplate(this.notificationTemplateModel)
      .subscribe(
        (response) => {
          this.notifcationservice.updateTemplateList(
            this.categoryId,
            this.notificationId
          );
          this.draverservice.closeCurrentManifoldPanel();
          this._snackBar.openCustomSnackBar(
            { message: 'Adding New Template Successful!' },
            5000
          );
          this.draverservice.hideActionProgress();
        },
        (error) => {
          this.draverservice.hideActionProgress();
          this._snackBar.openCustomSnackBar(
            { message: 'Adding New Template Unsuccessful!' },
            5000
          );
        }
      );
  }

  parseAndReplaceParameters(body: string) {
    for (const parameter of this.parameters) {
      body = body.split(parameter.displayName).join(parameter.name);
    }
    return body;
  }
  secondaryAction() {}

  public toggleDisableEditors() {
    this.isDisabled = !this.isDisabled;
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
    this.notificationTemplateModel.body = event.editor.getData();
    this.notificationTemplateModel.body =
      this.notificationTemplateModel.body.replace(/data-mention[^>]*/g, '');
    this.notificationTemplateModel.body =
      this.notificationTemplateModel.body.replace(
        /\\(?=[^\[\]]*\])|\\(?=\[)/g,
        ''
      ); // (\\) this is to remove \ appended by ckeditor before brackets []
    //this.notificationTemplateModel.body = this.notificationTemplateModel.body.replace(/<\/?span[^>]*>/g,"");
    this.fusionFormGroup
      .get('body')
      .setValue(this.notificationTemplateModel.body);
    if (event.editor.getData() == '') this.showError = true;
    else this.showError = false;
  }

  panelClose() {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
