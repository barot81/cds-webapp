import { Injectable } from '@angular/core';
import { FusionConfigService, GET, HttpService } from '@exxat/fusion/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReleaseNotesApiClient extends HttpService {
  config;
  constructor(protected _fusionConfigService: FusionConfigService) {
    super();
  }

  getBaseUrl(): string {
    this.encryptionEnabled = false;
    return this._fusionConfigService.getservice('tenantonboarding').endpoint;
  }

  @GET('/ReleaseNote/GetReleaseNoteList')
  GetReleaseNotesNameList(): Observable<any> {
    return null;
  }
}
