import { Injectable } from '@angular/core';
import {
  Body,
  GET,
  Header,
  HttpService,
  Path,
  PUT
} from '../../asyncServices/http';
import { Observable } from 'rxjs';
import { UserSettingsModel } from './user-settings.model';

@Injectable({
  providedIn: 'any',
})
export class UserSettingsApiClient extends HttpService {
  config = '';
  constructor() {
    super();
  }

  getBaseUrl() {
    return this.config;
  }

  @GET<any>('/UserSettings/{id}')
  public getUserSettings(
    @Header('TenantId') header: string,
    @Header('Oucodes') oucodes: string,
    @Path('id') id: number
  ): Observable<UserSettingsModel> {
    return null;
  }

  @PUT('/UserSettings')
  public updateUserSettings(
    @Header('TenantId') tenantId: string,
    @Header('Oucodes') oucodes: string,
    @Body any
  ): Observable<UserSettingsModel> {
    return null;
  }
}
