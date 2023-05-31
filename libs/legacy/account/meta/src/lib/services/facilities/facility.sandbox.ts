import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Sandbox } from '@zhealthcare/fusion/core';
import { FacilityApiClient } from './facility-clinet.service';
import { StatusCount } from '@zhealthcare/fusion/models';

@Injectable({ providedIn: 'root' })
export class FacilitySandbox extends Sandbox {
  constructor(
    private readonly facilityApiClient: FacilityApiClient
  ) {
    super();
  }

  public getFacilityNames(): Observable<any> {
    return this.facilityApiClient.getFacilities();
  }

  public getStatusCounts(facilityId: string): Observable<StatusCount[]> {
    return this.facilityApiClient.getFacilityStatues(facilityId);
  }
}

