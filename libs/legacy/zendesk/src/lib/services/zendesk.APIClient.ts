import { Injectable } from '@angular/core';
import {
  Body,
  FusionConfigService,
  GET,
  HttpService,
  POST,
  PUT,
  Query,
} from '@zhealthcare/fusion/core';
import { Observable } from 'rxjs';

@Injectable()
export class ZendeskAPIClient extends HttpService {
  constructor(private _fusionConfigService: FusionConfigService) {
    super();
  }

  override getBaseUrl(): string {
    return this._fusionConfigService.getservice('prismChatURL')?.endpoint;
  }

  @POST('token', null)
  public getToken(@Body userDetails: any): Observable<any> {
    return null;
  }

  @GET('organization')
  public organization(): Observable<any> {
    return null;
  }

  @GET('user')
  public user(@Query('email') email: string): Observable<any> {
    return null;
  }

  @POST('user', null)
  public createUser(@Body user: any): Observable<any> {
    return null;
  }

  @GET('requests')
  public getRequests(): Observable<any> {
    return null;
  }

  @POST('requests', null)
  public createRequest(@Body ticket: any): Observable<any> {
    return null;
  }

  @PUT('requests')
  public updateRequest(
    @Query('ticketId') ticketId: string,
    @Body ticket: any
  ): Observable<any> {
    return null;
  }

  @GET('requests/comments')
  public getRequestComments(
    @Query('ticketID') ticketID: number
  ): Observable<any> {
    return null;
  }
}
