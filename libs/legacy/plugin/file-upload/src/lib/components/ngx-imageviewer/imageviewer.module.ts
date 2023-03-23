import { NgModule } from '@angular/core';
import { IMAGEVIEWER_CONFIG, IMAGEVIEWER_CONFIG_DEFAULT } from '../../models';
import { ImageViewerComponent } from './imageviewer.component';

@NgModule({
  providers: [{ provide: IMAGEVIEWER_CONFIG, useValue: IMAGEVIEWER_CONFIG_DEFAULT }],
  declarations: [ImageViewerComponent],
  exports: [ImageViewerComponent],
})
export class ImageViewerModule { }
