import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FuseSharedModule, FuseThemeOptionsModule, MaterialModule } from "@exxat/ux";
import { ExxatGraphsStandardContainerComponent } from "./container/exxat-graphs-containter.component";
import { ExxatGraphsStandardRoutingModule } from "./exxat-graphs-standard-routing.module";

@NgModule({
    declarations: [
        ExxatGraphsStandardContainerComponent
    ],
    imports: [
        ExxatGraphsStandardRoutingModule,
        FuseSharedModule,
        MaterialModule,
        FlexLayoutModule,
        FuseThemeOptionsModule
    ],
    providers: [],
})
export class ExxatGraphsStandardModule {

}