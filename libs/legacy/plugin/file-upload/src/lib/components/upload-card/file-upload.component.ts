import { ComponentType } from '@angular/cdk/portal';
import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RoleBasedAccessService } from '@zhealthcare/fusion/services';
import {
  ConfirmDialogService,
  OverlayService,
  SnackbarService,
  SpinnerOverlayService,
} from '@zhealthcare/ux';
import { forkJoin } from 'rxjs';
import { DocumentViewerConfiguration } from '../../models';
import { FileCard, FileConfiguration } from '../../models/file-upload-config';
import { FileDescription } from '../../models/fileDescription.model';
import { FileType } from '../../models/fileType';
import { FileUploadModel } from '../../models/fileUpload.model';
import { FileSandbox } from '../../services/file.sandbox';
import { CardDocumentViewerComponent } from '../card-document-viewer/card-document-viewer.component';

@Component({
  selector: 'zhealthcare-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
})
export class FileUploadComponent
  implements OnChanges, ControlValueAccessor, OnDestroy, OnInit
{
  fileColectionKey: string;

  @Input() fileConfiguration: FileConfiguration;

  @Input() featureCode: string;

  @Input() FileReferenceKey: string;

  @Output() FileDeleteDone = new EventEmitter<string>();

  @Output() FileUploadDone = new EventEmitter<FileDescription>();

  @ViewChild('upload', { static: false })
  private readonly uploadLink: ElementRef;

  dragOverActive = false;
  uploadSingleFile = false;
  isuploaded = false;
  isSupportedFile = true;
  filesList: FileDescription[] = [];
  uploadfilesList: FileUploadModel[] = [];
  previousFilesloading: boolean;
  UplodedFiles = [];
  fileDescriptions: FileDescription[] = [];
  supportedFormats: string;
  viewerConfiguration: DocumentViewerConfiguration =
    new DocumentViewerConfiguration();
  isFileUploadedMap: { [Key: string]: boolean } = {};
  fileCardErrorMap: { [Key: string]: string } = {};
  rbacAccess: { [key: string]: boolean } = {};
  subscribeComponentRef: TemplateRef<any> | ComponentType<any> | string;

  ngOnDestroy(): void {
    this.filesList = [];
    this.uploadfilesList = [];
  }

  constructor(
    private readonly fileService: FileSandbox,
    private readonly _snackbarService: SnackbarService,
    private readonly overlayService: OverlayService,
    private readonly resolver: ComponentFactoryResolver,
    private readonly roleBasedAccessService: RoleBasedAccessService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private _ConfirmDialogService: ConfirmDialogService,
    private _spinnerOverlayService: SpinnerOverlayService
  ) {
    this.rbacAccess['READ'] = true;
    this.rbacAccess['WRITE'] = true;
    this.rbacAccess['DELETE'] = true;
    this.subscribeComponentRef = this.resolver.resolveComponentFactory(
      CardDocumentViewerComponent
    ).componentType;
  }
  ngOnInit(): void {
    if (this.featureCode !== null && this.featureCode !== undefined) {
      for (const key in this.rbacAccess) {
        this.rbacAccess[key] = this.roleBasedAccessService.hasAccess(
          this.featureCode,
          { CAN: [key] }
        );
        // Use `key` and `value`
      }
    }
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (changes.FileReferenceKey) {
      this.GetFiledescription(changes.FileReferenceKey.currentValue);
    } else if (
      this.fileConfiguration.fileCollectionKey !== (null || undefined)
    ) {
      this.GetFiledescription(this.fileConfiguration.fileCollectionKey);
    }
  }

  onChange = (fileDescriptions: FileDescription[]) => {};

  writeValue(fileCollectionKey: string) {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {}

  addsupptedFormats(filecard: FileCard) {
    if (filecard.formats === undefined || filecard.formats === '') {
      filecard.formats =
        '.pdf,.doc,.jpg,.jpeg,.png,.docx,.xlsx,.pptx,.pptm,.potx,.potm';
    }
  }

  GetFiledescription(fileCollectionKey: string) {
    this.previousFilesloading = true;
    if (
      fileCollectionKey === undefined ||
      fileCollectionKey === null ||
      fileCollectionKey === ''
    ) {
      const key = undefined;
      this.isFileUploadedMap[key] = false;
      this.filesList = this.filesList.filter(
        (x) => x.description != (undefined && null)
      );
      this.uploadfilesList = this.uploadfilesList.filter(
        (x) => x.description != (undefined && null)
      );
      this.previousFilesloading = false;
    } else {
      this.fileService
        .getFileDescription(
          this.fileConfiguration.fileEndpoint,
          fileCollectionKey
        )
        .subscribe(
          (result: FileDescription[]) => {
            if (typeof event === 'object') {
              this.filesList = result;
              this.checkIfMultipleUploadAllowed(result);
              this.previousFilesloading = false;
              this.fileDescriptions =
                this.fileDescriptions === (undefined || null)
                  ? []
                  : this.fileDescriptions;
              if (result.length > 0)
                result.forEach(
                  (x) =>
                    (this.isFileUploadedMap[x.description || undefined] =
                      result.length > 0 ? true : false)
                );
              else {
                const key = undefined;
                this.isFileUploadedMap[key] = false;
              }
              this.onChange(this.fileDescriptions);
              this.setFileViewerConfiguration();
              this.changeDetectorRef.markForCheck();
            }
          },
          (error) => {
            this.previousFilesloading = false;
          }
        );
    }
  }

  private setFileViewerConfiguration() {
    if (this.filesList.length > 0) {
      this.viewerConfiguration.files = this.filesList;
      this.viewerConfiguration.fileEndpoint =
        this.fileConfiguration.fileEndpoint;
      this.viewerConfiguration.isKey = false;
      this.viewerConfiguration.defaultFileName = this.filesList[0].id;
    }
  }

  private checkIfMultipleUploadAllowed(result) {
    this.fileConfiguration.fileCards.forEach((filecard) => {
      if (!filecard.allowMultiple)
        if (
          result.findIndex((x) => x.description == filecard.description) > -1
        ) {
          filecard.isUploaded = true;
        }
    });
  }

  onUploadFiles(files: File[], fileCard: FileCard) {
    this.isSupportedFile = true;
    if (this.CheckFileFormat(files, fileCard)) {
      this.fileCardErrorMap[fileCard.description || 0] = undefined;
      this.CreateUploadFileList(files, fileCard);
      this.UploadFiles(fileCard);
    }
  }

  private CreateUploadFileList(files: File[], fileCard: FileCard) {
    const exceedsFile: string[] = [];
    const duplicateFileNames: string[] = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      this.addsupptedFormats(fileCard);
      fileCard.isUploaded = true;
      const fileSize = 5242880 * 2;
      if (files[index].size < fileSize) {
        // here ==> 5242880 = 5 MB => 20 MB = 4 * 5 MB
        this.uploadfilesList.push({
          data: file,
          fileName: file.name,
          fileKey: '',
          state: 'in',
          inProgress: false,
          progress: 0,
          description: fileCard.description,
          canRetry: false,
          canCancel: true,
          processing: true,
        });
        if (this.filesList.length > 0) {
          for (let i = 0, len = this.filesList.length; i < len; i++) {
            for (let j = 0, len2 = this.uploadfilesList.length; j < len2; j++) {
              if (
                this.filesList[i].fileName === this.uploadfilesList[j].fileName
              ) {
                duplicateFileNames.push(this.filesList[i].fileName);
                this.fileCardErrorMap[fileCard.description || 0] =
                  duplicateFileNames +
                  ' ' +
                  'already exists. Please rename your file and upload';
                this.uploadfilesList.splice(j, 1);
                len2 = this.uploadfilesList.length;
              }
            }
          }
        }
        this.uploadfilesList = this.uploadfilesList.filter(
          (arr, index, self) =>
            index === self.findIndex((t) => t.fileName === arr.fileName)
        );
      } else {
        fileCard.isUploaded = false;
        exceedsFile.push(files[index].name);
        this.fileCardErrorMap[fileCard.description || 0] =
          'File' +
          ' ' +
          exceedsFile +
          ' ' +
          ' exceeds upload size limit. Please upload a document with file size under 10 MB';
      }
    }
  }

  private UploadFiles(fileCard: FileCard) {
    if (fileCard.allowMultiple || fileCard.isUploaded) {
      this.isFileUploadedMap[fileCard.tag || undefined] = true;
    }
    this._spinnerOverlayService.show();
    const filesNotInProgress = this.uploadfilesList.filter(
      (m) => m.inProgress === false
    );
    forkJoin(
      filesNotInProgress.map((file) => {
        return this.fileService.uploadFile(
          this.fileConfiguration.apiParamName,
          this.fileConfiguration.fileEndpoint,
          file,
          this.getFileType(file, fileCard),
          fileCard.filePath,
          this.fileConfiguration.securityContext,
          this.fileConfiguration.isSecured,
          fileCard.description,
          fileCard.tag
        );
      })
    ).subscribe({
      next: (result) => {
        result.forEach((event: any, i) => {
          if (typeof event === 'object') {
            const file = filesNotInProgress[i];
            const fileDescription = Array.isArray(event.body)
              ? event.body[0]
              : event.body;
            file.fileKey = fileDescription.id;
            file.canCancel = true;
            file.processing = false;
            fileCard.isUploaded = true;
            this.fileDescriptions.push(fileDescription);
            this.onChange(this.fileDescriptions);
            this.ifDirectUploadThenMoveTopermenantList(
              file,
              fileDescription,
              fileCard
            );
            this.resetNativeElement();
            this.FileUploadDone.emit(fileDescription);
          }
        });
        this._spinnerOverlayService.hide();
      },
      error: (error) => {
        error.forEach((error, i) => {
          const file = filesNotInProgress[i];
          file.processing = false;
          file.canRetry = true;
          fileCard.isUploaded = false;
          this.fileCardErrorMap[fileCard.description || 0] = error.error;
          this.isFileUploadedMap[fileCard.description] = false;
          this.resetNativeElement();
          const index = this.uploadfilesList.indexOf(file);
          if (index > -1) {
            this.uploadfilesList.splice(index, 1);
          }
        });
        this._spinnerOverlayService.hide();
      },
      complete: () => {
        this._spinnerOverlayService.hide();
      },
    });
  }

  private resetNativeElement() {
    if (this.uploadLink?.nativeElement?.value != undefined) {
      this.uploadLink.nativeElement.value = '';
    }
  }

  private ifDirectUploadThenMoveTopermenantList(
    file: FileUploadModel,
    fileDescription: FileDescription,
    fileCard: FileCard
  ) {
    if (this.fileConfiguration.isDirectUpload) {
      const permanentfile = new FileDescription();
      permanentfile.fileName = file.fileName;
      permanentfile.id = fileDescription?.id;
      permanentfile.fileCollectionKey = fileDescription?.fileCollectionKey;
      permanentfile.fileType = fileCard.fileType;
      const index = this.uploadfilesList.indexOf(file);
      if (index > -1) {
        this.uploadfilesList.splice(index, 1);
      }
      this.filesList.push(permanentfile);
      this.previousFilesloading = false;
    }
  }
  private getFileType(file: FileUploadModel, fileCard: FileCard): FileType {
    let LocalFiletype: FileType;
    if (fileCard.fileType == undefined) {
      if (file.data.type == 'image/png' || file.data.type == 'image/jpeg') {
        LocalFiletype = FileType.Image;
      } else if (
        file.data.type == 'application/x-zip-compressed' ||
        file.data.type == 'application/x-compressed'
      ) {
        LocalFiletype = FileType.Package;
      } else {
        LocalFiletype = FileType.Document;
      }
    } else {
      LocalFiletype = <FileType>fileCard.fileType;
    }
    return LocalFiletype;
  }

  //#region File Validation
  private CheckFileFormat(files: File[], fileCard: FileCard): boolean {
    let result = false;
    const fileFormats = this.getFileFormatsFromfileType(
      fileCard.fileType,
      fileCard.formats
    );
    const formatArray =
      fileCard.formats !== undefined
        ? fileCard.formats.split(',')
        : fileFormats.split(',');
    for (let index = 0; index < files.length; index++) {
      const fileNameArray = files[index].name.split('.');
      const extension = fileNameArray[fileNameArray.length - 1].toLowerCase();
      result = formatArray.includes('.' + extension.toLowerCase());
      if (!result) {
        this.fileCardErrorMap[fileCard.description || 0] =
          'Please upload supported file formats.';
        return false;
      }
    }
    return result;
  }

  private CheckValidFileSize(files: File[], fileCard: FileCard): boolean {
    for (let index = 0; index < files.length; index++) {
      const fileSize = 5242880 * 2;
      if (files[index].size > fileSize) {
        // here ==> 5242880 = 5 MB => 20 MB = 4 * 5 MB
        this.fileCardErrorMap[fileCard.description || 0] =
          "Your uploaded file exceeds it's limit of maximum upload size(10 MB).";
        return false;
      }
    }
    return true;
  }
  //#endregion

  //#region  File Formats
  private getFileFormatsFromfileType(
    fileType: FileType,
    fileFormats: string = ''
  ) {
    switch (fileType) {
      case FileType.Document:
        return '.pdf,.doc,.docx,.pptx,.pptm,.potx,.potm';
      case FileType.Image:
        return '.jpg,.jpeg,.png';
      case FileType.Package:
        return '.zip,.rar,.gzip';
      case FileType.Custom:
        return fileFormats;
      default:
        return '.pdf,.doc,.jpg,.jpeg,.png,.docx,.xlsx,.pptx,.pptm,.potx,.potm';
    }
  }

  GetFormats(fileCard: FileCard): string {
    return ' Supported formats :  ' + fileCard.formats.replace(/\./g, '  ');
  }
  //#endregion

  RetryFile(file: any, fileCard: FileCard) {
    file.sub = this.fileService
      .uploadFile(
        '',
        this.fileConfiguration.fileEndpoint,
        file,
        fileCard.fileType,
        fileCard.filePath,
        this.fileConfiguration.securityContext,
        this.fileConfiguration.isSecured,
        fileCard.description,
        fileCard.tag
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          file.fileKey = event.body[0].id;
          file.canCancel = true;
          file.processing = false;
          this.FileUploadDone.emit(event.body[0]);
        }
      });
    file.canRetry = false;
  }

  //#region Delete Files
  DeleteTempFile(file: FileUploadModel, fileCard: FileCard) {
    this._ConfirmDialogService.open(
      `Are you sure you want to delete "${file.fileName}"?`,
      { ok: 'Delete', cancel: 'Cancel' }
    );
    this._ConfirmDialogService.confirmDialogAction().subscribe((confirmed) => {
      if (confirmed) {
        const index = this.uploadfilesList.indexOf(file);
        if (index > -1) {
          this.uploadfilesList.splice(index, 1);
        }
        this.fileDescriptions.splice(
          this.fileDescriptions.findIndex((x) => x.id == file.fileKey),
          1
        );
        if (
          this.uploadfilesList.findIndex(
            (x) => x.description === fileCard.description
          ) === -1
        )
          this.isFileUploadedMap[fileCard.description] = false;
        this.onChange(this.fileDescriptions);
        this.FileDeleteDone.emit(file.fileKey);
        this.resetNativeElement();
      }
    });
  }

  DeleteFilePermenetly(file: FileDescription, fileCard: FileCard) {
    this._ConfirmDialogService.open(
      `Are you sure you want to delete "${file.fileName}"?`,
      { ok: 'Delete', cancel: 'Cancel' }
    );
    this._ConfirmDialogService.confirmDialogAction().subscribe((confirmed) => {
      if (confirmed) {
        this._snackbarService.openCustomSnackBar(
          { message: 'Document Deleted Successfully.' },
          1000
        );
        this.fileService
          .deleteFile(this.fileConfiguration.fileEndpoint, file.id, true)
          .subscribe((result: any) => {
            if (result && typeof result === 'object') {
              const index = this.filesList.indexOf(file);
              if (index > -1) {
                this.filesList.splice(index, 1);
              }
              if (
                this.filesList.findIndex(
                  (x) => x.description === fileCard.description
                ) === -1
              )
                this.isFileUploadedMap[fileCard.description] = false;
              this.FileDeleteDone.emit(file.id);
            }
          });
      }
    });
  }
  //#endregion

  GetIconClass(filecard: FileCard) {
    return filecard.icon;
  }

  filterFilesByDescriptionTag(fileDescription, tag: string) {
    const fileDescriptions = fileDescription.filter(
      (x) => x.description == tag
    );
    if (tag !== (undefined && null) && fileDescriptions.length >= 1) {
      this.isFileUploadedMap[tag] = true;
    }

    return fileDescriptions;
  }

  open(
    content: TemplateRef<any> | ComponentType<any> | string,
    selectedfileKey: string
  ) {
    this.viewerConfiguration.defaultFileName = selectedfileKey;
    this.overlayService.open(content, {
      viewerConfiguration: this.viewerConfiguration,
    });
  }

  ActivateDragOver() {
    this.dragOverActive = true;
  }

  DeactivateDragOver() {
    this.dragOverActive = false;
  }
}
