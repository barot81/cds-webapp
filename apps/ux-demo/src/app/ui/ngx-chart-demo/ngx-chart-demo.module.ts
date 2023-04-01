import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "@zhealthcare/ux";
import { FuseHighlightModule } from "../../helpers/highlight/highlight.module";
import { ContainerComponent } from "./container/container.component";
import { NGXCHARTEXAMPLES } from "./examples";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxChartDemoRoutingModule } from "./ngx-chart-demo-routing.module";
import { TabNavBarComponent } from "./tab-nav-bar/tab-nav-bar.component";
import { NgxChartHelperTableComponent } from "./components";

@NgModule({
    declarations: [...NGXCHARTEXAMPLES, TabNavBarComponent, ContainerComponent, NgxChartHelperTableComponent],
    imports: [
        CommonModule,
        NgxChartDemoRoutingModule,
        FuseHighlightModule,
        MaterialModule,
        FlexLayoutModule,
        NgxChartsModule
    ],
})
export class NgxChartDemoModule {

}