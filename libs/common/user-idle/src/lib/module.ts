import { ModuleWithProviders, NgModule } from '@angular/core';

import { Idle } from './idle';
import { IdleExpiry } from './idleexpiry';
import { LocalStorage } from './localstorage';
import { LocalStorageExpiry } from './localstorageexpiry';

@NgModule({
  providers: [LocalStorage]
})
export class zhealthcareCoreIdleModule {
  static forRoot(): ModuleWithProviders<zhealthcareCoreIdleModule> {
    return {
      ngModule: zhealthcareCoreIdleModule,
      providers: [
        LocalStorageExpiry,
        { provide: IdleExpiry, useExisting: LocalStorageExpiry },
        Idle
      ]
    };
  }
}
