import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageDemoRoutingModule } from './page-demo-routing.module';
import { PageDemoComponent } from './page-demo.component';
import { FuseSharedModule, FuseSidebarModule, MaterialModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InnerPageSecondarNavBarModule } from '../inner-page-secondary-navbar/inner-page-secondary-navbar.module';
import { Category1PageDemoComponent } from './category1-page-demo/category1-page-demo.component';


@NgModule({
  declarations: [PageDemoComponent, Category1PageDemoComponent],
  imports: [
    CommonModule,
    PageDemoRoutingModule,
    FuseSharedModule,
    FuseSidebarModule,
    MaterialModule,
    FlexLayoutModule,
    InnerPageSecondarNavBarModule
  ]
})
export class PageDemoModule { }
