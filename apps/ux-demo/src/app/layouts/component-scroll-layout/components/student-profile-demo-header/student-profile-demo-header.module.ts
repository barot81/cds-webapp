import { NgModule } from "@angular/core";
import { ExxatAvatarModule, FuseSharedModule, MaterialModule } from "@exxat/ux";
import { StudentProfileDemoHeaderComponent } from "./components/student-profile-demo-header.component";

@NgModule({
    declarations: [StudentProfileDemoHeaderComponent],
    imports: [FuseSharedModule, MaterialModule, ExxatAvatarModule],
    exports: [StudentProfileDemoHeaderComponent]
})
export class StudentProfileDemoHeaderContentModule {

}