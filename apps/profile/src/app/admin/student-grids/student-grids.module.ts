import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomDirectiveModule, RBACDirectiveModule } from '@exxat/fusion/directives';
import { DataSourceModule } from '@exxat/plugin/data-source';
import { PowerBIModule } from '@exxat/plugin/power-bi';
import { ExxatTagModule } from '@exxat/plugin/tags';
import { ProfileAdminLayoutService, SearchApiClient } from "@exxat/profile/services";
import { ProfilePipesModule } from '@exxat/profile/shared';
import { ExxatAvatarModule, ExxatTooltipModule, FlexTableModule, FusePipesModule, FuseSharedModule, MaterialModule, ShowMoreModule } from '@exxat/ux';
import { AdminRoutingModule } from '../admin-routing.module';
import { AdvanceSearchComponent } from './advance-search/advance-search.component';
import { SearchComponent } from './search/search.component';
import { ViewAsStudentService } from './search/view-as-student/view-as-student.service';
import { StudentGridsComponent } from './student-grids.component';

@NgModule({
  exports: [SearchComponent],
  providers: [SearchApiClient, ViewAsStudentService, DatePipe, ProfileAdminLayoutService],
  declarations: [StudentGridsComponent, AdvanceSearchComponent, SearchComponent],
  imports: [CommonModule,
    MaterialModule,
    FuseSharedModule,
    AdminRoutingModule,
    FuseSharedModule,
    ExxatAvatarModule,
    FlexLayoutModule, 
    FlexTableModule,
    ExxatTooltipModule,
    ExxatTagModule,
    ShowMoreModule,
    CustomDirectiveModule, RBACDirectiveModule, ProfilePipesModule,
    FusePipesModule,
    DataSourceModule,
    PowerBIModule],
})
export class StudentGridsModule {}
