import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FuseDirectivesModule,
  FuseSharedModule,
  MaterialModule,
} from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { zhealthcareAppsRepoRoutingModule } from './zhealthcare-apps-repo-routing.module';
import { zhealthcareAppsRepoComponent } from './zhealthcare-apps-repo/zhealthcare-apps-repo.component';

@NgModule({
  declarations: [zhealthcareAppsRepoComponent],
  imports: [
    CommonModule,
    zhealthcareAppsRepoRoutingModule,
    FuseSharedModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FuseDirectivesModule,
  ],
})
export class zhealthcareAppsRepoModule {}
