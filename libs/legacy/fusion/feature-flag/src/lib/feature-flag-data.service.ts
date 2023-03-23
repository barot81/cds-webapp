import { Injectable } from '@angular/core';

import {
  FusionConfigService,
  GET,
  Header,
  HttpService,
} from '@zhealthcare/fusion/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagDataService extends HttpService {
  constructor(protected _fusionConfigService: FusionConfigService) {
    super();
  }

  override getBaseUrl() {
    return this.configService.getservice('featureflag').endpoint;
  }

  @GET<Record<string, { value: string; description: string }>>('Features')
  getFeatureFlags(
    @Header('TenantId') TenantId: string
  ): Observable<Record<string, { value: string; description: string }>> {
    return null as unknown as any;
  }
}
