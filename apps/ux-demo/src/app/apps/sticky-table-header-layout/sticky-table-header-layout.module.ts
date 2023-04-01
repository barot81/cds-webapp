import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { zhealthcareTagModule } from '@zhealthcare/plugin/tags';
import {
  zhealthcareAvatarListItemModule,
  zhealthcareAvatarModule,
  FuseSidebarModule,
  MaterialModule,
  FuseDirectivesModule,
  FusePipesModule,
  ShowMoreModule,
} from '@zhealthcare/ux';
import { UXDemoDrawerService } from '../../remote-entry/ux-demo-drawer.service';
import { GridService } from '../student-grid/grid.service';
import { NavbarComponent } from './components';
import { ContainerComponent } from './container/container.component';
import {
  AcademicInfoComponent,
  ContactComponent,
  StudentInfoComponent,
} from './pages';
import { StickyTableHeaderLayoutService } from './services';

import { StickyTableHeaderLayoutRoutingModule } from './sticky-table-header-layout-routing.module';

@NgModule({
  declarations: [
    ContainerComponent,
    AcademicInfoComponent,
    StudentInfoComponent,
    ContactComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    StickyTableHeaderLayoutRoutingModule,
    zhealthcareAvatarListItemModule,
    MaterialModule,
    FuseSidebarModule,
    FlexLayoutModule,
    zhealthcareAvatarModule,
    DataSourceModule,
    FuseDirectivesModule,
    zhealthcareTagModule,
    FusePipesModule,
    ShowMoreModule
  ],
  providers: [StickyTableHeaderLayoutService, GridService, UXDemoDrawerService]
})
export class StickyTableHeaderLayoutModule {}
