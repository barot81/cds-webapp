import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { MaterialModule, FuseSharedModule, FuseThemeOptionsModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseHighlightModule } from "../../../../helpers/highlight/highlight.module";
import { CommonModule } from '@angular/common';
import { SpinnerExampleComponent } from './spinner-example.component';

const routes: Routes = [
    {
        path: 'spinner-example',
        component: SpinnerExampleComponent
    }
];


@NgModule(
    {
        declarations: [SpinnerExampleComponent],
        imports: [
            CommonModule,
            RouterModule.forChild(routes),
            FuseSharedModule,
            MaterialModule,
            FuseThemeOptionsModule,
            FlexLayoutModule,
            FuseHighlightModule
        ]
    }
)
export class SpinnerExampleModule {

}
