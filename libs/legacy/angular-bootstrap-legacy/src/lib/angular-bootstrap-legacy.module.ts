import { NgModule } from '@angular/core';
import { HammerModule } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { zhealthcareAngularOuthOIDCModule } from '@zhealthcare-core/angular-oauth-oidc';
import { AccountModule } from '@zhealthcare/account';
import { FusionModule } from '@zhealthcare/fusion';
import {
  FuseSidebarModule,
  MaterialModule,
  FuseProgressBarModule,
  FuseSharedModule,
  FuseDirectivesModule,
  LayoutModule,
} from '@zhealthcare/ux';
import { ZendeskModule } from '@zhealthcare/zendesk';

import { ZhealthcareAngularBootstrapLegacyComponent } from './bootstrap-legacy/bootstrap-legacy.component';
import { zhealthcareBootstrapLegacyRoutingModule } from './bootstrap-legacy/bootstrap-legacy-routing.module';

@NgModule({
  declarations: [ZhealthcareAngularBootstrapLegacyComponent],
  exports: [ZhealthcareAngularBootstrapLegacyComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FuseSidebarModule,
    AccountModule,
    MaterialModule,
    FuseProgressBarModule,
    FuseSharedModule,
    LayoutModule,
    FuseDirectivesModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    HammerModule,
    SimpleNotificationsModule.forRoot(),
    FusionModule,
    zhealthcareAngularOuthOIDCModule,
    ZendeskModule,
    StoreDevtoolsModule.instrument({
      maxAge: 20,
      logOnly: true,
    }),
    zhealthcareBootstrapLegacyRoutingModule
  ],
})
export class ZhealthcareAngularBootstrapLegacyModule {}
