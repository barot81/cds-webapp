import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Sandbox } from '@zhealthcare/fusion/core';
import { FacilityApiClient } from './facility-clinet.service';

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

export class StatusCount {
  constructor(public name: string, public count: number) {}

}
