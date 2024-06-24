import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RemoteEntryComponent } from './entry.component';
import {
  FlexTableModule,
  FuseDirectivesModule,
  FuseSharedModule,
  FuseSidebarModule,
  FuseThemeOptionsModule,
  LayoutModule,
} from '@zhealthcare/ux';
import { StoreModule } from '@ngrx/store';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RemoteEntryRoutingModule } from './entry.routing.module';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    LayoutModule,
    FuseSharedModule,
    FuseDirectivesModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
    FlexLayoutModule,
    FlexTableModule,
    StoreModule,
    RemoteEntryRoutingModule,
  ],
  providers: [DatePipe],
})
export class RemoteEntryModule {}
