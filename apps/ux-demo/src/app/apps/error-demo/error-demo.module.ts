import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "@zhealthcare/ux";
import { ErrorDemoComponent } from "./container/error-demo.component";
import { ErrorDemoRoutingModule } from "./error-demo-routing.module";
import { ErrorDemo404Module } from "./pages/error-demo-404/error-demo-404.module";
import { ErrorDemo500Module } from "./pages/error-demo-500/error-demo-500.module";

@NgModule({
    imports: [CommonModule, ErrorDemoRoutingModule, MaterialModule, FlexLayoutModule, ErrorDemo404Module, ErrorDemo500Module],
    declarations: [ErrorDemoComponent],
})
export class ErrorDemoModule {

}