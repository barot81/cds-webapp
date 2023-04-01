import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExxatTooltipModule, FuseSharedModule, MaterialModule } from '@exxat/ux';
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
        ExxatTooltipModule
    ]
})
export class LoginDemoModule { }
