import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { MaterialModule, FuseSharedModule, zhealthcareAvatarModule, FuseThemeOptionsModule, zhealthcareAvatarListItemModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseHighlightModule } from "../../../../helpers/highlight/highlight.module";
import { CommonModule } from '@angular/common';
import { zhealthcareAvatarComponent } from './zhealthcare-avatar.component';

const routes: Routes = [
    {
        path: 'zhealthcare-avatar-demo',
        component: zhealthcareAvatarComponent
    }
];


@NgModule(
    {
        declarations: [zhealthcareAvatarComponent],
        imports: [
            CommonModule,
            RouterModule.forChild(routes),
            FuseSharedModule,
            MaterialModule,
            FlexLayoutModule,
            FuseHighlightModule,
            zhealthcareAvatarModule,
            FuseThemeOptionsModule,
            zhealthcareAvatarListItemModule
        ]
    }
)
export class zhealthcareAvatarDemoModule {

}
