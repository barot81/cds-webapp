import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FuseDirectivesModule,
  FuseSharedModule,
  MaterialModule,
} from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ExxatAppsRepoRoutingModule } from './exxat-apps-repo-routing.module';
import { ExxatAppsRepoComponent } from './exxat-apps-repo/exxat-apps-repo.component';

@NgModule({
  declarations: [ExxatAppsRepoComponent],
  imports: [
    CommonModule,
    ExxatAppsRepoRoutingModule,
    FuseSharedModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FuseDirectivesModule,
  ],
})
export class ExxatAppsRepoModule {}
