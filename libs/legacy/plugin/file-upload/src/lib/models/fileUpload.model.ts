import { Subscription } from 'rxjs';

export class FileUploadModel {
    data: File;
    fileName: string;
    fileKey: string;
    state: string;
    inProgress: boolean;
    progress: number;
    description:string;
    processing:boolean;
    canRetry: boolean;
    canCancel: boolean;
    sub?: Subscription;
}