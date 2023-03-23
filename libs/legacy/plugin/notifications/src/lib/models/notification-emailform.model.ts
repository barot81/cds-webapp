import { FileDescription } from '@exxat/plugin/file-upload';
type GUID = string & { isGuid: true };

export class NotificationEmailFormModel {
  public id: GUID;
  public from:emailData;
  public name:string;
  public to: any[];
  public cc:emailData[];
  public bcc:emailData[];
  public replyto:emailData;
  public subject:string;
  public templateId:string;
  public scheduleType:number;
  public emailType:number;
  public scheduleDate:any;
  public description:string;
  public fileDescriptions: FileDescription[];
  public entity:entityModel;
  public templateParameters;
  constructor() {
  }
}

export class entityModel{
  constructor() {
  }
  public notificationId:string;
  public categoryId:string;
}

export class emailData{
  constructor() {
  }

  public email:string;
  public name:string;
}
