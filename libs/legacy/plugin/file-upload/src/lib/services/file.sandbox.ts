import { Injectable } from '@angular/core';
import { FusionConfigService, Sandbox } from '@exxat/fusion/core';
import { SecurityContext } from '@exxat/fusion/models';
import { Observable } from 'rxjs';
import { FileApiClient } from '../fileApiClient.service';
import { FileEndpoint } from '../models/file-upload-config';
import { FileDescription } from '../models/fileDescription.model';
import { FileType } from '../models/fileType';
import { FileUploadModel } from '../models/fileUpload.model';

@Injectable({ providedIn: 'any' })
export class FileSandbox extends Sandbox {
  constructor(
    private fileApiClient: FileApiClient,
    private fusionConfigService: FusionConfigService
  ) {
    super();
  }

  public uploadFile(
    apiParamName: string,
    fileEndpoint: FileEndpoint,
    file: FileUploadModel,
    fileType: FileType,
    filePath: string,
    securityContext: SecurityContext,
    isSecured: boolean = false,
    description: string = null,
    tag: string = null
  ): Observable<any> {
    const target =
      this.getFileEndpoint(fileEndpoint) +
      fileEndpoint.postAction +
      (fileEndpoint.postReferenceKey.length < 0
        ? ''
        : '/' + fileEndpoint.postReferenceKey);

    return this.fileApiClient.uploadFile(
      apiParamName,
      target,
      file,
      fileType,
      filePath,
      securityContext,
      isSecured,
      description,
      tag
    );
  }

  public deleteFile(
    fileEndpoint: FileEndpoint,
    fileKey: string = null,
    isFileKey: boolean = true
  ): Observable<any> {
    const target =
      this.getFileEndpoint(fileEndpoint) + fileEndpoint.deleteAction + '/';
    return this.fileApiClient.deleteFile(fileKey, target, isFileKey);
  }

  public downloadFile(
    fileKey: string = null,
    fileOutputFormat: string,
    fileEndpoint: FileEndpoint,
    isFileKey: boolean = true,
    zipFileName: string = null
  ): Observable<any> {
    const target =
      this.getFileEndpoint(fileEndpoint) + fileEndpoint.downloadAction;
    return this.fileApiClient.downloadFile(
      fileKey,
      fileOutputFormat,
      target,
      isFileKey,
      zipFileName
    );
  }

  public downloadFilePost(
    fileEndpoint,
    requestBody: any = {}
  ): Observable<any> {
    const target =
      this.getFileEndpoint(fileEndpoint) + fileEndpoint.downloadAction;
    return this.fileApiClient.downloadFilePost(target, requestBody);
  }

  public downloadAllFilePost(
    requestBody: any = {},
    serviceEndpoint: string
  ): Observable<any> {
    return this.fileApiClient.downloadAllFilePost(requestBody, serviceEndpoint);
  }

  public getFileDescription(
    fileEndpoint: FileEndpoint,
    fileCollectionKey: string
  ): Observable<FileDescription[]> {
    this.fileApiClient.file_URL =
      this.getFileEndpoint(fileEndpoint) +
      fileEndpoint.getAction +
      (fileCollectionKey === ''
        ? ''
        : (fileEndpoint.getAction.endsWith('/') ||
          fileEndpoint.getAction.endsWith('?')
            ? ''
            : '/') + fileCollectionKey);
    return this.fileApiClient.getFileDescriptions();
  }

  public getFileUrl(
    fileEndpoint: FileEndpoint,
    fileKey: string,
    fileOutputFormat: string
  ) {
    const file_URL =
      this.getFileEndpoint(fileEndpoint) + fileEndpoint.downloadAction;
    return encodeURIComponent(
      `${file_URL}?fileKey=${fileKey}&fileOutputFormat=${fileOutputFormat}`
    );
  }

  getFileEndpoint(fileEndpoint: FileEndpoint): string {
    const serviceEndpoint = this.fusionConfigService.getservice(
      fileEndpoint.serviceName
    ).endpoint;
    let target = serviceEndpoint;
    target +=
      (target.endsWith('/') ? '' : '/') +
      (fileEndpoint.prefix === '' || fileEndpoint.prefix == undefined
        ? ''
        : fileEndpoint.prefix + '/') +
      (fileEndpoint.controller === '' || fileEndpoint.controller == undefined
        ? ''
        : fileEndpoint.controller + '/');
    return target;
  }
}
