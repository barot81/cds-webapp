/* export class NotificationEmailSendModel {

  public id: string;  public layoutId: string; public template: JSON;

  constructor(

       ) {
  }
}
 */
export class NotificationEmailSendModel {

  public layoutId:string;
  public categoryId:string;
  public notificationId:string;
  public name:string;
  public subject:string;
  public body:string;
  public isDefault: boolean;
  
    constructor(
  
         ) {
    }
  }
  