import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FuseDirectivesModule, FuseSharedModule, MaterialModule
} from '@exxat/ux';
import { ExxatDisplayColumnsFormComponent } from './components/exxat-display-columns-form/exxat-display-columns-form.component';
import { ExxatDropdownFilterComponent } from './components/exxat-dropdown-filter/exxat-dropdown-filter.component';
import { DataSourceComponentService } from './components/exxat-edit-columns/datasource-component.service';
import { ExxatEditColumnsComponent } from './components/exxat-edit-columns/exxat-edit-columns.component';
import { ExxatExportComponent } from './components/exxat-export/exxat-export.component';
import { ExxatSearchBarComponent } from './components/exxat-search-bar/exxat-search-bar.component';
import { ExxatToggleFilterComponent } from './components/exxat-toggle-filter/exxat-toggle-filter.component';
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
    ExxatSearchBarComponent,
    ExxatDropdownFilterComponent,
    ExxatToggleFilterComponent,
    ExxatEditColumnsComponent,
    ExxatDisplayColumnsFormComponent,
    ExxatExportComponent,
    InfiniteScrollerComponent,
  ],
  declarations: [
    ExxatSearchBarComponent,
    ExxatDropdownFilterComponent,
    ExxatToggleFilterComponent,
    ExxatEditColumnsComponent,
    ExxatDisplayColumnsFormComponent,
    ExxatExportComponent,
    InfiniteScrollerComponent,
  ],
  providers: [DataSourceComponentService],
})
export class DataSourceModule { }
