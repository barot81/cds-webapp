import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorDemo404RoutingModule } from './error-demo-404-routing.module';
import { ErrorDemoComponent } from './error-demo.component';
import { LayoutModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ErrorDemoComponent],
  imports: [
    CommonModule,
    ErrorDemo404RoutingModule,
    MaterialModule,
    FlexLayoutModule,
    LayoutModule
  ]
})
export class ErrorDemo404Module { }
