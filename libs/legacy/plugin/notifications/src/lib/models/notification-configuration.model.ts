import { emailData } from './notification-emailform.model';

export class EmailConfiguration {
  public replyto: string ;
  public from: string;
  public to: any[];
  public showEmailSendTypeInput:boolean=false;
  public labelSeparateTypeInput:string='Send separate emails to each placement';
  public labelGroupTypeInput:string='Group placements in one email';
  public showScheduleType:boolean=false;
  public showDescriptionInput:boolean=false;
  public recipientCount:number;
  public recipientType:string="Student";
  public showUploadFileInput:boolean=true;
  public showNotificationNameInput:boolean=true;
  public sendEmailAsInline:boolean=false;
  public cohortId: string;
  constructor() {}
}


