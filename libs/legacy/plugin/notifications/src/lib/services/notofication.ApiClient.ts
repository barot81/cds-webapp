import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GET,
  Path,
  Body,
  PUT,
  POST,
  HttpService,
  Query,
  Header,
  FusionConfigService
} from '@zhealthcare/fusion/core';
import { NotificationEmailSendModel, NotificationLogModel, NotificationTemplateModel, NotificationLayoutModel, DataSourceResult } from '../models';



@Injectable({providedIn:"root"})
export class NotificationApiClient extends HttpService {
  config;
    constructor( protected _fusionConfigService: FusionConfigService) {
    super();
  }

  getBaseUrl(): string {
    return this._fusionConfigService.getservice('service.notification').endpoint;
  }

  @GET('/Template/TemplateList/{categoryId}/{notificationId}')
  public TemplateList(@Path('categoryId') categoryId: string,@Path('notificationId') notificationId: string): Observable<NotificationEmailSendModel[]> {
    return null;
  }

  @GET('/Layout/LayoutList')
  public LayoutList(): Observable<NotificationEmailSendModel[]> {
    return null;
  }

  @GET('/Template/{categoryId}/{notificationId}/{templateId}')
  public Template(@Path('categoryId') categoryId:string,@Path('notificationId') notificationId: string,@Path('templateId') templateId: string): Observable<NotificationTemplateModel> {
    return null;
  }

  @GET('/Layout/{layoutId}')
  public Layout(@Path('layoutId') layoutId: string): Observable<NotificationTemplateModel> {
    return null;
  }

  @GET('/Event/GetAllEventName/{categoryId}/{notificationId}/{groupId}')
  public GetAllEvents(@Path('categoryId') categoryId:string,@Path('notificationId') notificationId: string,@Path('groupId') groupId: string): Observable<any> {
    return null;
  }

  @GET('/Event/IsEventNameUnique/{categoryId}/{notificationId}/{groupId}/{eventName}')
  public CheckUniqueEventName(
    @Header('OuCode') ouCode:string,
    @Path('categoryId') categoryId:string
  ,@Path('notificationId') notificationId: string,@Path('groupId') groupId: string,@Path('eventName') eventName: string): Observable<any> {
    return null;
  }



  @GET('/NotificationCategory/{categoryId}/{notifictionId}')
  public NotificationCategory(@Path('categoryId') categoryId: string,@Path('notifictionId') notifictionId: string):
   Observable<NotificationEmailSendModel[]> {
    return null;
  }
  @GET('/NotificationLog/GetByCategory/{categoryId}')
  public NotificationLogByCatrgory(@Header('OuCode') oucode:string, @Query('categoryId') qyery: string,@Path('categoryId') categoryId: string):
   Observable<NotificationLogModel[]> {
    return null;
  }
  @GET<DataSourceResult<NotificationLogModel>>('/NotificationLog/Load?')
  public GetNotificationLogByFilter(
    @Header('OuCode') oucode:string,
    @Query('$Filters') filterBy: string,
    @Query('$SortBy') sortBy: string
    ): Observable<DataSourceResult<NotificationLogModel>> {
    return null;
  }
  @GET<DataSourceResult<NotificationLogModel>>('/odata/EmailHistory?')
  public GetEmailHistoryByFilter(
    @Header('OuCode') oucode:string,
    @Query('$filter') filterBy: string,
    @Query('$orderBy') orderBy: string,
    @Query('pageNumber') pageNumber : number,
    @Query('pageSize') pageSize : number,
    @Query('searchText') search : string
    ): Observable<any> {
    return null;
  }
  @GET<DataSourceResult<NotificationLogModel>>('/NotificationLog/GetNotificationByPayload')
  GetNotificationLogByRawSql(@Header('OuCode') ouCode: any, @Query('categoryId') categoryId: string,@Query('notificationId') notificationId: string, @Query('cohortIds') cohortIds, @Query('pageNumber') pageNumber) : Observable<DataSourceResult<NotificationLogModel>> {
    return null;
  }
  @GET('/NotificationLog/GetByNotification/{notificationId}')
  public GetNotificationibyNotificationId(@Header('OuCode') oucode:string,@Path('notificationId') notificationId: string):
   Observable<NotificationLogModel[]> {
    return null;
  }


  @GET('/NotificationLog/GetByReferenceKey/{referencKey}')
  public GetNotificationibyReferenceKey
  (@Header('OuCode') oucode:string,  @Path('referencKey') referencKey: string):
   Observable<NotificationLogModel[]> {
    return null;
  }


  @GET('/Layout/{layoutId}')
  public GetLayoutById
  ( @Path('layoutId') layoutId: string):
   Observable<NotificationLayoutModel> {
    return null;
  }




  @POST("/Template", null)
  public addTemplate(
   @Body templateModel: NotificationTemplateModel): Observable<any> {
    return null;
  }

  @PUT("/Template/{categoryId}/{notificationId}/{templateName}")
  public editTemplate(
   @Path('categoryId') categoryId: string,@Path('notificationId') notificationId: string,@Path('templateName') templateName:string,@Body templateModel: any): Observable<any> {
    return null;
  }
}
