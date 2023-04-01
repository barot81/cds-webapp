import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerExamplesDemoRoutingModule } from './drawer-examples-demo-routing.module';
import { DrawerExamplesDemoComponent } from './drawer-examples-demo.component';
import { MaterialModule, FuseSharedModule, LayoutModule, FuseSidebarModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@exxat/plugin/data-source';
import { AssociateClinicalInstructorDrawerComponent } from './associate-clinical-instructor-drawer/associate-clinical-instructor-drawer.component';
import { PreviewDemoContentComponent } from './associate-clinical-instructor-drawer/preview-demo-content/preview-demo-content.component';

@NgModule({
  declarations: [DrawerExamplesDemoComponent, AssociateClinicalInstructorDrawerComponent, PreviewDemoContentComponent],
  imports: [
    CommonModule,
    DrawerExamplesDemoRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    LayoutModule,
    FuseSidebarModule,
    DataSourceModule
  ]
})
export class DrawerExamplesDemoModule { }
