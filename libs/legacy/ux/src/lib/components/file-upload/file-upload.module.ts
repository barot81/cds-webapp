import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseModule } from '../../fuse.module';
import { FuseSharedModule } from '../../shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialModule } from '../../material.module';



@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    FuseModule,
    FuseSharedModule,
    MatProgressSpinnerModule,
    MaterialModule
  ],
  exports: [FileUploadComponent]
})
export class FileUploadModule { }
