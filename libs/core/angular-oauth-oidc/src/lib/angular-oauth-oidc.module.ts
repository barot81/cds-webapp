import { HttpClientModule } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import {
  AuthConfig,
  OAuthModule,
  OAuthModuleConfig,
  OAuthStorage,
} from 'angular-oauth2-oidc';

import { authAppInitializerFactory } from './initializer/auth-app-initializer.factory';
import { AuthService } from './services/auth.service';
import { CustomStorageService } from './services/storage.service';

export function storageFactory(
  customStorage: CustomStorageService
): OAuthStorage {
  return customStorage;
}

@NgModule({
  imports: [HttpClientModule, OAuthModule.forRoot()],
  providers: [],
})
export class zhealthcareAngularOuthOIDCModule {
  static forRoot(
    authConfig?: AuthConfig,
    authModuleConfig?: OAuthModuleConfig
  ): ModuleWithProviders<zhealthcareAngularOuthOIDCModule> {
    if (authConfig) {
      return {
        ngModule: zhealthcareAngularOuthOIDCModule,
        providers: [
          {
            provide: APP_INITIALIZER,
            useFactory: authAppInitializerFactory,
            deps: [AuthService],
            multi: true,
          },
          { provide: AuthConfig, useValue: authConfig },
          { provide: OAuthModuleConfig, useValue: authModuleConfig },
          // { provide: OAuthStorage, useFactory: storageFactory, deps: [CustomStorageService] }
        ],
      };
    } else {
      return {
        ngModule: zhealthcareAngularOuthOIDCModule,
      };
    }
  }

  constructor(
    @Optional() @SkipSelf() parentModule: zhealthcareAngularOuthOIDCModule
  ) {
    if (parentModule) {
      throw new Error(
        'zhealthcareAngularOuthOIDCModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
