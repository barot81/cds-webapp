import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { MaterialModule, FuseSharedModule, FuseThemeOptionsModule, ExxatAvatarModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseHighlightModule } from "../../../../helpers/highlight/highlight.module";

import { CommonModule } from '@angular/common';
import { ConfirmDialogBoxDemoComponent } from './confirm-dialog-box-demo.component';
import { PopupExampleDemoComponent } from './popup-example-demo/popup-example-demo.component';
import { checkboxPopupExampleDemoComponent } from "./checkbox-popup-example-demo/checkbox-popup-example-demo.component";
import { DialogBoxWithImageDemoComponent } from "./dialog-box-with-image-demo/dialog-box-with-image-demo.component";
import { dialogBoxWithHeadingDemoComponent } from "./dialog-box-with-heading-demo/dialog-box-with-heading-demo.component";

const routes: Routes = [
    {
        path: 'confirm-dialog-box-demo',
        component: ConfirmDialogBoxDemoComponent
    }
];


@NgModule(
    {
        declarations: [ConfirmDialogBoxDemoComponent, PopupExampleDemoComponent,checkboxPopupExampleDemoComponent,DialogBoxWithImageDemoComponent,dialogBoxWithHeadingDemoComponent],
        imports: [
            CommonModule,
            RouterModule.forChild(routes),
            FuseSharedModule,
            MaterialModule,
            FlexLayoutModule,
            FuseHighlightModule,
            FuseThemeOptionsModule,
            ExxatAvatarModule
        ]
    }
)
export class ConfirmDialogBoxDemoModule {

}
