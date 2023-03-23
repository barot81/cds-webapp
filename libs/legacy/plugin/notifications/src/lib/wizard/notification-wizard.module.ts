import { NgModule } from '@angular/core';
import { NotificationWizardComponent } from './notification-wizard.component';
import { NotificationTemplateComponent } from './template/notification-template.component';
import { CommonModule } from '@angular/common';
import {
  MaterialModule,
  FuseSharedModule,
  FuseSidebarModule,
  FuseDirectivesModule,
  zhealthcareTooltipModule,
} from '@zhealthcare/ux';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { NotificationPreviewComponent } from './preview/notification-preview.component';
import { NotificationTemplateEditComponent } from './template/edit/notification-template-edit.component';
import {
  FeatureMetaDataPipesModule,
} from '@zhealthcare/fusion/pipes';
import { FileUploadModule } from '@zhealthcare/plugin/file-upload';
import { CKEditorModule } from '@zhealthcare/plugin/ckeditor';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { NotificationRecipientListComponent } from './recipient-list/notification-recipient-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MentionModule } from 'angular-mentions';
import { FeatureMetadataService } from '@zhealthcare/fusion/services';
import { NotificationServicesModule } from '../services/notification-services.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FileUploadModule,
    ReactiveFormsModule,
    LayoutModule,
    FuseSharedModule,
    FuseSidebarModule,
    FlexLayoutModule,
    FuseDirectivesModule,
    NotificationServicesModule,
    FeatureMetaDataPipesModule,
    CKEditorModule,
    ClipboardModule,
    MentionModule,
    zhealthcareTooltipModule,
  ],
  exports: [NotificationWizardComponent],
  declarations: [
    NotificationWizardComponent,
    NotificationTemplateComponent,
    NotificationRecipientListComponent,
    NotificationPreviewComponent,
    NotificationTemplateEditComponent,
  ],
  providers: [],
})
export class NotificationWizardModule {
  constructor(private featureService: FeatureMetadataService) {}
}
