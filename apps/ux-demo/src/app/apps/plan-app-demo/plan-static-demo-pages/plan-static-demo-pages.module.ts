import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanStaticDemoPagesComponent } from './plan-static-demo-pages.component';
import { MaterialModule, FuseSharedModule, LayoutModule, FuseSidebarModule, zhealthcareAvatarModule, FlexTableModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { zhealthcareTagModule } from '@zhealthcare/plugin/tags';
import { EventScheduleDemoComponent } from './event-schedule-demo/event-schedule-demo.component';
import { PlanStaticDemoPagesRoutingModule } from './plan-static-demo-pages-routing.module';
import { PlanAppDemoDrawerService } from '../plan-app-demo-drawer.service';
import { ResourcesDemoComponent } from './resources-demo/resources-demo.component';
import { MeasuresDemoComponent } from './measures-demo/measures-demo.component';
import { ResizableDemoModule } from '../../../ui/resizable-demo/resizable-demo.module';
import { zhealthcareTreeDemoModule } from '../../../ui/zhealthcare-ui-components/tabs/zhealthcare-tree-demo/zhealthcare-tree-demo.module';
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
    zhealthcareAvatarModule,
    zhealthcareTagModule,
    FlexTableModule,
    ResizableDemoModule,
    zhealthcareTreeDemoModule
  ],
  providers: [
    PlanAppDemoDrawerService,
    PlanDemoHeaderLayoutService
  ]
})
export class PlanStaticDemoPagesModule { }
