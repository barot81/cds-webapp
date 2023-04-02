import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { PatientsGridComponent } from '../patients/patients-grid.component';
import { FilterDrawerComponent } from '../patients/filter-drawer/filter-drawer.component';
import { ShowMoreFilterDrawerComponent } from '../patients/show-more-filter-drawer/show-more-filter-drawer.component';
import { FuseDirectivesModule, FuseSharedModule, LayoutModule, MaterialModule } from '@zhealthcare/ux';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterAndEditDrawerComponent } from '../patients/filter-and-edit-drawer/filter-and-edit-drawer.component';
import { EditColumnsComponent } from '../patients/edit-columns/edit-columns.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    RemoteEntryComponent,
    PatientsGridComponent,
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
    StoreModule,
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
            path: '',
            pathMatch:'full',
            redirectTo:'patients'
          }
        ]
      }
    ]),
  ],
  providers: []
})
export class RemoteEntryModule {
}
