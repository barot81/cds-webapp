import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExportExcelModule, ServicesModule } from '@zhealthcare/fusion/services';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { FusePipesModule, FuseSharedModule, FuseSidebarModule, LayoutModule, MaterialModule } from '@zhealthcare/ux';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { StudentGridsModule } from './student-grids/student-grids.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FuseSharedModule,
    StudentProfileStoreModule,
    FuseSidebarModule,
    AdminRoutingModule,
    DataSourceModule,
    LayoutModule,
    ProfileSharedModule,
    ExportExcelModule,
    ServicesModule,
    FusePipesModule,
    StudentGridsModule,
  ],
  exports: [],
  declarations: [
    AdminComponent
  ],
  providers: [
    ProfileAdminLayoutService,
    ExportService,
    TimezonePipe,
  ]
})
export class ProfileAdminModule {
  constructor() {}
}
