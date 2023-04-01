import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { zhealthcareOverlayDemoRoutingModule } from './zhealthcare-overlay-demo-routing.module';
import { zhealthcareOverlayDemoComponent } from './zhealthcare-overlay-demo.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FuseSharedModule,
  FuseThemeOptionsModule,
  MaterialModule,
} from '@zhealthcare/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { OverlayComponentExampleComponent } from './examples/overlay-component-example/overlay-component-example.component';
import { OverlayStringExampleComponent } from './examples/overlay-string-example/overlay-string-example.component';
import { OverlayTemplateExampleComponent } from './examples/overlay-template-example/overlay-template-example.component';
import { zhealthcareFileViewerOverlayDemoComponent } from './examples/zhealthcare-file-viewer-overlay-demo/zhealthcare-file-viewer-overlay-demo.component';
import { FileViewerContainerComponent } from './file-viewer-container/file-viewer-container.component';
import { FileUploadModule } from '@zhealthcare/plugin/file-upload';
import { zhealthcareFileViewerGuidelineOverlayDemoComponent } from './examples/zhealthcare-file-viewer-guideline-overlay-demo/zhealthcare-file-viewer-guideline-overlay-demo.component';
import { FileViewerGuidelineContainerComponent } from './file-viewer-guideline-container/file-viewer-guideline-container.component';
import { FileViewerOverlayDemo3Component } from './examples/file-viewer-overlay-demo3/file-viewer-overlay-demo3.component';
import { FileViewerOverlayDemo3ContainerComponent } from './file-viewer-overlay-demo3-container/file-viewer-overlay-demo3-container.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    zhealthcareOverlayDemoComponent,
    SubscribeComponent,
    OverlayComponentExampleComponent,
    OverlayStringExampleComponent,
    OverlayTemplateExampleComponent,
    zhealthcareFileViewerOverlayDemoComponent,
    FileViewerContainerComponent,
    zhealthcareFileViewerGuidelineOverlayDemoComponent,
    FileViewerGuidelineContainerComponent,
    FileViewerOverlayDemo3Component,
    FileViewerOverlayDemo3ContainerComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    zhealthcareOverlayDemoRoutingModule,
    ReactiveFormsModule,
    FuseSharedModule,
    MaterialModule,
    FuseHighlightModule,
    FileUploadModule,
    FuseThemeOptionsModule,
  ],
  entryComponents: [FileViewerContainerComponent],
})
export class zhealthcareOverlayDemoModule {}
