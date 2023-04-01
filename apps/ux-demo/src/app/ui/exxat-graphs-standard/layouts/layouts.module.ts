import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FuseSharedModule, FuseThemeOptionsModule, MaterialModule } from "@exxat/ux";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseHighlightModule } from "../../../helpers/highlight/highlight.module";
import { EXXATGRAPHSLAYOUTSCOMPONENTS } from "./components";
import { LayoutsContainerComponent } from "./container/layouts-container.component";
import { EXXATGRAPHSLAYOUTS } from "./layouts";
import { LayoutsRoutingModule } from "./layouts-routing.module";

@NgModule({
    declarations: [
        LayoutsContainerComponent,
        ...EXXATGRAPHSLAYOUTS,
        ...EXXATGRAPHSLAYOUTSCOMPONENTS
    ],
    imports: [
        MaterialModule,
        FlexLayoutModule,
        FuseSharedModule,
        NgxChartsModule,
        FuseHighlightModule,
        LayoutsRoutingModule,
        FuseThemeOptionsModule
    ],
    providers: [],
})
export class LayoutsModule {

}