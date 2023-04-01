import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseSharedModule, FuseThemeOptionsModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VERTICALSTEPPERCONTAINERS } from './container';
import { VerticalStepperDemoRoutingModule } from './vertical-stepper-demo-routing.module';
import { TabNavBarComponent } from './tab-nav-bar/tab-nav-bar.component';
import { VERTICALSTEPPEREXAMPLES } from './pages';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@NgModule({
    declarations: [...VERTICALSTEPPERCONTAINERS, ...VERTICALSTEPPEREXAMPLES, TabNavBarComponent],
    imports: [
        CommonModule,
        FuseSharedModule,
        FlexLayoutModule,
        MaterialModule,
        VerticalStepperDemoRoutingModule,
        FuseHighlightModule,
        FuseThemeOptionsModule
    ],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false }
        }
    ]
})
export class VerticalStepperDemoDemoModule { }
