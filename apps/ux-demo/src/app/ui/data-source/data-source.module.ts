import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { zhealthcareDataSourceComponent } from './zhealthcare-data-source.component';
import { zhealthcareSearchBarExampleComponent } from './tabs/zhealthcare-search-bar-example/zhealthcare-search-bar-example.component';
import { zhealthcareDropdownFilterExampleComponent } from './tabs/zhealthcare-dropdown-filter-example/zhealthcare-dropdown-filter-example.component';
import { zhealthcareToggleExampleComponent } from './tabs/zhealthcare-toggle-example/zhealthcare-toggle-example.component';
import { zhealthcareEditColumnsExampleComponent } from './tabs/zhealthcare-edit-columns-example/zhealthcare-edit-columns-example.component';
import { zhealthcareEditColumnsFormExampleComponent } from './tabs/zhealthcare-edit-columns-form-example/zhealthcare-edit-columns-form-example.component';
import { Routes, RouterModule } from '@angular/router';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { MaterialModule, FuseSharedModule, FuseModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'zhealthcare-data-source-demo',
    component: zhealthcareDataSourceComponent
  }
];

@NgModule({
  declarations: [zhealthcareDataSourceComponent, zhealthcareSearchBarExampleComponent, zhealthcareDropdownFilterExampleComponent, zhealthcareToggleExampleComponent, zhealthcareEditColumnsExampleComponent, zhealthcareEditColumnsFormExampleComponent],
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
