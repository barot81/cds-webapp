import { NgModule } from "@angular/core";
import { zhealthcareAvatarModule, FuseSharedModule, MaterialModule } from "@zhealthcare/ux";
import { StudentProfileDemoHeaderComponent } from "./components/student-profile-demo-header.component";

@NgModule({
    declarations: [StudentProfileDemoHeaderComponent],
    imports: [FuseSharedModule, MaterialModule, zhealthcareAvatarModule],
    exports: [StudentProfileDemoHeaderComponent]
})
export class StudentProfileDemoHeaderContentModule {

}