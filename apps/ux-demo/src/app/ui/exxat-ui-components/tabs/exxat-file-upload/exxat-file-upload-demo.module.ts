import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { MaterialModule, FuseSharedModule, FileUploadModule, FuseThemeOptionsModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseHighlightModule } from "../../../../helpers/highlight/highlight.module";
import { CommonModule } from '@angular/common';
import { ExxatFileUploadComponent } from './exxat-file-upload.component';

const routes: Routes = [
    {
        path: 'file-upload-example',
        component: ExxatFileUploadComponent
    }
];


@NgModule(
    {
        declarations: [ExxatFileUploadComponent],
        imports: [
            CommonModule,
            RouterModule.forChild(routes),
            FuseSharedModule,
            MaterialModule,
            FlexLayoutModule,
            FuseHighlightModule,
            FileUploadModule,
            FuseThemeOptionsModule
        ]
    }
)
export class ExxatFileUploadDemoModule {

}
