import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheCompleteDemoPageRoutingModule } from './the-complete-demo-page-routing.module';
import { TheCompleteDemoPageComponent } from './the-complete-demo-page.component';
import { RouterModule, Routes } from '@angular/router';
import {
  MaterialModule,
  FuseSharedModule,
  zhealthcareAvatarListItemModule,
  LayoutModule,
  FuseModule,
  FuseSidebarModule,
  FuseDirectivesModule
} from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { DemoPageDialogComponent } from './demo-page-dialog/demo-page-dialog.component';
import { zhealthcareDrawerFormService } from '../../ui/zhealthcare-drawers/zhealthcare-drawer-forms-shared.service';
import { FilterDrawerComponent } from './filter-drawer/filter-drawer.component';
import { UXDemoDrawerService } from '../../remote-entry/ux-demo-drawer.service';
import { ShowMoreFilterDrawerComponent } from './show-more-filter-drawer/show-more-filter-drawer.component';
import { FilterAndEditDrawerComponent } from './filter-and-edit-drawer/filter-and-edit-drawer.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    TheCompleteDemoPageComponent,
    DemoPageDialogComponent,
    FilterDrawerComponent,
    ShowMoreFilterDrawerComponent,
    FilterAndEditDrawerComponent,
    FilterAndEditDrawerComponent
  ],
  imports: [
    CommonModule,
    TheCompleteDemoPageRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    FuseHighlightModule,
    zhealthcareAvatarListItemModule,
    LayoutModule,
    FuseSidebarModule,
    DataSourceModule,
    DragDropModule,
    FuseDirectivesModule
  ],
  providers: [zhealthcareDrawerFormService, UXDemoDrawerService]
})
export class TheCompleteDemoPageModule {}
