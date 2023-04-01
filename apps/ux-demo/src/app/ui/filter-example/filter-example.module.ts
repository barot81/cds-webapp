import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  FuseDirectivesModule,
  FuseThemeOptionsModule,
  LayoutModule,
  MaterialModule
} from '@exxat/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { UIExxatDrawersModule } from '../exxat-drawers/exxat-drawers.module';
import { FilterExampleComponent } from './pages';

const routes: Routes = [
  {
    path: 'filter-example',
    component: FilterExampleComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FuseHighlightModule,
    LayoutModule,
    UIExxatDrawersModule,
    RouterModule.forChild(routes),
    FuseThemeOptionsModule,
    FuseDirectivesModule,
    ReactiveFormsModule
  ],
  declarations: [FilterExampleComponent],
})
export class FilterExampleModule {}
