import { FileEndpoint } from "./file-upload-config";
import { FileDescription } from "./fileDescription.model";

export class DocumentViewerConfiguration  {

  public fileEndpoint: FileEndpoint;
  public fileCollectionKey:string;
  public isKey = true;
  public files:FileDescription[];
  public defaultFileName:string;
}





