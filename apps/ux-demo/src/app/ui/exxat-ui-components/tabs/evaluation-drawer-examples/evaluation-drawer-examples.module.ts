import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationDrawerExamplesComponent } from './evaluation-drawer-examples.component';
import { RouterModule, Routes } from '@angular/router';
import { zhealthcareDrawerFormService } from '../../../zhealthcare-drawers/zhealthcare-drawer-forms-shared.service';
import {
  zhealthcareAvatarModule,
  FuseModule,
  FuseSharedModule,
  FuseSidebarModule,
  FuseThemeOptionsModule,
  LayoutModule,
  MaterialModule,
} from '@zhealthcare/ux';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { DrawerWithTableComponent } from './drawer-with-table/drawer-with-table.component';
import { DrawerWithSectionsComponent } from './drawer-with-sections/drawer-with-sections.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { createNewStandardFormComponent } from './create-new-standard-form/create-new-standard-form.component';
import { addBenchmarkComponent } from './add-benchmark/add-benchmark.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const routes: Routes = [
  {
    path: 'evaluation-drawer-examples',
    component: EvaluationDrawerExamplesComponent,
  },
];

@NgModule({
  declarations: [
    EvaluationDrawerExamplesComponent,
    DrawerWithTableComponent,
    DrawerWithSectionsComponent,
    createNewStandardFormComponent,
    addBenchmarkComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    LayoutModule,
    FuseSidebarModule,
    DataSourceModule,
    zhealthcareAvatarModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    FuseModule,
    FlexModule,
    NgxMatSelectSearchModule,
    MatSlideToggleModule,
    FuseThemeOptionsModule
  ],
  providers: [zhealthcareDrawerFormService],
})
export class EvaluationDrawerExamplesModule {}
