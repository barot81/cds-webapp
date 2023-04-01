import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsDashboardComponent } from './programs-dashboard.component';
import { FuseSharedModule, FuseSidebarModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProgramsDashboardRoutingModule } from './programs-dashboard-routing.module';
import { ProgramsDemoComponent } from './pages/programs-demo/programs-demo.component';

@NgModule({
  declarations: [ProgramsDashboardComponent, ProgramsDemoComponent],
  imports: [
    CommonModule,
    ProgramsDashboardRoutingModule,
    FuseSharedModule,
    FlexLayoutModule,
    FuseSidebarModule,
    MaterialModule
  ]
})
export class ProgramsDashboardModule { }
