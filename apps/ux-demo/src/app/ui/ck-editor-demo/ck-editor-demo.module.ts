import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CKEditorModule } from '@exxat/plugin/ckeditor';
import { FuseSharedModule, FuseThemeOptionsModule, MaterialModule } from '@exxat/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { CkEditorDemoRoutingModule } from './ck-editor-demo-routing.module';
import { CkEditorDemoComponent } from './pages';
import { CkEditorDrawerExampleComponent, InnerDrawerService } from './drawers';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CkEditorDemoComponent, CkEditorDrawerExampleComponent],
  imports: [
    CommonModule,
    FuseSharedModule,
    FuseHighlightModule,
    FlexLayoutModule,
    MaterialModule,
    CKEditorModule,
    CkEditorDemoRoutingModule,
    FuseThemeOptionsModule,
    ReactiveFormsModule
  ],
  providers: [InnerDrawerService]
})
export class CkEditorDemoModule { }
