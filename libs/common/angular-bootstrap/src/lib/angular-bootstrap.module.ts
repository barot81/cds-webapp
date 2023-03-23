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
} from '@zhealthcare/ux';
import { FusionModule } from '@zhealthcare/fusion';
import { ZendeskModule } from '@zhealthcare/zendesk';

import { zhealthcareAngularBootstrapRoutingModule } from './bootstrap/bootstrap-routing.module';
import { zhealthcareAngularBootstrapComponent } from './bootstrap/bootstrap.component';

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
    zhealthcareAngularBootstrapRoutingModule,
  ],
  declarations: [zhealthcareAngularBootstrapComponent],
})
export class zhealthcareAngularBootstrapModule {}
