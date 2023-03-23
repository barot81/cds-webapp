import { CommonModule } from '@angular/common';
import { Injector, NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DelegatorComponent,
  ExxatAgreementComponent,
  UserConsentComponent,
} from '@exxat/fusion/components';
import {
  AuthGuardService,
  BaseCoreModule,
  BaseSessionTimeoutComponent,
  DelegatorSessionTimeoutComponent,
  loadRemoteModuleFromDefinitions,
  setAppInjector,
} from '@exxat/fusion/core';
import { CustomDirectiveModule } from '@exxat/fusion/directives';
import {
  ExportExcelModule,
  RoleNavigationModule,
} from '@exxat/fusion/services';

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
    path: 'ExxatAgreement/PrivacyPolicy',
    component: ExxatAgreementComponent,
    data: { id: 'privacypolicy' },
  },
  {
    path: 'ExxatAgreement/TermsOfUse',
    component: ExxatAgreementComponent,
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
        'FuseModule is already loaded. Import it in the AppModule only!'
      );
    }
  }
}
