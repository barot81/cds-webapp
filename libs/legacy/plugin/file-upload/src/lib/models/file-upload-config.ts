/* eslint-disable @typescript-eslint/no-empty-function */
import { SecurityContext, ISecurityContext } from '@exxat/fusion/models';
import { FileType } from './fileType';

export class FileConfiguration implements ISecurityContext {

  public apiParamName = 'files';
  public fileEndpoint: FileEndpoint;
  public fileCollectionKey:string;
  public fileCards: FileCard[];
  public showFormats = true;
  public securityContext: SecurityContext;
  public isSecured = false;
  public isDirectUpload = false;

  constructor() {}
}

export class FileEndpoint {


  constructor(
    public serviceName: string,
    public prefix:string,
    public controller: string = 'File',
    public postAction: string = 'FileUpload',
    public getAction: string = 'FileDescriptions',
    public deleteAction: string = 'FileDelete',
    public downloadAction:string = 'FileDownload',
    public postReferenceKey:string = '') {

  }

}

export class FileCard {

  public filePath: string;
  public fileType: FileType;
  public allowMultiple = true;
  public isUploaded = false;
  public icon = 'cloud_upload';
  public caption = '';
  public tag: string;
  public description: string;
  public formats:string;
}
