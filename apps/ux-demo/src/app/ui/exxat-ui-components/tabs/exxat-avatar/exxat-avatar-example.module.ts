import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { MaterialModule, FuseSharedModule, ExxatAvatarModule, FuseThemeOptionsModule, ExxatAvatarListItemModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseHighlightModule } from "../../../../helpers/highlight/highlight.module";
import { CommonModule } from '@angular/common';
import { ExxatAvatarComponent } from './exxat-avatar.component';

const routes: Routes = [
    {
        path: 'exxat-avatar-demo',
        component: ExxatAvatarComponent
    }
];


@NgModule(
    {
        declarations: [ExxatAvatarComponent],
        imports: [
            CommonModule,
            RouterModule.forChild(routes),
            FuseSharedModule,
            MaterialModule,
            FlexLayoutModule,
            FuseHighlightModule,
            ExxatAvatarModule,
            FuseThemeOptionsModule,
            ExxatAvatarListItemModule
        ]
    }
)
export class ExxatAvatarDemoModule {

}
