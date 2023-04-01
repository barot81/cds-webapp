import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { ZhealthcareAngularBootstrapLegacyModule } from '@zhealthcare-common/angular-bootstrap-legacy';
import { RuntimeConfigLoaderService } from '@zhealthcare-core/angular-runtime-config';

import { AppComponent } from './app.component';
import { fetchRuntimeConfigFactory } from './appinit-factory';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ZhealthcareAngularBootstrapLegacyModule
  ],
  providers: [
    RuntimeConfigLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: fetchRuntimeConfigFactory,
      deps: [HttpClient, RuntimeConfigLoaderService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
