import { Injectable } from '@angular/core';
import {
  FusionConfigService,
  HttpService,
} from '@zhealthcare/fusion/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FacilityApiClient extends HttpService {
  constructor(protected _fusionConfigService: FusionConfigService) {
    super();
  }

  getBaseUrl() {
    return this._fusionConfigService.getservice('facility').endpoint;
  }

  public getFacilities(): Observable<any> {
    return this.httpClient.get(`${this.getBaseUrl()}/facilities`)
    .pipe( map( (facilities:[]) => facilities.map(x => new FacilityModel(x, x)) ));
  }

  public getFacilityStatues(facilityId: string): Observable<FacilityStatusModel[]> {
    return this.httpClient.get<FacilityStatusModel[]>(`${this.getBaseUrl()}/Facilities/${facilityId}/statuses`);
  }

}

export class FacilityModel {
  constructor(public tenantId: string,
    public name: string){}
}

export class FacilityStatusModel {

  constructor(public name: string, public count: number) {}
}
