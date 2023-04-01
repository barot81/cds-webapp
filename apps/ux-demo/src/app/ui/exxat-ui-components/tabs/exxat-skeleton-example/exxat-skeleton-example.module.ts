import { Routes, RouterModule } from "@angular/router";
import { zhealthcareSkeletonExampleComponent } from './zhealthcare-skeleton-example.component';
import { NgModule } from '@angular/core';
import { MaterialModule, FuseSharedModule, FuseThemeOptionsModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseHighlightModule } from "../../../../helpers/highlight/highlight.module";
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: 'zhealthcare-skeleton-example',
        component: zhealthcareSkeletonExampleComponent
    }
];


@NgModule(
    {
        declarations: [zhealthcareSkeletonExampleComponent],
        imports: [
            CommonModule,
            RouterModule.forChild(routes),
            MaterialModule,
            FuseSharedModule,
            FlexLayoutModule,
            FuseHighlightModule,
            FuseThemeOptionsModule
        ]
    }
)
export class zhealthcareSkeletonExampleModule {

}
