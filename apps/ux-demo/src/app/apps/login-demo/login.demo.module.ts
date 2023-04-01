import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { zhealthcareTooltipModule, FuseSharedModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LOGINCONTAINTERS } from './container';
import { LoginDemoRoutingModule } from './login-routing.module';
import { LOGINPAGES } from './pages';

@NgModule({
    declarations: [...LOGINCONTAINTERS, ...LOGINPAGES],
    imports: [
        CommonModule,
        FuseSharedModule,
        FlexLayoutModule,
        MaterialModule,
        LoginDemoRoutingModule,
        zhealthcareTooltipModule
    ]
})
export class LoginDemoModule { }
