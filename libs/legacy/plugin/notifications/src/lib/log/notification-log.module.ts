import { NgModule } from '@angular/core';

import { NotificationLogComponent } from './notification-log.component';
import { CommonModule } from '@angular/common';
import {
  MaterialModule,
  FuseSharedModule,
  FuseSidebarModule,
  FuseDirectivesModule,
  zhealthcareTooltipModule,
  FlexTableModule,
} from '@zhealthcare/ux';
import { LayoutModule } from '@angular/cdk/layout';
import { NotificationlogDetailComponent } from './detail/notification-detail.component';
import { FeatureMetaDataPipesModule } from '@zhealthcare/fusion/pipes';
import { NotificationLogDetailService } from '../services/notificationlog.detail.service';
import { NotificationLogPreviewComponent } from './preview/notification-log-preview.component';
import { DrawerService } from '../services/drawer-service';
import { FileViewerContainerComponent } from './preview/file-viewer-container/file-viewer-container.component';
import { FileUploadModule } from '@zhealthcare/plugin/file-upload';
import { TimezonePipe } from '@zhealthcare/fusion/pipes';
import { ExternalLinkDirective } from './external-link.directive';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseDirectivesModule,
    FeatureMetaDataPipesModule,
    zhealthcareTooltipModule,
    FlexTableModule,
    FileUploadModule,
  ],
  exports: [NotificationLogComponent, ExternalLinkDirective],
  declarations: [
    NotificationLogComponent,
    NotificationlogDetailComponent,
    NotificationLogPreviewComponent,
    FileViewerContainerComponent,
    ExternalLinkDirective
  ],
  providers: [NotificationLogDetailService, DrawerService, TimezonePipe],
})
export class NotificationLogModule {}
