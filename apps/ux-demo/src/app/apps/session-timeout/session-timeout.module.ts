import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule, Routes } from "@angular/router";
import { LayoutModule, MaterialModule } from "@zhealthcare/ux";
import { SessionTimeOutComponent, SESSIONTIMEOUTPAGES } from './pages';

const routes: Routes = [
    {
        path: '',
        component: SessionTimeOutComponent
    }
];

@NgModule({
    declarations: [...SESSIONTIMEOUTPAGES],
    imports: [CommonModule, MaterialModule, FlexLayoutModule, LayoutModule, RouterModule.forChild(routes)]
})
export class SessionTimeOutModule { }