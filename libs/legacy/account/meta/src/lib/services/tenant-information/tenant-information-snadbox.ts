import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Sandbox } from '@zhealthcare/fusion/core';
import { TenantInformationApiClient } from './tenant-information-clinet.service';

@Injectable({ providedIn: 'root' })
export class TenantInformationSandbox extends Sandbox {
  constructor(
    private readonly tenantInformationApiClient: TenantInformationApiClient
  ) {
    super();
  }

  public getFacilityInformationNameList(): Observable<any> {
    return this.tenantInformationApiClient.getFacilityInformation();
  }
}
