import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResizableDemoRoutingModule } from './resizable-demo-routing.module';
import { ResizableDemoComponent } from './resizable-demo/resizable-demo.component';
import { MaterialModule, FuseSharedModule, FuseSidebarModule, FuseThemeOptionsModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DemoContentComponent } from './demo-content/demo-content.component';

@NgModule({
  declarations: [ResizableDemoComponent, DemoContentComponent],
  imports: [
    CommonModule,
    ResizableDemoRoutingModule,
    MaterialModule,
    FuseSharedModule,
    FlexLayoutModule,
    FuseSidebarModule,
    FuseThemeOptionsModule
  ]
})
export class ResizableDemoModule { }
