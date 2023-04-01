import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InnerPageDemoComponent } from './inner-page-demo.component';
import { InnerPageRoutingModule } from './inner-page-routing.module';
import { FuseSharedModule, FuseSidebarModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InnerPagePrimaryNavbarComponent } from './inner-page-primary-navbar/inner-page-primary-navbar.component';

@NgModule({
  declarations: [InnerPageDemoComponent, InnerPagePrimaryNavbarComponent],
  imports: [
    CommonModule,
    InnerPageRoutingModule,
    CommonModule,
    FuseSharedModule,
    FuseSidebarModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class InnerPageModule { }
