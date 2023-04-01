import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollSpyDemoRoutingModule } from './scroll-spy-demo-routing.module';
import { PageLevelScrollExampleComponent } from './examples/page-level-scroll-example/page-level-scroll-example.component';
import { ComponentLevelScrollExampleComponent } from './examples/component-level-scroll-example/component-level-scroll-example.component';
import { zhealthcareAvatarModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CancelRequestPopupComponent } from './cancel-request-popup/cancel-request-popup.component';
import { ViewInstructionDemoComponent } from './examples/component-level-scroll-example/view-instruction-demo/view-instruction-demo/view-instruction-demo.component';

@NgModule({
  declarations: [PageLevelScrollExampleComponent, ComponentLevelScrollExampleComponent, CancelRequestPopupComponent, ViewInstructionDemoComponent],
  imports: [
    CommonModule,
    FuseSharedModule,
    MaterialModule,
    FuseSidebarModule,
    FlexLayoutModule,
    ScrollSpyDemoRoutingModule,
    zhealthcareAvatarModule
  ]
})
export class ScrollSpyDemoModule { }
