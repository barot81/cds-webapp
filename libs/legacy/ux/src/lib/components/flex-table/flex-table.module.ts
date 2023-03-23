import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FlexTableComponent } from './flex-table.component';
import { FlexTableService } from './flex-table.service';

@NgModule({
    declarations: [FlexTableComponent],
    imports: [
        CommonModule,
        MaterialModule
    ],
    providers: [FlexTableService],
    exports: [FlexTableComponent]
})
export class FlexTableModule { }
