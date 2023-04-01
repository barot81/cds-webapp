import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { MaterialModule, FuseSharedModule, ExxatAvatarListItemModule, FuseThemeOptionsModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseHighlightModule } from "../../../../helpers/highlight/highlight.module";
import { CommonModule } from '@angular/common';
import { ExxatAvatarListItemExampleComponent } from './exxat-avatar-list-item-example.component';

const routes: Routes = [
    {
        path: 'exxat-avatar-list-item-demo',
        component: ExxatAvatarListItemExampleComponent
    }
];


@NgModule(
    {
        declarations: [ExxatAvatarListItemExampleComponent],
        imports: [
            CommonModule,
            RouterModule.forChild(routes),
            FuseSharedModule,
            MaterialModule,
            FlexLayoutModule,
            FuseHighlightModule,
            ExxatAvatarListItemModule,
            FuseThemeOptionsModule
        ]
    }
)
export class ExxatAvatarListItemDemoModule {

}
