import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '@exxat/plugin/file-upload';
import {
  DynamicOverlayModule,
  FuseThemeOptionsModule,
  MaterialModule,
} from '@exxat/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { ComponentPassingExampleComponent } from './containers';
import { DynamicOverlayDemoRoutingModule } from './dynamic-overlay-demo-routing.module';
import { OverlayFormComponent } from './overlays';
import { OverlayMapService } from './services';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FuseHighlightModule,
    FileUploadModule,
    FuseThemeOptionsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicOverlayModule,
    DynamicOverlayDemoRoutingModule,
  ],
  providers: [OverlayMapService],
  declarations: [ComponentPassingExampleComponent, OverlayFormComponent],
})
export class DynamicOverlayDemoModule {}
