import { ModuleWithProviders, NgModule } from '@angular/core';

import { Idle } from './idle';
import { IdleExpiry } from './idleexpiry';
import { LocalStorage } from './localstorage';
import { LocalStorageExpiry } from './localstorageexpiry';

@NgModule({
  providers: [LocalStorage]
})
export class ExxatCoreIdleModule {
  static forRoot(): ModuleWithProviders<ExxatCoreIdleModule> {
    return {
      ngModule: ExxatCoreIdleModule,
      providers: [
        LocalStorageExpiry,
        { provide: IdleExpiry, useExisting: LocalStorageExpiry },
        Idle
      ]
    };
  }
}
