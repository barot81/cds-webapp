// This class might not be required.
// If we can successfully get FacultyID as a reference key in the UserModel

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GET,
  Path,
  HttpService,
  FusionConfigService,
} from '@zhealthcare/fusion/core';

@Injectable({providedIn: 'any'})
export class FacultyInformationApiClient extends HttpService {
  constructor(protected _fusionConfigService: FusionConfigService) {
    super();
  }

  getBaseUrl() {
    return this._fusionConfigService.getservice('plan.faculty').endpoint;
  }

  @GET<any>('/Information/GetInformationByUserId/{userId}')
  public getFacultyInfoByUserId(@Path('userId') userId: any): Observable<any> {
    return null;
  }
}
