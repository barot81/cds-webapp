import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsAndConditionPageDemoComponent } from './terms-and-condition-page-demo.component';
import { FuseSharedModule, FuseSidebarModule, MaterialModule, ExxatAvatarModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TermsAndConditionPageDemoRoutingModule } from './terms-and-condition-page-demo-routing.module';

@NgModule({
  declarations: [TermsAndConditionPageDemoComponent],
  imports: [
    CommonModule,
    FuseSharedModule,
    FuseSidebarModule,
    MaterialModule,
    FlexLayoutModule,
    ExxatAvatarModule,
    TermsAndConditionPageDemoRoutingModule
  ]
})
export class TermsAndConditionPageDemoModule { }
