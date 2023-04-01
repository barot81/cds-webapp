import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentScrollDocComponent } from './page/component-scroll-doc.component';
import { ComponentScrollDocRoutingModule } from './component-scroll-doc-routing.module';
import { FuseSharedModule, MaterialModule } from '@zhealthcare/ux';

@NgModule({
    declarations: [ComponentScrollDocComponent],
    imports: [
        CommonModule,
        ComponentScrollDocRoutingModule,
        MaterialModule,
        FuseSharedModule
    ]
})
export class ComponentScrollDocModule { }
