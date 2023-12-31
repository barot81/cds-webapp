import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorizontalTreeControlRoutingModule } from './horizontal-tree-control-routing.module';
import { HorizontalTreeControlComponent } from './horizontal-tree-control.component';
import { MaterialModule, FuseSharedModule, LayoutModule, FuseSidebarModule, FuseModule, zhealthcareBreadcrumbModule, FuseThemeOptionsModule } from '@zhealthcare/ux';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HorizontalTreeControlComponent],
  imports: [
    CommonModule,
    HorizontalTreeControlRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    LayoutModule,
    FuseSidebarModule,
    DataSourceModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    FuseModule,
    FlexModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    zhealthcareBreadcrumbModule,
    FuseThemeOptionsModule
  ],
})
export class HorizontalTreeControlModule { }
