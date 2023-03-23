/* eslint-disable @angular-eslint/component-selector */
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
  TemplateRef,
} from '@angular/core';
import { FileType } from '../../models/fileType';
import { FileConfiguration } from '../../models/file-upload-config';
import { FileSandbox } from '../../services/file.sandbox';
import { FileDescription } from '../../models/fileDescription.model';
import { AvatarInformation } from '../../models/avatar-information.model';
import { BehaviorSubject } from 'rxjs';
import { FileUploadModel } from '../../models/fileUpload.model';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '@zhealthcare/ux';
import { Logger } from '@zhealthcare/fusion/core';

@Component({
  selector: 'zhealthcare-editable-avatar',
  templateUrl: './zhealthcare-editable-avatar.component.html',
  styleUrls: ['./zhealthcare-editable-avatar.component.scss'],
})
export class zhealthcareEditableAvatarComponent implements OnChanges {
  @Input() src: string | ArrayBuffer;
  @Input() size: string;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() editable: boolean;
  @Input() fileConfiguration: FileConfiguration;
  @Input() postReferenceKey: string;
  @Input() fileDowloadKey: string;
  @Input() featureCode: string;
  @Output() uploadDone = new EventEmitter<FileDescription[]>();
  @Output() fileDeleteDone = new EventEmitter<string>();
  error = 'unsupported file format.';
  deleteError = 'error deleting the file';
  showError = false;
  showErrorDelete = false;
  @ViewChild('avatarUpload', { static: false }) upload: ElementRef;
  @ViewChild('editableAvatarDialogBox', { static: true }) editableAvatarDialogBox: TemplateRef<any>;
  @ViewChild('deleteDialog', { static: true }) deleteDialog: TemplateRef<any>;

  firstInitial: string;
  lastInitial: string;
  dragOverActive = false;
  avatarInformation: AvatarInformation = {
    thumbnailImage: undefined,
    fullname: undefined,
    fileCollectionKey: undefined,
    loading: false,
    initials: false,
  };
  avatarSubject$ = new BehaviorSubject<AvatarInformation>(
    this.avatarInformation
  );

  constructor(
    private fileService: FileSandbox,
    private readonly dialog: MatDialog
  ) { }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (changes.fileDowloadKey?.currentValue) {
      this.fileDowloadKey = changes.fileDowloadKey?.currentValue;
      this.downloadAvatar();
    } else if (this.fileDowloadKey) {
      this.downloadAvatar();
    } else {
      this.fileDowloadKey = undefined;
      this.src = null;
      const _ = require("lodash");
      if (this.firstName) {
        this.firstInitial = _.startCase(this.firstName.charAt(0));
      }
      if (this.lastName) {
        this.lastInitial = _.startCase(this.lastName.charAt(0));
      }
    }
  }

  uploadAvatar(event: any) {
    this.avatarInformation.loading = true;
    this.showError = false;
    if (event.target.files && event.target.files[0]) {
      const LocalFiletype = FileType.Image;
      const filedata = event.target.files[0];
      const file: FileUploadModel = {
        data: filedata,
        fileName: filedata.name,
        fileKey: '',
        state: 'in',
        inProgress: false,
        progress: 0,
        description: '',
        canRetry: false,
        canCancel: true,
        processing: true,
      };

      this.fileConfiguration.fileEndpoint.postReferenceKey =
        this.postReferenceKey;
      this.fileService
        .uploadFile(
          this.fileConfiguration.apiParamName,
          this.fileConfiguration.fileEndpoint,
          file,
          LocalFiletype,
          'Profile_Picture',
          this.fileConfiguration.securityContext
        )
        .subscribe(
          (response: any) => {
            if (response !== undefined && response.body) {
              this.avatarInformation.loading = false;
              let reader = new FileReader();
              this.uploadDone.emit(response.body);
              reader.onload = (e) => (this.src = e.target.result);
              reader.readAsDataURL(filedata);
              this.upload.nativeElement.value = '';
            } else if (response && response.status === 204) {
              this.avatarInformation.loading = false;
            }
          },
          (error) => {
            this.avatarInformation.loading = false;
            this.upload.nativeElement.value = '';
            this.showError = true;
            Logger.error(
              `PluginModule : zhealthcareEditableAvatarComponent =>  uploadFile() => fileKey:${this.postReferenceKey}:${error}`
            );
          }
        );
    }
  }

  ActivateDragOver() {
    this.dragOverActive = true;
  }

  DeactivateDragOver() {
    this.dragOverActive = false;
  }

  public downloadAvatar(type?) {
    this.avatarInformation.loading = true;
    if (type == undefined) {
      switch (this.size) {
        case 'lg':
        case 'large':
          type = 'ThumbnailLarge';
          break;
        case 'md':
        case 'medium':
          type = 'ThumbnailMedium';
          break;
        case 'sm':
        case 'small':
          type = 'ThumbnailSmall';
          break;
        default:
          type = 'original';
      }

      return this.fileService
        .downloadFile(
          this.fileDowloadKey,
          type,
          this.fileConfiguration.fileEndpoint,
          true
        )
        .subscribe(
          (responseImage) => {
            if (responseImage && responseImage.body) {
              this.avatarInformation.loading = false;

              let reader = new FileReader();
              reader.onload = (e) => (this.src = e.target.result);

              reader.readAsDataURL(responseImage.body);
            } else if (responseImage && responseImage.status === 204) {
              this.avatarInformation.loading = false;
              this.src = null;
              const _ = require("lodash");
              if (this.firstName) {
                this.firstInitial = _.startCase(this.firstName.charAt(0));
              }
              if (this.lastName) {
                this.lastInitial = _.startCase(this.lastName.charAt(0));
              }
            }
          },
          (error) =>
            Logger.error(
              `PluginModule : zhealthcareEditableAvatarComponent =>  downloadAvatar() => fileKey:${this.fileDowloadKey}:${error}`
            )
        );
    }
  }

  showEditableAvatarDialogBox() {
    this.dialog.open(this.editableAvatarDialogBox, { minWidth: 340 });
  }

  public deleteAvatar() {
    this.showErrorDelete = false;
    const dialogRef = this.dialog.open(this.deleteDialog, { minWidth: 392 });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (
          this.fileDowloadKey &&
          this.fileConfiguration.fileEndpoint.deleteAction
        ) {
          this.avatarInformation.loading = true;
          this.fileService
            .deleteFile(
              this.fileConfiguration.fileEndpoint,
              this.fileDowloadKey,
              true
            )
            .subscribe(
              (resp) => {
                if (resp && resp.status == 200) {
                  this.fileDeleteDone.emit(this.fileDowloadKey);
                  this.fileDowloadKey = undefined;
                  this.src = null;
                  const _ = require("lodash");
                  if (this.firstName) {
                    this.firstInitial = _.startCase(this.firstName.charAt(0));
                  }
                  if (this.lastName) {
                    this.lastInitial = _.startCase(this.lastName.charAt(0));
                  }
                  this.avatarInformation.loading = false;
                }
              },
              (error) => {
                this.avatarInformation.loading = false;
                this.showErrorDelete = true;
                Logger.error(
                  `PluginModule : zhealthcareEditableAvatarComponent =>  deleteAvatar() => fileKey:${this.fileDowloadKey}:${error}`
                );
              }
            );
        }
      }
    });
  }
}
