import { HttpClient } from '@angular/common/http';

import { RuntimeConfigLoaderService } from '@zhealthcare-core/angular-runtime-config';

import { environment } from '../environments/environment'

export function fetchRuntimeConfigFactory(
  http: HttpClient,
  config: RuntimeConfigLoaderService
): () => Promise<void> {
  return () => {
    return new Promise((resolve) => {
      config.setConfigObject(environment);
      resolve();
    });
  };
}
