import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FuseSharedModule, FuseThemeOptionsModule, MaterialModule } from "@zhealthcare/ux";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseHighlightModule } from "../../../helpers/highlight/highlight.module";
import { zhealthcareGRAPHSLAYOUTSCOMPONENTS } from "./components";
import { LayoutsContainerComponent } from "./container/layouts-container.component";
import { zhealthcareGRAPHSLAYOUTS } from "./layouts";
import { LayoutsRoutingModule } from "./layouts-routing.module";

@NgModule({
    declarations: [
        LayoutsContainerComponent,
        ...zhealthcareGRAPHSLAYOUTS,
        ...zhealthcareGRAPHSLAYOUTSCOMPONENTS
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