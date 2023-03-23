import { FileDescription, FileEndpoint } from '@zhealthcare/plugin/file-upload';

export class DocumentViewerConfiguration {
  public fileEndpoint: FileEndpoint;
  public fileCollectionKey: string;
  public isKey: boolean = true;
  public files: FileDescription[];
  public defaultFileName: string;

  constructor() {}
}
