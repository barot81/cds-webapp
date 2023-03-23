import { Injectable } from '@angular/core';
import {
  FusionConfigService,
  GET,
  HttpService,
  Path,
} from '@exxat/fusion/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TenantInformationApiClient extends HttpService {
  constructor(protected _fusionConfigService: FusionConfigService) {
    super();
  }

  getBaseUrl() {
    return this._fusionConfigService.getservice('foundation.meta').endpoint;
  }

  @GET<any>('/Tenant')
  public getTenantInformation(): Observable<any> {
    return null;
  }

  @GET<any>('/Program/{tenantId}')
  public programs(@Path('tenantId') tenantId: any): Observable<any> {
    return null;
  }
}
