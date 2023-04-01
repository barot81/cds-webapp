import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FuseSharedModule, FuseThemeOptionsModule, MaterialModule } from "@zhealthcare/ux";
import { zhealthcareGraphsStandardContainerComponent } from "./container/zhealthcare-graphs-containter.component";
import { zhealthcareGraphsStandardRoutingModule } from "./zhealthcare-graphs-standard-routing.module";

@NgModule({
    declarations: [
        zhealthcareGraphsStandardContainerComponent
    ],
    imports: [
        zhealthcareGraphsStandardRoutingModule,
        FuseSharedModule,
        MaterialModule,
        FlexLayoutModule,
        FuseThemeOptionsModule
    ],
    providers: [],
})
export class zhealthcareGraphsStandardModule {

}