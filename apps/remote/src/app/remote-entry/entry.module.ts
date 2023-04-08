import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { PatientsGridComponent } from '../patients/patients-grid.component';
import { FilterDrawerComponent } from '../patients/filter-drawer/filter-drawer.component';
import { ShowMoreFilterDrawerComponent } from '../patients/show-more-filter-drawer/show-more-filter-drawer.component';
import { FlexTableModule, FuseDirectivesModule, FuseSharedModule, FuseSidebarModule, FuseThemeOptionsModule, LayoutModule, MaterialModule, ShowMoreModule } from '@zhealthcare/ux';
import { FilterAndEditDrawerComponent } from '../patients/filter-and-edit-drawer/filter-and-edit-drawer.component';
import { EditColumnsComponent } from '../patients/edit-columns/edit-columns.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PatientsSearchGridComponent } from '../patients-grid/patients-search-grid.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomDirectiveModule, RBACDirectiveModule } from '@zhealthcare/fusion/directives';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { ProfileFormsModule } from '../forms/patient-forms.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    RemoteEntryComponent,
    PatientsGridComponent,
    PatientsSearchGridComponent,
    EditColumnsComponent,
    FilterAndEditDrawerComponent,
    FilterDrawerComponent,
    ShowMoreFilterDrawerComponent
],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule,
    FuseSharedModule,
    FuseDirectivesModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
    FlexLayoutModule,
    FlexTableModule,
    CustomDirectiveModule,
    RBACDirectiveModule,
    StoreModule,
    ShowMoreModule,
    DataSourceModule,
    ProfileFormsModule,
    DragDropModule,
    EffectsModule.forFeature([]),
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,
        children: [
          {
            path: 'patients',
            component: PatientsGridComponent
          },
          {
            path: 'patients-grid',
            component: PatientsSearchGridComponent
          },
          {
            path: '',
            redirectTo:'patients',
            pathMatch:'full'
          }
        ]
      }
    ]),
  ],
  providers: [DatePipe]
})
export class RemoteEntryModule {
}
