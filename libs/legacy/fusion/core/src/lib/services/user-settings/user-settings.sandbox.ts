import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserSettingsApiClient } from './user-settings.apiClient';
import { UserSettingsModel } from './user-settings.model';

@Injectable({
  providedIn: 'any',
})
export class UserSettingsSandbox {
  constructor(private userSettingsApiClient: UserSettingsApiClient) {}

  getUserSettings(userId): Observable<UserSettingsModel> {
    return of(
      { userId:userId, theme:{ colorScheme :"theme-blue",mode :"light"}
    }
    );
  }

  updateUserSettings(userSettings): Observable<UserSettingsModel> {
    return of(userSettings);
  }
}
