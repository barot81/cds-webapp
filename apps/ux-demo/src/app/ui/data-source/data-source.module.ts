import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExxatDataSourceComponent } from './exxat-data-source.component';
import { ExxatSearchBarExampleComponent } from './tabs/exxat-search-bar-example/exxat-search-bar-example.component';
import { ExxatDropdownFilterExampleComponent } from './tabs/exxat-dropdown-filter-example/exxat-dropdown-filter-example.component';
import { ExxatToggleExampleComponent } from './tabs/exxat-toggle-example/exxat-toggle-example.component';
import { ExxatEditColumnsExampleComponent } from './tabs/exxat-edit-columns-example/exxat-edit-columns-example.component';
import { ExxatEditColumnsFormExampleComponent } from './tabs/exxat-edit-columns-form-example/exxat-edit-columns-form-example.component';
import { Routes, RouterModule } from '@angular/router';
import { DataSourceModule } from '@exxat/plugin/data-source';
import { MaterialModule, FuseSharedModule, FuseModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'exxat-data-source-demo',
    component: ExxatDataSourceComponent
  }
];

@NgModule({
  declarations: [ExxatDataSourceComponent, ExxatSearchBarExampleComponent, ExxatDropdownFilterExampleComponent, ExxatToggleExampleComponent, ExxatEditColumnsExampleComponent, ExxatEditColumnsFormExampleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataSourceModule,
    MaterialModule,
    FlexLayoutModule,
    FuseHighlightModule,
    FormsModule,
    ReactiveFormsModule,
    FuseModule,
    FuseSharedModule
  ]
})
export class DataSourceDemoModule { }
