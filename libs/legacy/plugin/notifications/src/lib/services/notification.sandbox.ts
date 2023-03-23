import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Sandbox } from '@exxat/fusion/core';
import { NotificationApiClient } from './notofication.ApiClient';
import { NotificationEmailSendModel, NotificationTemplateModel, NotificationLogModel, NotificationLayoutModel, DataSourceResult } from '../models';


@Injectable({providedIn:"root"})

export class NotifationSandbox extends Sandbox {

  constructor(
    private notificationApiClient: NotificationApiClient

  ) {
    super();

  }
  public TemplateList(categoryId:string,notificationId: string): Observable<any> {
    return this.notificationApiClient.TemplateList(categoryId,notificationId);
  }

  public LayoutList(): Observable<NotificationEmailSendModel[]> {
    return this.notificationApiClient.LayoutList();
  }

  public Template(categoryId:string,notificationId: string,templateId:string): Observable<NotificationTemplateModel> {
    return this.notificationApiClient.Template(categoryId,notificationId,templateId);
  }

  public Layout(layoutId:string): Observable<NotificationTemplateModel> {
    return this.notificationApiClient.Layout(layoutId);
  }

  public NotificationCategory(categoryId:string,notifictionId:string): Observable<NotificationEmailSendModel[]>{
    return this.notificationApiClient.NotificationCategory(categoryId,notifictionId);
  }

  public addTemplate(templateData:NotificationTemplateModel): Observable<NotificationTemplateModel>{
    return this.notificationApiClient.addTemplate(templateData);
  }

  public editTemplate(categoryId:string,notificationId:string,templateName:string,templateData:any): Observable<any>{
    return this.notificationApiClient.editTemplate( categoryId,notificationId,templateName,templateData);
  }

  public GetNotificationLogByFilter(ouCode:string,fileryBy:string,sortby:string): Observable<DataSourceResult<NotificationLogModel>>{
    return this.notificationApiClient.GetNotificationLogByFilter(ouCode,fileryBy,sortby);
  }

  public GetEmailHistoryByFilter(ouCode:string,filterBy:string,orderBy:string,pageNumber:number,pageSize:number,search:string): Observable<any>{
    return this.notificationApiClient.GetEmailHistoryByFilter(ouCode,filterBy,orderBy,pageNumber,pageSize,search);
  }

  public NotificationLogByCatrgory(ouCode,categoryId:string): Observable<NotificationLogModel[]>{
    return this.notificationApiClient.NotificationLogByCatrgory(ouCode,categoryId,categoryId);
  }

  public GetNotificationibyReferenceKey(ouCode,referenceKey:string): Observable<NotificationLogModel[]>{
    return this.notificationApiClient.GetNotificationibyReferenceKey(ouCode,referenceKey);
  }

  public GetNotificationibyNotificationId(ouCode,notificationId:string): Observable<NotificationLogModel[]>{
    return this.notificationApiClient.GetNotificationibyNotificationId(ouCode,notificationId);
  }

  public GetLayoutData(layoutId:string): Observable<NotificationLayoutModel>{
    return this.notificationApiClient.GetLayoutById(layoutId);
  }

  public GetAllEvents(categoryId:string,notificationId:string,groupId:string): Observable<any>{
    return this.notificationApiClient.GetAllEvents(categoryId,notificationId,groupId);
  }

  public CheckUniqueEventName(ouCode,categoryId:string,notificationId:string,groupId:string,controlValue:string): Observable<any>{
    return this.notificationApiClient.CheckUniqueEventName(ouCode,categoryId,notificationId,groupId,controlValue);
  }

  GetNotificationLogByRawSql(ouCode: any,categoryId,notificationId, cohortIds,pageNumber) {
    return this.notificationApiClient.GetNotificationLogByRawSql(ouCode,categoryId,notificationId,cohortIds,pageNumber);    
  }



}

