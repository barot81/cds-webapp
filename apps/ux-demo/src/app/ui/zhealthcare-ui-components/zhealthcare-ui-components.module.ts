import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { zhealthcareUiComponentsComponent } from './zhealthcare-ui-components.component';
import { Routes, RouterModule } from '@angular/router';
import { zhealthcareSearchComponent } from './tabs/zhealthcare-search/zhealthcare-search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseSharedModule, MaterialModule, FuseProgressBarModule, FuseModule, FuseSidebarModule, zhealthcareTreeModule, zhealthcareAvatarModule,  FuseMaterialColorPickerModule, zhealthcareAvatarListItemModule, FuseConfirmDialogModule } from '@zhealthcare/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { zhealthcareWeekdayPickerComponent } from './tabs/zhealthcare-weekday-picker/zhealthcare-weekday-picker.component';
import { PluginModule } from '@zhealthcare/plugin';
import { zhealthcareTagModule } from '@zhealthcare/plugin/tags';
import { zhealthcareFileViewerTabComponent } from './tabs/zhealthcare-file-viewer-tab/zhealthcare-file-viewer-tab.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { zhealthcareExpandedFilterExampleComponent } from './tabs/zhealthcare-expanded-filter-example/zhealthcare-expanded-filter-example.component';
import { zhealthcareAutocompleteChipsComponent } from './tabs/zhealthcare-autocomplete-chips/zhealthcare-autocomplete-chips.component';
import { ChipsWithoutCustomInputComponent } from './tabs/chips-without-custom-input/chips-without-custom-input.component';
import { zhealthcareSkeletonExampleModule } from './tabs/zhealthcare-skeleton-example/zhealthcare-skeleton-example.module';
import { zhealthcareTagExampleModule } from './tabs/zhealthcare-tag-example/zhealthcare-tag-example.module';
import { ConfirmDialogBoxDemoModule } from './tabs/confirm-dialog-box-demo/confirm-dialog-box-demo.module';
import { zhealthcareAccordianDemoModule } from './tabs/zhealthcare-accordian/zhealthcare-accordian.module';
import { zhealthcareAvatarDemoModule } from './tabs/zhealthcare-avatar/zhealthcare-avatar-example.module';
import { SpinnerExampleModule } from './tabs/spinner-example/spinner-example.module';
import { zhealthcareTreeDemoModule } from './tabs/zhealthcare-tree-demo/zhealthcare-tree-demo.module';
import { zhealthcareFileUploadDemoModule } from './tabs/zhealthcare-file-upload/zhealthcare-file-upload-demo.module';
import { EvaluationDrawerExamplesModule } from './tabs/evaluation-drawer-examples/evaluation-drawer-examples.module';
import { zhealthcareFormsModule } from './tabs/zhealthcare-forms/zhealthcare-forms.module';
import { FileUploadModule } from '@zhealthcare/plugin/file-upload';

const routes: Routes = [
  {
    path: 'zhealthcare-ui-components',
    component: zhealthcareUiComponentsComponent
  }
];

@NgModule({
  declarations: [
    zhealthcareUiComponentsComponent,
    zhealthcareSearchComponent,
    zhealthcareWeekdayPickerComponent,
    zhealthcareFileViewerTabComponent,
    zhealthcareExpandedFilterExampleComponent,
    zhealthcareAutocompleteChipsComponent,
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
    zhealthcareAvatarModule,
    FileUploadModule,
    FuseMaterialColorPickerModule,
    PluginModule,
    zhealthcareTagModule,
    zhealthcareAvatarListItemModule,
    zhealthcareTreeModule,
    MatTooltipModule,
    FuseConfirmDialogModule,
    zhealthcareSkeletonExampleModule,
    zhealthcareTagExampleModule,
    ConfirmDialogBoxDemoModule,
    EvaluationDrawerExamplesModule,
    zhealthcareAccordianDemoModule,
    zhealthcareAvatarDemoModule,
    SpinnerExampleModule,
    zhealthcareTreeDemoModule,
    zhealthcareFileUploadDemoModule,
    zhealthcareFormsModule
  ]
})
export class zhealthcareUiComponentsModule { }
