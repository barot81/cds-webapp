import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FuseDirectivesModule, FuseSharedModule, MaterialModule
} from '@zhealthcare/ux';
import { zhealthcareDisplayColumnsFormComponent } from './components/zhealthcare-display-columns-form/zhealthcare-display-columns-form.component';
import { zhealthcareDropdownFilterComponent } from './components/zhealthcare-dropdown-filter/zhealthcare-dropdown-filter.component';
import { DataSourceComponentService } from './components/zhealthcare-edit-columns/datasource-component.service';
import { zhealthcareEditColumnsComponent } from './components/zhealthcare-edit-columns/zhealthcare-edit-columns.component';
import { zhealthcareExportComponent } from './components/zhealthcare-export/zhealthcare-export.component';
import { zhealthcareSearchBarComponent } from './components/zhealthcare-search-bar/zhealthcare-search-bar.component';
import { zhealthcareToggleFilterComponent } from './components/zhealthcare-toggle-filter/zhealthcare-toggle-filter.component';
import { InfiniteScrollerComponent } from './components/infinite-scroller/infinite-scroller.component';
import { DataSourceStoreModule } from './store/datasource.store.module';

@NgModule({
  imports: [
    CommonModule,
    DataSourceStoreModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    FuseSharedModule,
    FuseDirectivesModule,
  ],
  exports: [
    zhealthcareSearchBarComponent,
    zhealthcareDropdownFilterComponent,
    zhealthcareToggleFilterComponent,
    zhealthcareEditColumnsComponent,
    zhealthcareDisplayColumnsFormComponent,
    zhealthcareExportComponent,
    InfiniteScrollerComponent,
  ],
  declarations: [
    zhealthcareSearchBarComponent,
    zhealthcareDropdownFilterComponent,
    zhealthcareToggleFilterComponent,
    zhealthcareEditColumnsComponent,
    zhealthcareDisplayColumnsFormComponent,
    zhealthcareExportComponent,
    InfiniteScrollerComponent,
  ],
  providers: [DataSourceComponentService],
})
export class DataSourceModule { }
