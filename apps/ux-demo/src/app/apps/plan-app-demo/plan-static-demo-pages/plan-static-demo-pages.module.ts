import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanStaticDemoPagesComponent } from './plan-static-demo-pages.component';
import { MaterialModule, FuseSharedModule, LayoutModule, FuseSidebarModule, ExxatAvatarModule, FlexTableModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@exxat/plugin/data-source';
import { ExxatTagModule } from '@exxat/plugin/tags';
import { EventScheduleDemoComponent } from './event-schedule-demo/event-schedule-demo.component';
import { PlanStaticDemoPagesRoutingModule } from './plan-static-demo-pages-routing.module';
import { PlanAppDemoDrawerService } from '../plan-app-demo-drawer.service';
import { ResourcesDemoComponent } from './resources-demo/resources-demo.component';
import { MeasuresDemoComponent } from './measures-demo/measures-demo.component';
import { ResizableDemoModule } from '../../../ui/resizable-demo/resizable-demo.module';
import { ExxatTreeDemoModule } from '../../../ui/exxat-ui-components/tabs/exxat-tree-demo/exxat-tree-demo.module';
import { PlanDemoHeaderLayoutService } from './plan-static-header-service';

@NgModule({
  declarations: [PlanStaticDemoPagesComponent, EventScheduleDemoComponent, ResourcesDemoComponent, MeasuresDemoComponent],
  imports: [
    CommonModule,
    PlanStaticDemoPagesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    LayoutModule,
    FuseSidebarModule,
    DataSourceModule,
    ExxatAvatarModule,
    ExxatTagModule,
    FlexTableModule,
    ResizableDemoModule,
    ExxatTreeDemoModule
  ],
  providers: [
    PlanAppDemoDrawerService,
    PlanDemoHeaderLayoutService
  ]
})
export class PlanStaticDemoPagesModule { }
