import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { POST, HttpService, Body, GET, Query } from '@zhealthcare/fusion/core';
import { Registration } from './models/registration.model';
import { Terms } from './models/terms.model';

@Injectable({providedIn: 'any'})
export class RegistrationApiClient extends HttpService {
  constructor() {
    super();
  }

  getBaseUrl() {
    return this.configService.getservice('foundation.registration').endpoint;
  }

  @GET<Terms[]>('/Agreement')
  public terms(): Observable<any> {
    return null;
  }

  // @GET<any>('/Registration')
  public getRegister(@Query('key') key: any): Observable<any> {
    return this.httpClient.get(this.getBaseUrl()+ "/Registration?key="+key);
  }

  @POST<Registration>('/Registration/Register',null)
  public register(@Body registration: Registration): Observable<Registration> {
    return null;
  }
}
