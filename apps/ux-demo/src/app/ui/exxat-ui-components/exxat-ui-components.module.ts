import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExxatUiComponentsComponent } from './exxat-ui-components.component';
import { Routes, RouterModule } from '@angular/router';
import { ExxatSearchComponent } from './tabs/exxat-search/exxat-search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseSharedModule, MaterialModule, FuseProgressBarModule, FuseModule, FuseSidebarModule, ExxatTreeModule, ExxatAvatarModule,  FuseMaterialColorPickerModule, ExxatAvatarListItemModule, FuseConfirmDialogModule } from '@exxat/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { ExxatWeekdayPickerComponent } from './tabs/exxat-weekday-picker/exxat-weekday-picker.component';
import { PluginModule } from '@exxat/plugin';
import { ExxatTagModule } from '@exxat/plugin/tags';
import { ExxatFileViewerTabComponent } from './tabs/exxat-file-viewer-tab/exxat-file-viewer-tab.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExxatExpandedFilterExampleComponent } from './tabs/exxat-expanded-filter-example/exxat-expanded-filter-example.component';
import { ExxatAutocompleteChipsComponent } from './tabs/exxat-autocomplete-chips/exxat-autocomplete-chips.component';
import { ChipsWithoutCustomInputComponent } from './tabs/chips-without-custom-input/chips-without-custom-input.component';
import { ExxatSkeletonExampleModule } from './tabs/exxat-skeleton-example/exxat-skeleton-example.module';
import { ExxatTagExampleModule } from './tabs/exxat-tag-example/exxat-tag-example.module';
import { ConfirmDialogBoxDemoModule } from './tabs/confirm-dialog-box-demo/confirm-dialog-box-demo.module';
import { ExxatAccordianDemoModule } from './tabs/exxat-accordian/exxat-accordian.module';
import { ExxatAvatarDemoModule } from './tabs/exxat-avatar/exxat-avatar-example.module';
import { SpinnerExampleModule } from './tabs/spinner-example/spinner-example.module';
import { ExxatTreeDemoModule } from './tabs/exxat-tree-demo/exxat-tree-demo.module';
import { ExxatFileUploadDemoModule } from './tabs/exxat-file-upload/exxat-file-upload-demo.module';
import { EvaluationDrawerExamplesModule } from './tabs/evaluation-drawer-examples/evaluation-drawer-examples.module';
import { ExxatFormsModule } from './tabs/exxat-forms/exxat-forms.module';
import { FileUploadModule } from '@exxat/plugin/file-upload';

const routes: Routes = [
  {
    path: 'exxat-ui-components',
    component: ExxatUiComponentsComponent
  }
];

@NgModule({
  declarations: [
    ExxatUiComponentsComponent,
    ExxatSearchComponent,
    ExxatWeekdayPickerComponent,
    ExxatFileViewerTabComponent,
    ExxatExpandedFilterExampleComponent,
    ExxatAutocompleteChipsComponent,
    ChipsWithoutCustomInputComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatTabsModule,
    FuseSharedModule,
    FuseHighlightModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FuseProgressBarModule,
    FuseSharedModule,
    FuseModule,
    FuseSidebarModule,
    MatDividerModule,
    ExxatAvatarModule,
    FileUploadModule,
    FuseMaterialColorPickerModule,
    PluginModule,
    ExxatTagModule,
    ExxatAvatarListItemModule,
    ExxatTreeModule,
    MatTooltipModule,
    FuseConfirmDialogModule,
    ExxatSkeletonExampleModule,
    ExxatTagExampleModule,
    ConfirmDialogBoxDemoModule,
    EvaluationDrawerExamplesModule,
    ExxatAccordianDemoModule,
    ExxatAvatarDemoModule,
    SpinnerExampleModule,
    ExxatTreeDemoModule,
    ExxatFileUploadDemoModule,
    ExxatFormsModule
  ]
})
export class ExxatUiComponentsModule { }
