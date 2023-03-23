import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSettingsApiClient } from './user-settings.apiClient';
import { UserSettingsModel } from './user-settings.model';

@Injectable({
  providedIn: 'any',
})
export class UserSettingsSandbox {
  constructor(private userSettingsApiClient: UserSettingsApiClient) {}

  getUserSettings(userId): Observable<UserSettingsModel> {
    return this.userSettingsApiClient.getUserSettings('Base', '1000', userId);
  }

  updateUserSettings(userSettings): Observable<UserSettingsModel> {
    return this.userSettingsApiClient.updateUserSettings(
      'Base',
      '1000',
      userSettings
    );
  }
}
