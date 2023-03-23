/* eslint-disable @typescript-eslint/no-empty-function */
import { ISecurityContext, SecurityContext } from '@exxat/fusion/models';


export class FileDescription implements ISecurityContext {
    id: string;
    fileCollectionKey : string;
    fileName: string;
    description: string;
    createdTimestamp: Date;
    updatedTimestamp: Date;
    ContentType: string;
    tag: string;
    size: number;
    filePath: string;
    fileType: string;
    tempFilePath: string;
    securityContext: SecurityContext
    constructor() {

    }
}
