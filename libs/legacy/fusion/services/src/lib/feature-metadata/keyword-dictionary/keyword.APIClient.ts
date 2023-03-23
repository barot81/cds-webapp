import {
  HttpService,
  GET,
  Header
} from '@zhealthcare/fusion/core';
import { Observable } from 'rxjs';
import { SettingsMap } from '@zhealthcare/fusion/models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class KeywordAPIClient extends HttpService {
  public serviceName: string;
  constructor() {
    super();
  }

  getBaseUrl(): string {
    return this.configService.getservice(this.serviceName).endpoint;
  }

  @GET<SettingsMap>('/settingdictionary')
  public getKeywordDictionary(
    @Header('OucodeName') OucodeName
  ): Observable<SettingsMap> {
    return null;
  }
}
