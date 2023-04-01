import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "@zhealthcare/ux";
import { zhealthcareGrdiGuidelinesContainerComponent } from  "./container/zhealthcare-grid-guidelines-container.component";
import { zhealthcareGridGuidelinesRoutingModule } from "./zhealthcare-grid-guidelines-routing.module";

@NgModule({
    declarations: [zhealthcareGrdiGuidelinesContainerComponent],
    imports: [CommonModule, zhealthcareGridGuidelinesRoutingModule, MaterialModule, FlexLayoutModule, FormsModule,
        ReactiveFormsModule]
})
export class zhealthcareGridGuidelinesModule { }