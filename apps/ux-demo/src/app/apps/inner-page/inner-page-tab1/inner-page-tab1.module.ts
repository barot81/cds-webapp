import { NgModule } from '@angular/core';
import { InnerPageTab1Component } from './inner-page-tab1.component';
import { InnerPagetab1RoutingModule } from './inner-page-tab1.routing.module';
import { CommonModule } from '@angular/common';
import { FuseSharedModule, FuseSidebarModule, MaterialModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InnerPageSecondarNavBarModule } from './inner-page-secondary-navbar/inner-page-secondary-navbar.module';

@NgModule({
  declarations: [InnerPageTab1Component],
  imports: [InnerPagetab1RoutingModule,
    CommonModule,
    FuseSharedModule,
    FuseSidebarModule,
    MaterialModule,
    FlexLayoutModule,
    InnerPageSecondarNavBarModule
  ],
  exports: [
  ]
})
export class InnerPageTab1Module { }
