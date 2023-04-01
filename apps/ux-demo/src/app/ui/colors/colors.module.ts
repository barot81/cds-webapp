import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule, FuseThemeOptionsModule } from '@exxat/ux';

import { ColorsComponent } from './colors.component';

const routes: Routes = [
    {
        path     : 'colors',
        component: ColorsComponent
    }
];

@NgModule({
    declarations: [
        ColorsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        FuseThemeOptionsModule,
        FuseSharedModule
    ]
})
export class UIColorsModule
{
}
