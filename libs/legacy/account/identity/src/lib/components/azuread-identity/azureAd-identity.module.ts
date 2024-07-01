import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, ProtectedResourceScopes } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { FusionConfigService } from '@zhealthcare/fusion/core';
import { MaterialModule } from '@zhealthcare/ux';
import { loginRequest, msalConfig, protectedResources } from './auth-config';
import { AzureAdIdentityComponent } from './azuread-identity.component';

export function azureAdInitialize(
  configService: FusionConfigService
): () => Promise<void> {
  return () => {
    return configService.get('azureAd');
  };
}

// export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
//   const protectedResourceMap = new Map < string,
//       Array < string >> ();
//   protectedResourceMap.set(protectedResources.todoListApi.endpoint, protectedResources.todoListApi.scopes);
//   return {
//       interactionType: InteractionType.Redirect,
//       protectedResourceMap
//   };
// }
// export function MSALGuardConfigFactory(): MsalGuardConfiguration {
//   return {
//       interactionType: InteractionType.Redirect,
//       authRequest: loginRequest
//   };
// }
/**
 * Here we pass the configuration parameters to create an MSAL instance.
 * For more info, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/configuration.md
 */
 export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

/**
* MSAL Angular will automatically retrieve tokens for resources
* added to protectedResourceMap. For more info, visit:
* https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md#get-tokens-for-web-api-calls
*/
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string | ProtectedResourceScopes> | null>();

  protectedResourceMap.set(protectedResources.apiTodoList.endpoint, [
      {
          httpMethod: 'GET',
          scopes: [...protectedResources.apiTodoList.scopes.read]
      },
      {
          httpMethod: 'POST',
          scopes: [...protectedResources.apiTodoList.scopes.write]
      },
      {
          httpMethod: 'PUT',
          scopes: [...protectedResources.apiTodoList.scopes.write]
      },
      {
          httpMethod: 'DELETE',
          scopes: [...protectedResources.apiTodoList.scopes.write]
      }
  ]);

  return {
      interactionType: InteractionType.Popup,
      protectedResourceMap,
  };
}

/**
* Set your default interaction type for MSALGuard here. If you have any
* additional scopes you want the user to consent upon login, add them here as well.
*/
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
      interactionType: InteractionType.Redirect,
      authRequest: loginRequest
  };
}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    MsalModule
  ],
  exports: [AzureAdIdentityComponent],
  declarations: [AzureAdIdentityComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
  },
  {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
  },
  {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
  },
  {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
  },
  MsalService,
  MsalBroadcastService,
  MsalGuard,
  ]})
export class AzureAdIdentityModule {

  constructor(@Optional() @SkipSelf() parentModule: AzureAdIdentityModule) {
    if (parentModule) {
      throw new Error(
        'AzureAdIdentityModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
