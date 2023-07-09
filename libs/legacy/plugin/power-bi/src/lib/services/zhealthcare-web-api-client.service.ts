import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET, HttpService, Path, Query } from '@zhealthcare/fusion/core';

@Injectable({providedIn: 'any'})
export class PowerBIApiClient extends HttpService {
  constructor() {
    super();
  }

  protected getBaseUrl(): string {
    return this.configService.getservice('powerBI').endpoint;
  }

  @GET<any>('/Loadarlsdetails/{tenantid}')
  public getAccessToken(@Path('tenantid') tenantid: any): Observable<any> {
    return null;
  }

  @GET<any>('/Loadtenants')
  public getTanentId(): Observable<any> {
    return null;
  }

}
