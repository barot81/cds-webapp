import { Injectable } from '@angular/core';
import {
  FusionConfigService,
  HttpService,
} from '@zhealthcare/fusion/core';
import { StatusCount } from '@zhealthcare/fusion/models';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FacilityApiClient extends HttpService {
  constructor(protected _fusionConfigService: FusionConfigService) {
    super();
  }

  getBaseUrl() {
    return this._fusionConfigService.getservice('facility').endpoint;
  }

  public getFacilities(): Observable<FacilityModel[]> {
    return this.httpClient.get(`${this.getBaseUrl()}/facilities`)
    .pipe( map( (facilities:[]) => facilities.map(x => new FacilityModel(x, x)) ));
  }

  public getFacilityStatues(facilityId: string): Observable<StatusCount[]> {
    return this.httpClient.get<StatusCount[]>(`${this.getBaseUrl()}/Facilities/${facilityId}/statuses`);
  }

}

export class FacilityModel {
  constructor(public tenantId: string,
    public name: string){}
}

