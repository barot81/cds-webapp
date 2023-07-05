/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { FusionModule } from '@zhealthcare/fusion';
import { AuthGuardService } from '@zhealthcare/fusion/core';
import { FeatureMetaDataPipesModule } from '@zhealthcare/fusion/pipes';
import {
  zhealthcareSnackBarModule,
  zhealthcareTooltipModule,
  FusePipesModule,
  IdentityComponentMapService,
  MaterialModule,
  SharedComponentsAccountModule,
} from '@zhealthcare/ux';
import { RecaptchaModule } from 'ng-recaptcha';
import { LockOutDialogComponent } from './components/account-lockout/lockoutdialog.component';
import { AccountSettingComponent } from './components/account/account-setting/account-setting.component';
import { TermsOfUseComponent } from './components/account/account-setting/terms-of-use/terms-of-use.component';
import { AccountComponent } from './components/account/account.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoaderComponent } from './components/login/loader/loader.component';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordSuccessComponent } from './components/password-policy/change-password-succuess/change-password-success.component';
import { PasswordPolicyComponent } from './components/password-policy/password-policy.component';
import { RequestComponent } from './components/sso/request/request.component';
import { ResponseComponent } from './components/sso/response/response.component';
import { RedirectComponent } from './components/v3-v4-integration/external-redirect.component';
import { V3RedirectComponent } from './components/v3-v4-integration/v3redirect.component';
import { V4RedirectComponent } from './components/v3-v4-integration/v4redirect.component';
import { NumberDirective } from './directives/numbers-only.directive';
import { IdentityApiClient } from './identity-api-client.service';
import { IdentitySandbox } from './identity.sandbox';
import { AccountNavigtaionService } from './services/account-navigation.service';
import { LoginActivationGuard } from './services/login-activation-guard.service';
import { UserNameResolver } from './services/userName.resolver.service';
import { AzureAdIdentityModule } from './components/azuread-identity/azureAd-identity.module';
export const externalUrlProvider = new InjectionToken(
  'externalUrlRedirectResolver'
);

const routes: Routes = [
  {
    path: 'account/login',
    component: LoginComponent,
    canActivate: [LoginActivationGuard],
  },
  {
    path: 'account/forgetPassword',
    component: ForgotPasswordComponent,
    resolve: {
      userName: UserNameResolver,
    },
  },
  {
    path: 'account/changePassword',
    component: PasswordPolicyComponent,
  },
  {
    path: 'account/changePasswordSuccess',
    component: ChangePasswordSuccessComponent,
  },
  {
    path: 'account/v4redirect',
    component: V4RedirectComponent,
  },
  {
    path: 'account/v3redirect',
    component: V3RedirectComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'sso/request',
    component: RequestComponent,
  },
  {
    path: 'sso/response',
    component: ResponseComponent,
  },
  {
    path: 'externalRedirect',
    resolve: {
      url: externalUrlProvider,
    },
    component: RedirectComponent,
  },
];
export const cachedComponent: any = '';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FusionModule,
    RecaptchaModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    zhealthcareTooltipModule,
    zhealthcareSnackBarModule,
    SharedComponentsAccountModule,
    FusePipesModule,
    FeatureMetaDataPipesModule,
    AzureAdIdentityModule,
  ],
  exports: [
    LoginComponent,
    AccountComponent,
    AccountSettingComponent,
    TermsOfUseComponent,
    LoaderComponent,
    AzureAdIdentityModule
  ],
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    AccountComponent,
    AccountSettingComponent,
    TermsOfUseComponent,
    LockOutDialogComponent,
    NumberDirective,
    V4RedirectComponent,
    V3RedirectComponent,
    RedirectComponent,
    RequestComponent,
    ResponseComponent,
    PasswordPolicyComponent,
    ChangePasswordSuccessComponent,
    LoaderComponent,
  ],
  providers: [
    IdentityApiClient,
    IdentitySandbox,
    IdentityComponentMapService,
    AccountNavigtaionService,
    {
      provide: externalUrlProvider,
      useValue: (route: ActivatedRouteSnapshot) => {
        const externalUrl = route.paramMap.get('externalUrl');
        window.open(externalUrl, '_self');
      },
    },
  ],
})
export class IdentityModule {}
