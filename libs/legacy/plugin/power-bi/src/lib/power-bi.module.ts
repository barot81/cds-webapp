import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule, FuseSharedModule } from '@zhealthcare/ux';

import { FlexLayoutModule } from '@angular/flex-layout';
import { PowerBIComponent } from './power-bi.component';
import { PowerBIRoutingModule } from './power-bi-routing.module';
import { PowerBIApiClient } from './services/zhealthcare-web-api-client.service';
import { PowerBISandbox } from './services/zhealthcare-web-sandbox.service';

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
  providers: [PowerBIApiClient, PowerBISandbox],
})
export class PowerBIModule {}
