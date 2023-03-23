import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET, HttpService, Header, Query, Path } from '@exxat/fusion/core';
import {
  LaunchDataModel,
  Organization,
  OrgUnitInformation,
  OuCodeAccessTree,
} from '@exxat/fusion/models';

@Injectable({providedIn:'any'})
export class MetaApiClient extends HttpService {
  constructor() {
    super();
  }

  protected getBaseUrl(): string {
    return this.configService.getservice('foundation.meta').endpoint;
  }

  @GET('/launch')
  Launch(
    @Header('TenantId') header: string,
    @Header('Oucodes') oucodes: string
  ): Observable<LaunchDataModel[]> {
    return null;
  }

  @GET('/launch/{tenantId}')
  LaunchTenant(
    @Header('TenantId') header: string,
    @Header('Oucodes') oucodes: string,
    @Path('tenantId') tenantId: string
  ): Observable<LaunchDataModel[]> {
    return null;
  }

  @GET('/OrgUnit/GetOrgUnitsInformation')
  getOrgUnitInformation(
    @Header('TenantId') tenantHeader: string,
    @Query('oucodes') oucodes: string[]
  ): Observable<OrgUnitInformation[]> {
    return null;
  }

  @GET('/ManageAccount/GetStudentNavigation')
  getStudentNavigation(
    @Query('tenantId') tenantId: string,
    @Query('oucode') oucode: string
  ): Observable<any> {
    return null;
  }

  @GET<OuCodeAccessTree>('/OrgUnit/GetProgramsWithOucode')
  getAllOrgUnitInformation(): Observable<OuCodeAccessTree> {
    return null;
  }

  @GET<Organization>('/Organization/{id}')
  public getOrganizationInformation(
    @Path('id') id: any
  ): Observable<Organization> {
    return null;
  }
}
