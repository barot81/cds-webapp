import { HttpClient } from '@angular/common/http';
import { concatMap, lastValueFrom } from 'rxjs';

import { RuntimeConfigLoaderService } from '@zhealthcare-core/angular-runtime-config';
import { setMFConfig } from '@zhealthcare-core/angular-mf';
import { AuthService } from '@zhealthcare-core/angular-oauth-oidc';

export function fetchRuntimeConfigFactory(
  http: HttpClient,
  configSrvc: RuntimeConfigLoaderService,
  authService: AuthService
): () => Promise<void> {
  return () => {
    return new Promise((resolve, reject) => {
      http
        .get(`${window.location.origin}/assets/config/config.json`)
        .pipe(
          concatMap(async (response: any) => {
            configSrvc.setConfigURL([`${response?.configUrl}`]);
            await lastValueFrom(configSrvc.loadConfig());
            const config = configSrvc.getConfig();
            setMFConfig(config?.appSettings?.microfrontends);
            authService.setAuthConfig(config?.authConfig);
            await authService.runInitialLoginSequence();
          })
        )
        .subscribe({
          next: () => {
            resolve();
          },
          error: (err) => {
            console.error('Error loading the configuration file', err);
            reject();
          },
        });
    });
  };
}
