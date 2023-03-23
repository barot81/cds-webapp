import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  FusionConfigService,
  GET,
  Header,
  HttpService,
} from '@exxat/fusion/core';

@Injectable({ providedIn: 'any' })
export class LookupAPIClientService extends HttpService {
  constructor(protected _fusionConfigService: FusionConfigService) {
    super();
  }

  getBaseUrl() {
    return this.configService.getservice('settingdictionary').endpoint;
  }

  @GET<any>('Labels')
  public getSettingDictionary(
    @Header('TenantId') tenantId: string,
    @Header('OuCodes') ouCodes: string,
    @Header('OuCodename') OuCodename: string
  ): Observable<any> {
    return null;
  }
}
