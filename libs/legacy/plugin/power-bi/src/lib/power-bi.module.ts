import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule, FuseSharedModule } from '@exxat/ux';

import { FlexLayoutModule } from '@angular/flex-layout';
import { PowerBIComponent } from './power-bi.component';
import {PowerBIRoutingModule} from './power-bi-routing.module';
import { PowerBIApiClient } from './services/exxat-web-api-client.service';
import { PowerBISandbox } from './services/exxat-web-sandbox.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FuseSharedModule,
    FlexLayoutModule,
    PowerBIRoutingModule
  ],

  exports: [PowerBIComponent],
  declarations: [PowerBIComponent],
  providers: [PowerBIApiClient,PowerBISandbox],
})
export class PowerBIModule {}
