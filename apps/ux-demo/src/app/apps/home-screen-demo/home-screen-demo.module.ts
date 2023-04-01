import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "@zhealthcare/ux";
import { HomeScreenContainerComponent } from "./container/home-screen-container.component";
import { HomeScreenRoutingModule } from "./home-screen-demo-routing.module";

@NgModule({
    declarations: [HomeScreenContainerComponent],
    imports: [CommonModule, HomeScreenRoutingModule, FlexLayoutModule, MaterialModule]
})
export class HomeScreenDemoModule { }