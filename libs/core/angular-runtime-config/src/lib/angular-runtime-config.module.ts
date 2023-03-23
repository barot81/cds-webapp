import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { RuntimeConfig } from './runtime-config';
import { RuntimeConfigLoaderService } from './runtime-config-loader/runtime-config-loader.service';

export function initConfig(
  configSvc: RuntimeConfigLoaderService
): () => Promise<void> {
  return () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<void>(async (resolve) => {
      if (configSvc.getConfigURL()) {
        await lastValueFrom(configSvc.loadConfig());
      }
      return resolve();
    });
  };
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    RuntimeConfigLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [RuntimeConfigLoaderService],
      multi: true,
    },
  ],
})
export class ExxatAngularRuntimeConfigModule {
  static forRoot(
    config: RuntimeConfig
  ): ModuleWithProviders<ExxatAngularRuntimeConfigModule> {
    return {
      ngModule: ExxatAngularRuntimeConfigModule,
      providers: [
        {
          provide: RuntimeConfig,
          useValue: config,
        },
        RuntimeConfigLoaderService,
      ],
    };
  }
}
