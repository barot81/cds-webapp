import { Injectable } from '@angular/core';
import { Sandbox } from '@zhealthcare/fusion/core';
import { Observable } from 'rxjs';
import { MetaApiClient } from './meta.ApiClient';
import {
  LaunchDataModel,
  OrgUnitInformation,
} from '@zhealthcare/fusion/models';

@Injectable({providedIn:'any'})
export class MetaSandbox extends Sandbox {
  constructor(private metaApiClient: MetaApiClient) {
    super();
  }

  // public launch(): Observable<LaunchDataModel> {
  //   return this.metaApiClient.Launch('Base', '1000');
  // }

  public launchTenant(tenantId: string): Observable<LaunchDataModel[]> {
    return this.metaApiClient.LaunchTenant('Base', '1000', tenantId);
  }

  public getOrgUnitInformation(
    tenantId: string,
    oucodes: string[]
  ): Observable<OrgUnitInformation[]> {
    return this.metaApiClient.getOrgUnitInformation(tenantId, oucodes);
  }

  public getStudentNavigation(tenantId, oucode): Observable<any> {
    return this.metaApiClient.getStudentNavigation(tenantId, oucode);
  }

}
