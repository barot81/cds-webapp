import { Routes, RouterModule } from "@angular/router";
import { ExxatSkeletonExampleComponent } from './exxat-skeleton-example.component';
import { NgModule } from '@angular/core';
import { MaterialModule, FuseSharedModule, FuseThemeOptionsModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseHighlightModule } from "../../../../helpers/highlight/highlight.module";
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: 'exxat-skeleton-example',
        component: ExxatSkeletonExampleComponent
    }
];


@NgModule(
    {
        declarations: [ExxatSkeletonExampleComponent],
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
export class ExxatSkeletonExampleModule {

}
