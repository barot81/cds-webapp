import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorDemo500RoutingModule } from './error-demo-500-routing.module';
import { ErrorDemo500Component } from './error-demo500.component';
import { LayoutModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ErrorDemo500Component],
  imports: [
    CommonModule,
    ErrorDemo500RoutingModule,
    MaterialModule,
    FlexLayoutModule,
    LayoutModule
  ]
})
export class ErrorDemo500Module { }
