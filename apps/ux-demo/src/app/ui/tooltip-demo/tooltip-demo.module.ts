import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';

import { TooltipDemoRoutingModule } from './tooltip-demo-routing.module';
import { TooltipDemoNavbarComponent } from './tooltip-demo-navbar/tooltip-demo-navbar.component';
import { TooltipExampleOneComponent } from './examples/tooltip-example-one/tooltip-example-one.component';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  ExxatTooltipModule,
  FuseSharedModule,
  FuseThemeOptionsModule,
  MaterialModule
} from '@exxat/ux';
import { TooltipDemoComponent } from './tooltip-demo/tooltip-demo.component';
import { TooltipInnerComponent } from './tooltip-inner/tooltip-inner.component';
import { TooltipExampleTwoComponent } from './examples/tooltip-example-two/tooltip-example-two.component';
import { TooltipExampleThreeComponent } from './examples/tooltip-example-three/tooltip-example-three.component';
import { TooltipExampleFourComponent } from './examples/tooltip-example-four/tooltip-example-four.component';
import { ExxatDrawerFormService } from '../exxat-drawers/exxat-drawer-forms-shared.service';
import { ConfigurationComponent } from './configuration/configuration.component';

@NgModule({
  declarations: [
    TooltipDemoNavbarComponent,
    TooltipExampleOneComponent,
    TooltipDemoComponent,
    TooltipInnerComponent,
    TooltipExampleTwoComponent,
    TooltipExampleThreeComponent,
    TooltipExampleFourComponent,
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    TooltipDemoRoutingModule,
    FuseHighlightModule,
    FlexLayoutModule,
    ExxatTooltipModule,
    MaterialModule,
    FuseSharedModule,
    FuseThemeOptionsModule,
    A11yModule
  ],
  providers: [ExxatDrawerFormService],
  entryComponents: [TooltipInnerComponent]
})
export class TooltipDemoModule {}
