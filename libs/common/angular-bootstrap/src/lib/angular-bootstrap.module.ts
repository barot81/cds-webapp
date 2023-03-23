import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleNotificationsModule } from 'angular2-notifications';

import {
  FuseSidebarModule,
  MaterialModule,
  FuseProgressBarModule,
  FuseSharedModule,
  LayoutModule,
  FuseDirectivesModule,
} from '@exxat/ux';
import { FusionModule } from '@exxat/fusion';
import { ZendeskModule } from '@exxat/zendesk';

import { ExxatAngularBootstrapRoutingModule } from './bootstrap/bootstrap-routing.module';
import { ExxatAngularBootstrapComponent } from './bootstrap/bootstrap.component';

@NgModule({
  imports: [
    CommonModule,
    FusionModule,
    MaterialModule,
    FuseSidebarModule,
    FuseProgressBarModule,
    FuseSharedModule,
    LayoutModule,
    FuseDirectivesModule,
    ZendeskModule,
    SimpleNotificationsModule.forRoot(),
    ExxatAngularBootstrapRoutingModule,
  ],
  declarations: [ExxatAngularBootstrapComponent],
})
export class ExxatAngularBootstrapModule {}
