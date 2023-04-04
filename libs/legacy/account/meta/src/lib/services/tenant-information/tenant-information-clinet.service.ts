import { Injectable } from '@angular/core';
import {
  FusionConfigService,
  GET,
  HttpService,
  Path,
} from '@zhealthcare/fusion/core';
import { Observable, of } from 'rxjs';
import { Facilities } from '../../data/facilities';

@Injectable({ providedIn: 'root' })
export class TenantInformationApiClient extends HttpService {

  constructor(protected _fusionConfigService: FusionConfigService) {
    super();
  }

  getBaseUrl() {
    return this._fusionConfigService.getservice('foundation.meta').endpoint;
  }

  public getFacilityInformation(): Observable<any> {
    return of(Facilities);
  }
}
