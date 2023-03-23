import { FileDescription, FileEndpoint } from '@exxat/plugin/file-upload';

export class DocumentViewerConfiguration {
  public fileEndpoint: FileEndpoint;
  public fileCollectionKey: string;
  public isKey: boolean = true;
  public files: FileDescription[];
  public defaultFileName: string;

  constructor() {}
}
