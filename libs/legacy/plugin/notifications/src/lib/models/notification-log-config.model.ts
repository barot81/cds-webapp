export class NotificationLogConfig {
  public notificationId: string ;
  public categoryId: string;
  public groupId: string;
  public eventName: string;
  public fromEmail: string;
  public cohortId: string;
  public showScheduled : boolean = true;
  public showTemplate : boolean = false;
  public startDate : string;
  public endDate : string;
  public emailStatus : any[];
  public notificationIdStartsWith: string ;
  constructor() {}
}


