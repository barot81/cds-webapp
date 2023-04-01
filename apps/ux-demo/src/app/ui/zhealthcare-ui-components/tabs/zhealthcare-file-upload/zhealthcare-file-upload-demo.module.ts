import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { MaterialModule, FuseSharedModule, FileUploadModule, FuseThemeOptionsModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseHighlightModule } from "../../../../helpers/highlight/highlight.module";
import { CommonModule } from '@angular/common';
import { zhealthcareFileUploadComponent } from './zhealthcare-file-upload.component';

const routes: Routes = [
    {
        path: 'file-upload-example',
        component: zhealthcareFileUploadComponent
    }
];


@NgModule(
    {
        declarations: [zhealthcareFileUploadComponent],
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
export class zhealthcareFileUploadDemoModule {

}
