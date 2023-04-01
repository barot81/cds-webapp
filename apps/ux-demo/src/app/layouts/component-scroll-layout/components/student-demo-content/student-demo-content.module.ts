import { NgModule } from "@angular/core";
import { FuseSharedModule, MaterialModule } from "@exxat/ux";
import { StudentDemoContent } from "./components/student-demo-content.component";

@NgModule({
    declarations: [StudentDemoContent],
    imports: [FuseSharedModule, MaterialModule],
    exports: [StudentDemoContent]
})
export class StudentDemoContentModule {

}