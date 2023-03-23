import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuntimeConfigLoaderService } from '@zhealthcare-core/angular-runtime-config';

import { setMFConfig } from './load-remote';

export function setRemoteConfig(
  configSvc: RuntimeConfigLoaderService
): () => Promise<void> {
  return () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<void>(async (resolve) => {
      const config = configSvc.getConfig();
      if (config?.appSettings?.microfrontends) {
        setMFConfig(config.appSettings.microfrontends);
      }
      return resolve();
    });
  };
}

@NgModule({
  imports: [CommonModule],
  providers: [
    RuntimeConfigLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: setRemoteConfig,
      deps: [RuntimeConfigLoaderService],
      multi: true,
    },
  ],
})
export class zhealthcareAngularMfModule {}
