import { HttpClient } from '@angular/common/http';
import { concatMap, lastValueFrom } from 'rxjs';

import { RuntimeConfigLoaderService } from '@exxat-core/angular-runtime-config';

export function fetchRuntimeConfigFactory(
  http: HttpClient,
  config: RuntimeConfigLoaderService
): () => Promise<void> {
  return () => {
    return new Promise((resolve, reject) => {
      http
        .get(`${window.location.origin}/assets/config/config.json`)
        .pipe(
          concatMap(async (response: any) => {
            config.setConfigURL([`${response?.configUrl}`]);
            await lastValueFrom(config.loadConfig());
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
