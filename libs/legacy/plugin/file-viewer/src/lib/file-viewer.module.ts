import { NgModule } from '@angular/core';
import { FileViewerComponent } from './components/file-viewer.component';
import { CommonModule } from '@angular/common';

import {
  zhealthcareTooltipModule,
  FuseSharedModule,
  FuseSidebarModule,
  MaterialModule,
} from '@zhealthcare/ux';
import { PdfJsViewerComponent } from './components/ng2-pdfjs-viewer/ng2-pdfjs-viewer.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageViewerModule } from './components/ngx-imageviewer/src/lib/imageviewer.module';
import { DynamicViewerComponent } from './components/dynamic-viewer-component/dynamic-viewer.component';
import { RouterModule, Routes } from '@angular/router';
import { FileApiClient, FileSandbox } from '@zhealthcare/plugin/file-upload';

const routes: Routes = [
  { path: 'dynamicViewer', component: DynamicViewerComponent },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ImageViewerModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    zhealthcareTooltipModule,
  ],
  exports: [RouterModule, FileViewerComponent, DynamicViewerComponent],
  declarations: [
    FileViewerComponent,
    PdfJsViewerComponent,
    PdfViewerComponent,
    ImageViewerComponent,
    DynamicViewerComponent,
  ],
  providers: [FileSandbox, FileApiClient],
})
export class FileViewerModule {}
