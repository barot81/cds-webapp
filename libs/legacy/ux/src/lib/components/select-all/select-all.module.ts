import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectAllComponent } from './select-all.component';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        SelectAllComponent
    ],
    imports     : [
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    exports     : [
        SelectAllComponent
    ]
})
export class SelectAllModule
{
}
