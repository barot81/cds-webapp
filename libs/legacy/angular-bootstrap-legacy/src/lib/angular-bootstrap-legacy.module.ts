import { NgModule } from '@angular/core';
import { HammerModule } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { ExxatAngularOuthOIDCModule } from '@exxat-core/angular-oauth-oidc';
import { AccountModule } from '@exxat/account';
import { FusionModule } from '@exxat/fusion';
import {
  FuseSidebarModule,
  MaterialModule,
  FuseProgressBarModule,
  FuseSharedModule,
  FuseDirectivesModule,
  LayoutModule,
} from '@exxat/ux';
import { ZendeskModule } from '@exxat/zendesk';

import { ExxatAngularBootstrapLegacyComponent } from './bootstrap-legacy/bootstrap-legacy.component';
import { ExxatBootstrapLegacyRoutingModule } from './bootstrap-legacy/bootstrap-legacy-routing.module';

@NgModule({
  declarations: [ExxatAngularBootstrapLegacyComponent],
  exports: [ExxatAngularBootstrapLegacyComponent],
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
    ExxatAngularOuthOIDCModule,
    ZendeskModule,
    StoreDevtoolsModule.instrument({
      maxAge: 20,
      logOnly: true,
    }),
    ExxatBootstrapLegacyRoutingModule
  ],
})
export class ExxatAngularBootstrapLegacyModule {}
