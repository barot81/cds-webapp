import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Sandbox } from '@exxat/fusion/core';
import { TenantInformationApiClient } from './tenant-information-clinet.service';

@Injectable({ providedIn: 'root' })
export class TenantInformationSandbox extends Sandbox {
  constructor(
    private readonly tenantInformationApiClient: TenantInformationApiClient
  ) {
    super();
  }

  public getTenantInformationNameList(): Observable<any> {
    return this.tenantInformationApiClient.getTenantInformation();
  }

  programs(tenantId: string): Observable<any> {
    return this.tenantInformationApiClient.programs(tenantId);
  }
}
