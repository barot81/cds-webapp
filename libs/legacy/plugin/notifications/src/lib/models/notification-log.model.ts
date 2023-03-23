type GUID = string & { isGuid: true };

export class NotificationLogModel {
  public id: GUID;
  public categoryId:string;
  public notificationId:string;
  public referenceKey:GUID;
  public events:any;
  public from:FromModel;
  public to:FromModel[];
  public cC:FromModel[];
  public bCC:FromModel[];
  public description:string;
  public replyto:string;
  public subject:string;
  public body:string;
  public sentAt:string;
  public ttl:string;
  public attachmentsFileDescription:any[];
  public groupId: string;
  public eventName: string;
  public isScheduled : boolean;
  constructor() {
  }
}


export class FromModel{

  public email:string;
  public name:string;
}
