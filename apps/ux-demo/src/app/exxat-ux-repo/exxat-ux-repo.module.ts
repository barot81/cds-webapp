import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { zhealthcareUxRepoRoutingModule } from './zhealthcare-ux-repo-routing.module';
import { zhealthcareUxRepoComponent } from './zhealthcare-ux-repo/zhealthcare-ux-repo.component';
import {
  FuseSharedModule,
  FuseThemeOptionsModule,
  MaterialModule,
  FuseDirectivesModule,
} from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [zhealthcareUxRepoComponent],
  imports: [
    CommonModule,
    zhealthcareUxRepoRoutingModule,
    FuseSharedModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FuseThemeOptionsModule,
    FuseDirectivesModule,
  ],
})
export class zhealthcareUxRepoModule {}
