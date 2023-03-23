/* eslint-disable no-constant-condition */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-empty-function */
import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, Input, OnChanges, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FusionFormComponent } from '@zhealthcare/fusion/components';
import { SecurityContext } from '@zhealthcare/fusion/models';
import {
  FileCard, FileConfiguration,
  FileEndpoint
} from '@zhealthcare/plugin/file-upload';
import { HeaderService, SnackbarService } from '@zhealthcare/ux';
import lodash from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { EmailConfiguration } from '../../models/notification-configuration.model';
import {
  emailData, NotificationEmailFormModel
} from '../../models/notification-emailform.model';
import { NotificationService } from '../../services';

@Component({
  selector: 'zhealthcare-notification-recipient-list',
  templateUrl: 'notification-recipient-list.component.html',
  styleUrls: ['notification-recipient-list.component.scss']
})
export class NotificationRecipientListComponent
  extends FusionFormComponent
  implements OnInit, OnChanges
{
  @Input()
  categoryId: string;
  @Input()
  emailConfiguration: EmailConfiguration;
  @Input()
  notificationId: string;
  @Input()
  groupId: string;
  @Input() disableSelectorRecipients = false;
  @Input() disableRecipientsComponent = false;
  @Input() displayCountButton = false;
  @Input() recipientCount: number;
  @Output() isRecipientListFormChange = new EventEmitter();
  emailsToCopy: string;

  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<string>(true, []);
  displayedColumns: string[] = ['select', 'name'];

  emailList: any;

  toEmailList = new BehaviorSubject<any[]>(null);
  ccEmailList = [];
  bccEmailList = [];
  removable = true;
  public separatorKeysCodes = [ENTER, COMMA];

  fileConfiguration: FileConfiguration;
  notificationSecurityContext: SecurityContext;

  destroy$: Subject<boolean> = new Subject<boolean>();
  emailData: NotificationEmailFormModel;
  toEmailListCount: number;

  constructor(
    private fb: FormBuilder,
    public _headerService: HeaderService,
    public notifcationservice: NotificationService,
    private cdr: ChangeDetectorRef,
    private _snackBarService: SnackbarService
  ) {
    super();
    this.fusionFormGroup = this.fb.group({
      replyto: new FormControl('', [Validators.required, Validators.email]),
      from: new FormControl('', [Validators.required, Validators.email]),
      cc: new FormControl(''),
      bcc: new FormControl(''),
      fileDescriptions: [],
      to:new FormControl(''),
      adminEmail: new FormControl('')
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(!changes?.disableSelectorRecipients?.currentValue)
      this.fusionFormGroup.get("to").setValidators(Validators.required);
  }

  ngOnInit() {
    this.emailList = this.emailConfiguration?.to;
    // this.emailList?.sort((a,b) => {
    //   if(a.name?.toLowerCase() < b.name?.toLowerCase()) return -1;
    //   if(a.name?.toLowerCase() > b.name?.toLowerCase()) return 1;
    //   return 0;
    // })
    if (typeof this.emailConfiguration != 'undefined') {
      if (this.emailConfiguration?.from)
        this.fusionFormGroup.controls['from'].setValue(
          this.emailConfiguration?.from
        );

      if (this.emailConfiguration?.replyto)
        this.fusionFormGroup.controls['replyto'].setValue(
          this.emailConfiguration?.replyto
        );
    }

    if (this.emailConfiguration?.showUploadFileInput == true) {
      this.fileConfiguration = new FileConfiguration();
      this.fileConfiguration.fileEndpoint = new FileEndpoint(
        'service.notification',
        '',
        'ESSAttachment',
        'FileUpload'
      );
      this.fileConfiguration.securityContext = this.notificationSecurityContext;
      this.fileConfiguration.fileCards = [];
      const fileCard = new FileCard();
      fileCard.filePath = 'ESS';
      /* fileCard.fileType = FileType.Image;
            fileCard.fileType = FileType.Document; */

      this.fileConfiguration.fileCards.push(fileCard);
      this.fileConfiguration.securityContext = this.notificationSecurityContext;
    }

    this.emailData = this.fusionFormGroup.value;

    this.emailData.entity = {
      categoryId: this.categoryId,
      notificationId: this.notificationId
    };

    this.emailData.from = {
      email: this.fusionFormGroup.get('from').value,
      name: ''
    };

    this.emailData.replyto = {
      email: this.fusionFormGroup.get('replyto').value,
      name: ''
    };

    this.pushInToList(this.emailList);
    this.notifcationservice.updateData(this.emailData);

    this.fusionFormGroup.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.emailData = this.fusionFormGroup.value;
        this.fusionFormGroup.get('from').value
          ? (this.emailData.from = {
              email: this.fusionFormGroup.get('from').value,
              name: ''
            })
          : '';
        this.fusionFormGroup.get('replyto').value
          ? (this.emailData.replyto = {
              email: this.fusionFormGroup.get('replyto').value,
              name: ''
            })
          : '';

        let ccEmail: [] = [];
        let bccEmail: [] = [];
        this.fusionFormGroup.get('cc').value
          ? (ccEmail = this.fusionFormGroup.get('cc').value)
          : '';
        this.fusionFormGroup.get('bcc').value
          ? (bccEmail = this.fusionFormGroup.get('bcc').value)
          : '';

        if (ccEmail.length != 0) {
          const ccEmailUpdate: emailData[] = [];
          ccEmail.forEach(function (value, index) {
            ccEmailUpdate.push({ email: value, name: '' });
          });
          this.emailData.cc = ccEmailUpdate;
        }
        if (bccEmail.length != 0) {
          const bccEmailUpdate: emailData[] = [];
          bccEmail.forEach(function (value, index) {
            bccEmailUpdate.push({ email: value, name: '' });
          });
          this.emailData.bcc = bccEmailUpdate;
        }

        this.notifcationservice.updateData(this.emailData);
        this.cdr.detectChanges();
        this.isRecipientListFormChange.emit('true');
      });
  }

  emailConditionallyRequiredValidator(formControl: AbstractControl) {
    if (!formControl.parent) {
      return null;
    }

    if (formControl.parent.get('myCheckbox').value) {
      return Validators.required(formControl);
    }
    return null;
  }

  pushInToList(resp) {
    const emailAddresses = lodash.cloneDeep(resp);
    this.emailsToCopy = emailAddresses?.map((x) => x.email).join('; ');
    this.toEmailListCount = emailAddresses.filter((x) => x.id).length;
    this.fusionFormGroup.controls['to'].setValue(
      emailAddresses.filter((x) => x.id)
    );
    this.emailData.to = emailAddresses;
  }

  validateAndAddInToList(emailAddressList?) {
    if (emailAddressList) {
      this.pushInToList(emailAddressList);
    }
    const adminEmail = this.fusionFormGroup.get('adminEmail').value.trim();
    const emailToDelete = this.emailData.to.filter((x) => x.id === undefined);
    if (emailToDelete.length > 0) {
      this.emailData.to.splice(this.emailData.to.indexOf(emailToDelete), 1);
    }

    if (this.validateEmail(adminEmail)) {
      const newEmail = { email: adminEmail, name: 'Admin Email' };
      this.emailData.to.push(newEmail);
    } else if (adminEmail != '')
      this.fusionFormGroup.get('adminEmail').setErrors({ invalidEmail: true });

    this.notifcationservice.updateData(this.emailData);
  }

  emailCopied(event) {
    let snackbarMessage = { message: 'No Recipients Selected' };
    if (this.emailsToCopy.length > 0) {
      if (event)
        snackbarMessage = { message: 'Copy Email Addresses Successful!' };
      else snackbarMessage = { message: 'Copy Email Addresses Unsuccessful!' };
    }

    this._snackBarService.openCustomSnackBar(snackbarMessage, 3000);
  }

  removeEmail(data: any, type: boolean): void {
    if (type) {
      if (this.ccEmailList.indexOf(data) >= 0)
        this.ccEmailList.splice(this.ccEmailList.indexOf(data), 1);
    } else {
      if (this.bccEmailList.indexOf(data) >= 0)
        this.bccEmailList.splice(this.bccEmailList.indexOf(data), 1);
    }
  }

  add(event, type: boolean): void {
    if (event.value) {
      if (this.validateEmail(event.value))
        type
          ? this.ccEmailList.push(event.value)
          : this.bccEmailList.push(event.value);
      type
        ? this.fusionFormGroup.get('cc').setValue(this.ccEmailList)
        : this.fusionFormGroup.get('bcc').setValue(this.bccEmailList);
    }
    if (event.input) event.input.value = '';
  }

  validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  editRecipientList(event, recipient, index) {
    if (event) {
      this.selection.toggle(recipient);
      this.validateAndAddInToList(this.selection.selected);
    }
  }

  selectAll() {
    this.emailConfiguration?.to?.forEach((row) => this.selection.select(row));
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.selectAll();
    this.validateAndAddInToList(this.selection.selected);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.emailConfiguration?.to?.length;
    return numSelected === numRows;
  }

  FileDeleteDone() {}

  FileUploadDone() {}

  ngAfterViewInit(): void {
    this.selectAll();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
