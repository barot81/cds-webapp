import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { MaterialModule, FuseSharedModule, zhealthcareAvatarListItemModule, FuseThemeOptionsModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseHighlightModule } from "../../../../helpers/highlight/highlight.module";
import { CommonModule } from '@angular/common';
import { zhealthcareAvatarListItemExampleComponent } from './zhealthcare-avatar-list-item-example.component';

const routes: Routes = [
    {
        path: 'zhealthcare-avatar-list-item-demo',
        component: zhealthcareAvatarListItemExampleComponent
    }
];


@NgModule(
    {
        declarations: [zhealthcareAvatarListItemExampleComponent],
        imports: [
            CommonModule,
            RouterModule.forChild(routes),
            FuseSharedModule,
            MaterialModule,
            FlexLayoutModule,
            FuseHighlightModule,
            zhealthcareAvatarListItemModule,
            FuseThemeOptionsModule
        ]
    }
)
export class zhealthcareAvatarListItemDemoModule {

}
