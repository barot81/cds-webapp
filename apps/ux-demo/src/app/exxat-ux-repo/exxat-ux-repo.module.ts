import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExxatUxRepoRoutingModule } from './exxat-ux-repo-routing.module';
import { ExxatUxRepoComponent } from './exxat-ux-repo/exxat-ux-repo.component';
import {
  FuseSharedModule,
  FuseThemeOptionsModule,
  MaterialModule,
  FuseDirectivesModule,
} from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ExxatUxRepoComponent],
  imports: [
    CommonModule,
    ExxatUxRepoRoutingModule,
    FuseSharedModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FuseThemeOptionsModule,
    FuseDirectivesModule,
  ],
})
export class ExxatUxRepoModule {}
