import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './components/upload-card/file-upload.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseSharedModule } from '@zhealthcare/ux';
import { FilterByTagPipe } from './pipes/filterbytag.pipe';
import { SupportedFormatPipe } from './pipes/supported-format.pipe';
import { FileDndDirective } from './directives/file-dnd.directive';
import { CardDocumentViewerComponent } from './components/card-document-viewer/card-document-viewer.component';
import { FileViewerComponent } from './components/file-viewer/file-viewer.component';

import { zhealthcareTooltipModule, MaterialModule } from '@zhealthcare/ux';
import { PdfJsViewerComponent } from './components/ng2-pdfjs-viewer/ng2-pdfjs-viewer.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DynamicViewerComponent } from './components/dynamic-viewer-component/dynamic-viewer.component';
import { RouterModule, Routes } from '@angular/router';
import { FileSandbox } from './services/file.sandbox';
import { FileApiClient } from './fileApiClient.service';
import { ImageViewerModule } from './components/ngx-imageviewer';

const routes: Routes = [
  { path: 'dynamicViewer', component: DynamicViewerComponent },
];

@NgModule({
  declarations: [
    FileUploadComponent,
    FilterByTagPipe,
    SupportedFormatPipe,
    FileDndDirective,
    CardDocumentViewerComponent,
    FileViewerComponent,
    PdfJsViewerComponent,
    PdfViewerComponent,
    ImageViewerComponent,
    DynamicViewerComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FuseSharedModule,
    MatProgressSpinnerModule,
    MaterialModule,
    ImageViewerModule,
    RouterModule.forChild(routes),
    zhealthcareTooltipModule,
  ],
  providers: [FileSandbox, FileApiClient],
  exports: [FileUploadComponent, RouterModule, DynamicViewerComponent, FileViewerComponent],
})
export class FileUploadModule {}
