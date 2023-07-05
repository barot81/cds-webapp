import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { FusionConfigService } from '@zhealthcare/fusion/core';
import { MaterialModule } from '@zhealthcare/ux';
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
const isIE = window.navigator.userAgent.indexOf('MSIE') > 0 ||
window.navigator.userAgent.indexOf('Trident/') > 0

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: 'ccdf8d9f-bd27-49d3-8239-8f37dcaeae99',
          redirectUri: 'http://localhost:5200',
          authority: 'https://login.microsoftonline.com/ed1842b4-e4ca-4da6-8587-1f81a3cffa8f',
          knownAuthorities: ['https://login.microsoftonline.com/ed1842b4-e4ca-4da6-8587-1f81a3cffa8f']
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE
        }
      }),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
         scopes:['user.read']
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap:new Map([
          ['localhost',['api://9e11a7a0-8ceb-4b31-a905-1a979b097247/resource.patient']],
          ['https://graph.microsoft.com/v1.0/me',['user.Read']]
        ])
      }
    ),
  ],
  exports: [AzureAdIdentityComponent],
  declarations: [AzureAdIdentityComponent],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: MsalInterceptor,
        multi: true
    },
    MsalGuard
    //{
    //     provide: MSAL_INSTANCE,
    //     useFactory: MSALInstanceFactory
    // },
    // {
    //     provide: MSAL_GUARD_CONFIG,
    //     useFactory: MSALGuardConfigFactory
    // }, {
    //     provide: MSAL_INTERCEPTOR_CONFIG,
    //     useFactory: MSALInterceptorConfigFactory
    // },
    // MsalService,
    // MsalGuard,
    // MsalBroadcastService,
  ]})
export class AzureAdIdentityModule {
  static forRoot(): ModuleWithProviders<AzureAdIdentityModule> {
    return {
      ngModule: AzureAdIdentityModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: azureAdInitialize,
          deps: [FusionConfigService],
          multi: true,
        },
        // { provide: AuthConfig, useValue: authConfig },
        // { provide: OAuthModuleConfig, useValue: authModuleConfig },
        // { provide: OAuthStorage, useFactory: storageFactory, deps: [CustomStorageService] }
      ],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: AzureAdIdentityModule) {
    if (parentModule) {
      throw new Error(
        'AzureAdIdentityModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
