import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GET, HttpService, Header, Query, Path } from '@zhealthcare/fusion/core';
import {
  LaunchDataModel,
  Organization,
  OrgUnitInformation,
  OuCodeAccessTree,
  TenantWithOuCodeTree,
} from '@zhealthcare/fusion/models';
import { Facilities } from './data/facilities';
import { InhousePatientStatistics } from './data/inhouse-patient-statistics';

@Injectable({providedIn:'any'})
export class MetaApiClient extends HttpService {
  constructor() {
    super();
  }

  protected getBaseUrl(): string {
    return this.configService.getservice('foundation.meta').endpoint;
  }

  Launch(
    header: string,
    oucodes: string
  ): Observable<LaunchDataModel> {
    const statistics = InhousePatientStatistics.map(x=> new OuCodeAccessTree(x.name, x.count, x.url, x.fullName, false, []));
    const facilities = Facilities.map(x=> {
      return {
      key: x.name,
      value: statistics
    }
  });
  return of(new LaunchDataModel(facilities, null, null));
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
