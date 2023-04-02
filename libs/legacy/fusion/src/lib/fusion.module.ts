import { CommonModule } from '@angular/common';
import { Injector, NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DelegatorComponent,
  zhealthcareAgreementComponent,
  UserConsentComponent,
} from '@zhealthcare/fusion/components';
import {
  AuthGuardService,
  BaseCoreModule,
  BaseSessionTimeoutComponent,
  DelegatorSessionTimeoutComponent,
  loadRemoteModuleFromDefinitions,
  setAppInjector,
} from '@zhealthcare/fusion/core';
import { CustomDirectiveModule } from '@zhealthcare/fusion/directives';
import {
  ExportExcelModule,
  RoleNavigationModule,
} from '@zhealthcare/fusion/services';

const appRoutes: Routes = [
  { path: 'gateway/delegator', component: DelegatorComponent },
  {
    path: 'session-timeout',
    component: BaseSessionTimeoutComponent,
  },
  {
    path: 'delegator/session-timeout',
    component: DelegatorSessionTimeoutComponent,
  },
  {
    path: 'UserConsent',
    component: UserConsentComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'zhealthcareAgreement/PrivacyPolicy',
    component: zhealthcareAgreementComponent,
    data: { id: 'privacypolicy' },
  },
  {
    path: 'zhealthcareAgreement/TermsOfUse',
    component: zhealthcareAgreementComponent,
    data: { id: 'termsofuse' },
  },
  {
    path: 'releasenotes',
    loadChildren: () =>
      loadRemoteModuleFromDefinitions(
        'release-notes',
        './Module',
        'RemoteEntryModule'
      ),
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BaseCoreModule,
    CustomDirectiveModule,
    RouterModule,
    RoleNavigationModule,
    ExportExcelModule,
    RouterModule.forChild(appRoutes),
  ],
  declarations: [],
  providers: [AuthGuardService],
  exports: [CustomDirectiveModule],
})
export class FusionModule {
  constructor(
    injector: Injector,
    @Optional() @SkipSelf() parentModule: FusionModule
  ) {
    setAppInjector(injector);
    if (parentModule) {
      throw new Error(
        'Fusion Module is already loaded. Import it in the AppModule only!'
      );
    }
  }
}
