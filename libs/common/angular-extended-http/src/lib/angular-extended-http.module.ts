import {
  HttpClientJsonpModule,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';

import { ExtendedHttpInterceptors } from './interceptor';
import { EXTENDED_HTTP_PROVIDERS } from './service';
import { setAppInjector } from './utils';

@NgModule({
  imports: [HttpClientModule, HttpClientJsonpModule],
  providers: [
    ...EXTENDED_HTTP_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ExtendedHttpInterceptors,
      multi: true,
    },
  ],
})
export class ExxatAngularExtendedHttpModule {
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
}
