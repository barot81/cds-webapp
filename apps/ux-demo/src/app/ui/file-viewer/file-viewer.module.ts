import { NgModule } from '@angular/core';
import { FileViewerComponent } from './file-viewer.component';
import {FileUploadModule } from '@zhealthcare/plugin/file-upload'
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path     : 'file-viewer',
      component: FileViewerComponent
  }
];

@NgModule({
  imports: [FileUploadModule,
      RouterModule.forChild(routes),
  ],
  exports: [],
  declarations: [FileViewerComponent],
  providers: [],
})
export class FileViewerdocModule { }
