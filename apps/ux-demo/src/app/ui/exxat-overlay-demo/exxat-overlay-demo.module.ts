import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExxatOverlayDemoRoutingModule } from './exxat-overlay-demo-routing.module';
import { ExxatOverlayDemoComponent } from './exxat-overlay-demo.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FuseSharedModule,
  FuseThemeOptionsModule,
  MaterialModule,
} from '@exxat/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { OverlayComponentExampleComponent } from './examples/overlay-component-example/overlay-component-example.component';
import { OverlayStringExampleComponent } from './examples/overlay-string-example/overlay-string-example.component';
import { OverlayTemplateExampleComponent } from './examples/overlay-template-example/overlay-template-example.component';
import { ExxatFileViewerOverlayDemoComponent } from './examples/exxat-file-viewer-overlay-demo/exxat-file-viewer-overlay-demo.component';
import { FileViewerContainerComponent } from './file-viewer-container/file-viewer-container.component';
import { FileUploadModule } from '@exxat/plugin/file-upload';
import { ExxatFileViewerGuidelineOverlayDemoComponent } from './examples/exxat-file-viewer-guideline-overlay-demo/exxat-file-viewer-guideline-overlay-demo.component';
import { FileViewerGuidelineContainerComponent } from './file-viewer-guideline-container/file-viewer-guideline-container.component';
import { FileViewerOverlayDemo3Component } from './examples/file-viewer-overlay-demo3/file-viewer-overlay-demo3.component';
import { FileViewerOverlayDemo3ContainerComponent } from './file-viewer-overlay-demo3-container/file-viewer-overlay-demo3-container.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    ExxatOverlayDemoComponent,
    SubscribeComponent,
    OverlayComponentExampleComponent,
    OverlayStringExampleComponent,
    OverlayTemplateExampleComponent,
    ExxatFileViewerOverlayDemoComponent,
    FileViewerContainerComponent,
    ExxatFileViewerGuidelineOverlayDemoComponent,
    FileViewerGuidelineContainerComponent,
    FileViewerOverlayDemo3Component,
    FileViewerOverlayDemo3ContainerComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    ExxatOverlayDemoRoutingModule,
    ReactiveFormsModule,
    FuseSharedModule,
    MaterialModule,
    FuseHighlightModule,
    FileUploadModule,
    FuseThemeOptionsModule,
  ],
  entryComponents: [FileViewerContainerComponent],
})
export class ExxatOverlayDemoModule {}
